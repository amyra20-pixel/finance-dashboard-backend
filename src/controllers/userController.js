const userService = require("../services/userService");
const bcrypt = require("bcryptjs");
const validator = require("validator");

/**
 * CREATE USER
 * Admin-controlled user creation
 */
const createUser = async (req, res) => {
  try {
    const { name, email, password, role, status } = req.body;

    // Required fields
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email, password required" });
    }

    // Email validation
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    //Password strength validation
    if (password.length < 6) {
      return res.status(400).json({
        error: "Password must be at least 6 characters"
      });
    }

    //Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Role validation 
    const validRoles = ["ADMIN", "ANALYST", "VIEWER"];
    const finalRole = role ? role.toUpperCase() : "VIEWER";

    if (!validRoles.includes(finalRole)) {
      return res.status(400).json({ error: "Invalid role" });
    }

    // Status validation
    const validStatus = ["ACTIVE", "INACTIVE"];
    const finalStatus = "ACTIVE";

    if (!validStatus.includes(finalStatus)) {
      return res.status(400).json({ error: "Invalid status" });
    }

   
    const user = await userService.createUser({
      name,
      email,
      password: hashedPassword,
      role: finalRole,
      status: finalStatus
    });

    res.status(201).json({
      message: "User created successfully",
      user
  });

  } catch (error) {
    if (error.code === "P2002") {
      return res.status(400).json({ error: "Email already exists" });
    }

    console.error(error);
    res.status(500).json({ error: "Failed to create user" });
  }
};

/**
 * GET ALL USERS
 */
const getUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();

    res.status(200).json(users);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await userService.deleteUser(Number(id));

    res.json({ message: "User deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};

// UPDATE USER STATUS (PATCH /users/:id/status)
const updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: "Status is required" });
    }

    const updatedUser = await userService.updateUserStatus({
      id: Number(id),
      status,
      user: req.user,
    });

    res.json(updatedUser);

  } catch (error) {
    if (error.message === "NOT_FOUND") {
      return res.status(404).json({ error: "User not found" });
    }

    if (error.message === "FORBIDDEN") {
      return res.status(403).json({ error: "Not allowed" });
    }

    console.error(error);
    res.status(500).json({ error: "Failed to update user status" });
  }
};


module.exports = {
  createUser,
  getUsers,
  deleteUser,
  updateUserStatus
};