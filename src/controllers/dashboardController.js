const dashboardService = require('../services/dashboardService');

const getSummary = async (req, res) => {
  try {
    const data = await dashboardService.getSummary(req.user);
    return res.json({
      data: data
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get summary' });
  }
};

const getCategoryBreakdown = async (req, res) => {
  try {
    const data = await dashboardService.getCategoryBreakdown(req.user);
    if (!data || data.length === 0) {
      return res.json({
        message: "No recent transactions found",
        data: []
      });
    }

    return res.json({
      data: data
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get breakdown' });
  }
};

const getRecent = async (req, res) => {
  try {
    const data = await dashboardService.getRecent(req.user);
    if (!data || data.length === 0) {
      return res.json({
        message: "No recent transactions found",
        data: []
      });
    }

    return res.json({
      data: data
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get recent records' });
  }
};

const getMonthlyTrends = async (req, res) => {
  try {
    const data = await dashboardService.getMonthlyTrends(req.user);
    if (!data || data.length === 0) {
      return res.json({
        message: "No recent transactions found",
        data: []
      });
    }

    return res.json({
      data: data
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch trends" });
  }
};
module.exports = {
  getSummary,
  getCategoryBreakdown,
  getRecent,
  getMonthlyTrends
};