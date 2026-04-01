const express = require('express');
const router = express.Router();

const dashboardController = require('../controllers/dashboardController');
const { checkRole } = require('../middlewares/authMiddleware');
//All roles can view dashboard
router.get('/summary', checkRole(['admin', 'analyst', 'viewer']), dashboardController.getSummary);
router.get('/category', checkRole(['admin', 'analyst', 'viewer']), dashboardController.getCategoryBreakdown);
router.get('/recent', checkRole(['admin', 'analyst', 'viewer']), dashboardController.getRecent);

module.exports = router;