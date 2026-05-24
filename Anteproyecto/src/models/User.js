const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
        validate: { isEmail: true }
    },
    password_hash: { // Antes era password
        type: DataTypes.STRING(255),
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('user', 'helpdesk', 'tic', 'admin'), // Nuevos roles
        defaultValue: 'user'
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: 'users', // Forzamos el nombre de la tabla en minúsculas
    underscored: true   // Para que use created_at y updated_at automáticamente
});

module.exports = User;