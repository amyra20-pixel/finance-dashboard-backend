const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { protect, authorize } = require("../middlewares/authMiddleware");

/**
 * CREATE USER
 * Only ADMIN can create users
 */
router.post(
  "/",
  protect,
  authorize(["ADMIN"]),
  userController.createUser
);

/**
 * GET ALL USERS
 * Only ADMIN can view users
 */
router.get(
  "/",
  protect,
  authorize(["ADMIN"]),
  userController.getUsers
);

router.delete(
  "/:id",
  protect,
  authorize(["ADMIN"]),
  userController.deleteUser
);

router.patch(
  "/:id/status", 
  protect, authorize(["ADMIN"]), 
  userController.updateUserStatus);

module.exports = router;