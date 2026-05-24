const { Sequelize } = require('sequelize');
require('dotenv').config();

// Configuración de la conexión utilizando las variables de entorno
const sequelize = new Sequelize(
    process.env.DB_NAME, // tokentick
    process.env.DB_USER, // root
    process.env.DB_PASS, // tu contraseña
    {
        host: process.env.DB_HOST, // localhost
        dialect: 'mysql',
        logging: false, // Cambiar a console.log si quieres ver las consultas SQL en la terminal
        define: {
            timestamps: true, // Esto gestiona automáticamente created_at y updated_at
            underscored: true // Para que coincida con el formato snake_case de tu SQL
        }
    }
);

// Función para probar la conexión
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