const express = require("express");
const router = express.Router();

const recordController = require("../controllers/recordController");
const { protect, authorize } = require("../middlewares/authMiddleware");

/**
 * CREATE RECORD
 * ADMIN + ANALYST only
 */
router.post(
  "/",
  protect,
  authorize(["ADMIN", "ANALYST"]),
  recordController.createRecord
);

/**
 * GET RECORDS
 * ALL ROLES
 */
router.get(
  "/",
  protect,
  authorize(["ADMIN", "ANALYST", "VIEWER"]),
  recordController.getRecords
);

/**
 * UPDATE RECORD
 * ADMIN + ANALYST
 */
router.put(
  "/:id",
  protect,
  authorize(["ADMIN", "ANALYST"]),
  recordController.updateRecord
);

/**
 * DELETE RECORD
 * ADMIN ONLY
 */
router.delete(
  "/:id",
  protect,
  authorize(["ADMIN"]),
  recordController.deleteRecord
);

module.exports = router;