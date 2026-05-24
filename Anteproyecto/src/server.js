const app = require('./app');
const sequelize = require('./config/db');

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        // Verificar conexión a la base de datos [cite: 139]
        await sequelize.authenticate();
        console.log('✅ Conexión a MySQL establecida correctamente.');

        // Sincronizar modelos con las tablas (opcional)
        // await sequelize.sync({ force: false });

        app.listen(PORT, () => {
            console.log(`🚀 Servidor TokenTick corriendo en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ No se pudo conectar a la base de datos:', error);
        process.exit(1); // Detiene el proceso si hay un error crítico
    }
}

startServer();