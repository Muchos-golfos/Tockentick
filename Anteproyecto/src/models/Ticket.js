const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Ticket = sequelize.define('Ticket', {
    title: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('open', 'in_progress', 'on_hold', 'resolved', 'closed'),
        defaultValue: 'open'
    },
    priority: {
        type: DataTypes.ENUM('low', 'medium', 'high', 'critical'),
        defaultValue: 'medium'
    },
    support_level: { // Nuevo campo de escalado
        type: DataTypes.ENUM('L1', 'L2', 'L3'),
        defaultValue: 'L1'
    },
    attachment_path: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    resolved_at: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'tickets',
    underscored: true
});

module.exports = Ticket;