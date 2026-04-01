const prisma = require('../prisma');

const checkRole = (allowedRoles) => {
  return async (req, res, next) => {
    try {
      const userId = req.headers.userid;

      if (!userId) {
        return res.status(401).json({ error: 'User ID required' });
      }

      const user = await prisma.user.findUnique({
        where: { id: Number(userId) }
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      if (user.status !== 'active') {
        return res.status(403).json({ error: 'User inactive' });
      }

      if (!allowedRoles.includes(user.role)) {
        return res.status(403).json({ error: 'Access denied' });
      }

      req.user = user; // attach user
      next();

    } catch (error) {
      res.status(500).json({ error: 'Auth error' });
    }
  };
};

module.exports = {
  checkRole
};