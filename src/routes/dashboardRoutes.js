const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/dashboardController");
const { protect, authorize } = require("../middlewares/authMiddleware");

/**
 * DASHBOARD SUMMARY
 */
router.get(
  "/summary",
  protect,
  authorize(["ADMIN", "ANALYST", "VIEWER"]),
  dashboardController.getSummary
);

/**
 * CATEGORY BREAKDOWN
 */
router.get(
  "/category",
  protect,
  authorize(["ADMIN", "ANALYST", "VIEWER"]),
  dashboardController.getCategoryBreakdown
);

/**
 * RECENT TRANSACTIONS / DATA
 */
router.get(
  "/recent",
  protect,
  authorize(["ADMIN", "ANALYST", "VIEWER"]),
  dashboardController.getRecent
);

/**
 * MONTHLY TRENDS
 */
router.get(
  "/monthly",
  protect,
  authorize(["ADMIN", "ANALYST", "VIEWER"]),
  dashboardController.getMonthlyTrends
);

module.exports = router;