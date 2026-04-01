const prisma = require('../prisma');

const createUser = async (data) => {
  return await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      role: data.role,
      status: 'active'
    }
  });
};

const getAllUsers = async () => {
  return await prisma.user.findMany();
};

module.exports = {
  createUser,
  getAllUsers
};