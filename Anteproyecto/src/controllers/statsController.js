const { Sequelize } = require('sequelize');
const Ticket = require('../models/Ticket');

exports.getTicketStats = async (req, res) => {
    try {
        // Aseguramos capturar el rol en minúsculas para evitar fallos de formato ('TIC', 'Helpdesk', etc.)
        const role = req.user?.role ? String(req.user.role).toLowerCase() : '';

        let whereCondition = {};

        if (role === 'helpdesk') {
            whereCondition.support_level = 'L1';
        } else if (role === 'tic') {
            whereCondition.support_level = 'L2';
        } else if (role === 'admin') {
            // El administrador no recibe filtros en el WHERE, ve todos (L1, L2, L3)
        } else {
            return res.status(403).json({ message: "No tienes permisos para consultar estadísticas." });
        }

        // 1. Total de tickets por cada estado (filtrado estricto)
        const statusStats = await Ticket.findAll({
            attributes: [
                'status',
                [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']
            ],
            where: whereCondition,
            group: ['status']
        });

        // 2. Total de tickets por cada nivel de soporte (filtrado estricto)
        const levelStats = await Ticket.findAll({
            attributes: [
                'support_level',
                [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']
            ],
            where: whereCondition,
            group: ['support_level']
        });

        // 3. Tiempo medio de resolución (filtrado estricto)
        const timeStats = await Ticket.findOne({
            attributes: [
                [
                    Sequelize.fn('AVG', 
                        Sequelize.literal('TIMESTAMPDIFF(HOUR, created_at, resolved_at)')
                    ), 
                    'avg_resolution_hours'
                ]
            ],
            where: {
                ...whereCondition,
                status: 'resolved'
            }
        });

        res.json({
            por_estado: statusStats,
            por_nivel: levelStats,
            tiempo_medio_horas: Math.round(timeStats?.get('avg_resolution_hours') || 0)
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};