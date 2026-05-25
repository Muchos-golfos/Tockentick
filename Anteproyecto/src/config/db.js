const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 3306,  // ✅ Puerto añadido
        dialect: 'mysql',
        logging: false,
        define: {
            timestamps: true,
            underscored: true
        }
    }
);

const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Conexión a la base de datos MySQL establecida correctamente.');
    } catch (error) {
        console.error('❌ No se pudo conectar a la base de datos:', error);
    }
};

testConnection();

module.exports = sequelize;