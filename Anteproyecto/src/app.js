const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const ticketRoutes = require('./routes/tickets');
const statsRoutes = require('./routes/stats');

const User = require('./models/User');
const Ticket = require('./models/Ticket');
const Comment = require('./models/Comment');

const app = express();

app.use(cors());
app.use(express.json());

// Servir archivos estáticos (ajustado a la ruta src/uploads si es necesario)
app.use('/uploads', express.static(path.join(__dirname, 'src', 'uploads')));

// --- RELACIONES ---
// Comentarios
Ticket.hasMany(Comment, { foreignKey: 'ticket_id' });
Comment.belongsTo(Ticket, { foreignKey: 'ticket_id' });

User.hasMany(Comment, { foreignKey: 'user_id' });
Comment.belongsTo(User, { foreignKey: 'user_id' });

// Tickets (Creador)
User.hasMany(Ticket, { foreignKey: 'created_by', as: 'tickets_creados' });
Ticket.belongsTo(User, { foreignKey: 'created_by', as: 'creador' });

// Tickets (Asignación)
User.hasMany(Ticket, { foreignKey: 'assigned_to', as: 'tareas_asignadas' });
Ticket.belongsTo(User, { foreignKey: 'assigned_to', as: 'asignado' });

// --- RUTAS ---
app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/stats', statsRoutes);

app.get('/', (req, res) => {
    res.json({ message: "Bienvenido a la API de TokenTick" });
});

module.exports = app;