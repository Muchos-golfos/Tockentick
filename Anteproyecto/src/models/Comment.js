const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Comment = sequelize.define('Comment', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    ticket_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    body: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    is_internal: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: 'comments',
    underscored: true,
    // AQUÍ ESTÁ EL TRUCO:
    timestamps: true,      // Queremos timestamps...
    updatedAt: false,     // ...pero le decimos que NO busque updated_at porque no existe en tu SQL
    createdAt: 'created_at' // Y que created_at se llama así en la DB
});

module.exports = Comment;