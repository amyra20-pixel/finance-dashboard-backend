const dashboardService = require('../services/dashboardService');

const getSummary = async (req, res) => {
  try {
    const data = await dashboardService.getSummary();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get summary' });
  }
};

const getCategoryBreakdown = async (req, res) => {
  try {
    const data = await dashboardService.getCategoryBreakdown();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get breakdown' });
  }
};

const getRecent = async (req, res) => {
  try {
    const data = await dashboardService.getRecent();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get recent records' });
  }
};

module.exports = {
  getSummary,
  getCategoryBreakdown,
  getRecent
};