const jwt = require("jsonwebtoken");
const prisma = require("../prisma");

/**
 * AUTHENTICATION MIDDLEWARE
 * Verifies JWT and attaches user to request
 */
const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Authorization token required" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id }
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.status !== "ACTIVE") {
      return res.status(403).json({ error: "User is inactive" });
    }

    req.user = user;
    next();

  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

/**
 * AUTHORIZATION MIDDLEWARE
 * Checks if user has required role
 */
const authorize = (allowedRoles) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      if (!req.user.role || !allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ error: "Access denied" });
      }

      next();

    } catch (error) {
      return res.status(500).json({ error: "Authorization error" });
    }
  };
};

module.exports = {
  protect,
  authorize
};

