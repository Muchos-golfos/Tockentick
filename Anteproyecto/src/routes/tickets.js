const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/tickets');
const commentController = require('../controllers/comments');
const auth = require('../middlewares/auth'); 
const upload = require('../middlewares/upload');
const { validateTicket } = require('../middlewares/validators');
const authorizeRoles = require('../middlewares/roleAuth');

// 1. Crear Ticket
router.post('/', auth, upload.single('image'), validateTicket, ticketController.createTicket);

// 2. Ver TODOS los tickets
router.get('/', auth, ticketController.getAllTickets);

// 3. Ver UN ticket específico (El detalle)
router.get('/:id', auth, ticketController.getTicketById);

// 4. Ver comentarios de un ticket
router.get('/:id/comments', auth, commentController.getTicketComments);

// 5. Añadir comentario
router.post('/:id/comments', auth, commentController.addComment);

// 6. Acciones (Asignar, Escalar, Resolver)
router.patch('/:id/assign', auth, ticketController.assignTicket);

router.patch('/:id/escalate', 
    auth, 
    authorizeRoles('helpdesk', 'tic', 'admin'), 
    ticketController.escalateTicket
);

router.patch('/:id/resolve', 
    auth, 
    authorizeRoles('helpdesk', 'tic', 'admin'), 
    ticketController.resolveTicket
);

module.exports = router;