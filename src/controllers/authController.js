const authService = require("../services/authService");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await authService.login({ email, password });

    res.json(result);

  } catch (error) {

    if (error.message === "Invalid credentials") {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    if (error.message === "User inactive") {
      return res.status(403).json({ error: "User is inactive" });
    }

    res.status(500).json({ error: "Login failed" });
  }
};

module.exports = { login };