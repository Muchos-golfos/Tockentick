const Ticket = require('../models/Ticket');
const User = require('../models/User');
const Comment = require('../models/Comment'); // Importado para registrar las acciones en el chat
const { sendTicketNotification } = require('../utils/emailService');
const { Op } = require('sequelize'); 

// 1. OBTENER TODOS LOS TICKETS (Nadie ve los 'resolved')
exports.getAllTickets = async (req, res) => {
    try {
        const { id, role } = req.user; 
        
        // Condition base para excluir resueltos
        let queryOptions = {
            where: {
                status: { [Op.ne]: 'resolved' }
            }, 
            include: [
                { model: User, as: 'creador', attributes: ['name', 'email'] },
                { model: User, as: 'asignado', attributes: ['name'] }
            ],
            order: [['createdAt', 'DESC']]
        };

        // Restricciones de alcance por rol
        if (role === 'user') {
            queryOptions.where.created_by = id;
        } else if (role === 'helpdesk') {
            queryOptions.where.support_level = 'L1';
        } else if (role === 'tic') {
            queryOptions.where.support_level = 'L2';
        } else if (role === 'admin') {
            // El admin ve todos los niveles pero hereda el filtro base (no ve resueltos)
        } else {
            queryOptions.where.id = null;
        }

        const tickets = await Ticket.findAll(queryOptions);
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 2. CREAR TICKET
exports.createTicket = async (req, res) => {
    try {
        const { title, description, priority } = req.body;
        const attachment_path = req.file ? req.file.path : null;

        const newTicket = await Ticket.create({
            title,
            description,
            priority: priority || 'medium',
            support_level: 'L1',
            created_by: req.user.id,
            attachment_path
        });

        res.status(201).json({ message: "Ticket creado con éxito", ticket: newTicket });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 3. DETALLE DE UN TICKET ESPECÍFICO
exports.getTicketById = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const userRole = req.user.role;

        const ticket = await Ticket.findByPk(id, {
            include: [
                { model: User, as: 'creador', attributes: ['id', 'name', 'email', 'role'] },
                { model: User, as: 'asignado', attributes: ['id', 'name', 'role'] }
            ]
        });

        if (!ticket) return res.status(404).json({ message: "Incidencia no encontrada" });

        if (userRole === 'user' && ticket.created_by !== userId) {
            return res.status(403).json({ message: "No tienes permiso para ver esta incidencia." });
        }
        if (userRole === 'helpdesk' && ticket.support_level !== 'L1') {
            return res.status(403).json({ message: "No tienes permiso para ver incidencias de este nivel." });
        }
        if (userRole === 'tic' && ticket.support_level !== 'L2') {
            return res.status(403).json({ message: "No tienes permiso para ver incidencias de este nivel." });
        }

        res.json(ticket);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 4. ASIGNAR TICKET
exports.assignTicket = async (req, res) => {
    try {
        const { id } = req.params;
        const ticket = await Ticket.findByPk(id);
        if (!ticket) return res.status(404).json({ message: "Ticket no encontrado" });

        ticket.assigned_to = req.user.id;
        ticket.status = 'in_progress';
        await ticket.save();

        // 👈 CORRECCIÓN: Buscamos el nombre real en la BD para evitar el 'undefined'
        const tecnico = await User.findByPk(req.user.id);
        const nombreTecnico = tecnico ? tecnico.name : 'Técnico';

        // Comentario de sistema para registrar quién reclamó el ticket
        await Comment.create({
            ticket_id: id,
            user_id: req.user.id,
            body: `SISTEMA: El técnico ${nombreTecnico} ha reclamado esta incidencia.`,
            is_internal: false
        });

        await ticket.reload({
            include: [
                { model: User, as: 'creador', attributes: ['name'] },
                { model: User, as: 'asignado', attributes: ['name'] }
            ]
        });

        res.json({ message: "Te has asignado el ticket", ticket });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 5. RESOLVER TICKET
exports.resolveTicket = async (req, res) => {
    try {
        const { id } = req.params;
        const ticket = await Ticket.findByPk(id, {
            include: [{ model: User, as: 'creador', attributes: ['email', 'name'] }]
        });
        
        if (!ticket) return res.status(404).json({ message: "Ticket no encontrado" });

        ticket.status = 'resolved';
        ticket.resolved_at = new Date();
        await ticket.save();

        if (ticket.creador?.email) {
            await sendTicketNotification(ticket.creador.email, "Ticket Resuelto", ticket.title, "RESUELTO");
        }

        res.json({ message: "Ticket resuelto", ticket });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 6. ESCALAR TICKET
exports.escalateTicket = async (req, res) => {
    try {
        const { id } = req.params;
        const ticket = await Ticket.findByPk(id);
        if (!ticket) return res.status(404).json({ message: "Ticket no encontrado" });

        // Guardamos el nivel antiguo para el mensaje del sistema
        const oldLevel = ticket.support_level;

        if (ticket.support_level === 'L1') ticket.support_level = 'L2';
        else if (ticket.support_level === 'L2') ticket.support_level = 'L3';
        else return res.status(400).json({ message: "Máximo nivel alcanzado" });

        // 👈 CORRECCIÓN: Buscamos el nombre real en la BD antes de guardar el comentario del sistema
        const tecnico = await User.findByPk(req.user.id);
        const nombreTecnico = tecnico ? tecnico.name : 'Técnico';

        // Guardamos el comentario automático de sistema indicando quién y a qué nivel escala
        await Comment.create({
            ticket_id: id,
            user_id: req.user.id,
            body: `SISTEMA: Incidencia escalada por ${nombreTecnico} desde ${oldLevel} hacia ${ticket.support_level}.`,
            is_internal: false
        });

        ticket.assigned_to = null;
        ticket.status = 'open';
        await ticket.save();

        res.json({ message: `Escalado a ${ticket.support_level}`, ticket });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};