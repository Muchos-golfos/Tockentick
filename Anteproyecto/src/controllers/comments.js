const Comment = require('../models/Comment');
const User = require('../models/User');
const Ticket = require('../models/Ticket');

// Añadir un comentario a un ticket
exports.addComment = async (req, res) => {
    try {
        // 1. Pillamos el ID del ticket de la URL (:id)
        const { id } = req.params; 
        const { body, is_internal } = req.body;
        const user_id = req.user.id;
        const user_role = req.user.role; // Sacamos el rol del token

        // 2. Verificar si el ticket existe
        const ticket = await Ticket.findByPk(id);
        if (!ticket) {
            return res.status(404).json({ message: "No puedes comentar en un ticket que no existe" });
        }
        
        // --- LÓGICA DE CHAT ACTIVO ---
        // Si el técnico responde, el ticket pasa a 'in_progress' automáticamente
        if (user_role !== 'user' && ticket.status === 'open') {
            ticket.status = 'in_progress';
            ticket.assigned_to = user_id; 
            await ticket.save();

            // 👈 CORRECCIÓN: Buscamos al usuario en la BD para asegurar que tenemos su 'name' real y evitar el 'undefined'
            const tecnico = await User.findByPk(user_id);
            const nombreTecnico = tecnico ? tecnico.name : 'Técnico';

            // Comentario automático para dejar constancia de quién reclamó el ticket vía chat
            await Comment.create({
                ticket_id: id,
                user_id: user_id,
                body: `SISTEMA: El técnico ${nombreTecnico} ha reclamado esta incidencia al responder en el chat.`,
                is_internal: false
            });
        }

        // 3. Crear el comentario
        const newComment = await Comment.create({
            ticket_id: id, 
            user_id,
            body,
            is_internal: is_internal || false
        });

        // 4. Devolverlo con los datos del autor (nombre y rol)
        const commentWithAuthor = await Comment.findByPk(newComment.id, {
            include: [{ 
                model: User, 
                attributes: ['name', 'role'] 
            }]
        });

        res.status(201).json(commentWithAuthor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener todos los comentarios de un ticket específico
exports.getTicketComments = async (req, res) => {
    try {
        const { id } = req.params; // ID del ticket
        const userId = req.user.id;
        const userRole = req.user.role;

        // Primero verificamos si el usuario tiene acceso al ticket
        const ticket = await Ticket.findByPk(id);
        if (!ticket) return res.status(404).json({ message: "Ticket no encontrado" });

        if (userRole === 'user' && ticket.created_by !== userId) {
            return res.status(403).json({ message: "No tienes acceso a estos comentarios" });
        }

        const comments = await Comment.findAll({
            where: { ticket_id: id },
            include: [{ model: User, attributes: ['name', 'role'] }],
            order: [['created_at', 'ASC']]
        });

        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};