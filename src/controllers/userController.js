const userService = require('../services/userService');
const validator = require('validator');

const createUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;

    // Required fields
    if (!name || !email || !role) {
      return res.status(400).json({ error: 'All fields required' });
    }

    // Email validation
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Role validation
    const validRoles = ['admin', 'analyst', 'viewer'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    const user = await userService.createUser({ name, email, role });

    res.status(201).json(user);

  } catch (error) {

    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Email already exists' });
    }

    console.log(error);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

module.exports = {
  createUser,
  getUsers
};