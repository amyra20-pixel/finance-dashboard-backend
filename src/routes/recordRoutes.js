const express = require('express');
const router = express.Router();

const recordController = require('../controllers/recordController');
const { checkRole } = require('../middlewares/authMiddleware');

// only admin can create
router.post('/', checkRole(['admin']), recordController.createRecord);

// Analyst + admin can view
router.get('/', checkRole(['admin', 'analyst']), recordController.getRecords);

module.exports = router;