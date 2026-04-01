const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const { checkRole } = require('../middlewares/authMiddleware');

// only admin can create users
router.post('/', checkRole(['admin']), userController.createUser);

// only admin can view users
router.get('/', checkRole(['admin']), userController.getUsers);

module.exports = router;