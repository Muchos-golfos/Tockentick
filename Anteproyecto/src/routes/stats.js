const express = require('express');
const router = express.Router();
const statsController = require('../controllers/statsController');
const auth = require('../middlewares/auth'); 
const authorizeRoles = require('../middlewares/roleAuth');

// GET http://localhost:3000/api/stats
router.get('/', auth, authorizeRoles('helpdesk', 'tic', 'admin'), statsController.getTicketStats);

module.exports = router;