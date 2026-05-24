const { body, validationResult } = require('express-validator');

// 1. Definimos la constante (Asegúrate de que se llame validateTicket)
const validateTicket = [
    body('title').isLength({ min: 5 }).withMessage('El título debe tener al menos 5 caracteres'),
    body('description').notEmpty().withMessage('La descripción es obligatoria'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// 2. La exportamos (El nombre debe ser idéntico al de arriba)
module.exports = { validateTicket };