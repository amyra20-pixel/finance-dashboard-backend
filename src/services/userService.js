const prisma = require("../prisma");

/**
 * CREATE USER
 */
const createUser = async (data) => {
  return await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: data.password, 
      role: data.role,
      status: data.status || "ACTIVE"
    }
  });
};

/**
 * GET ALL USERS
 */
const getAllUsers = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true
      
    }
  });
};

//DELETE USER
const deleteUser = async (id) => {
  return await prisma.user.delete({
    where: { id }
  });
};


// UPDATE USER STATUS
const updateUserStatus = async ({ id, status, user }) => {
  
  // only ADMIN allowed
  if (user.role !== "ADMIN") {
    throw new Error("FORBIDDEN");
  }

  // validate status
  const validStatuses = ["ACTIVE", "INACTIVE"];
  if (!validStatuses.includes(status)) {
    throw new Error("INVALID_STATUS");
  }

  // check if user exists
  const existingUser = await prisma.user.findUnique({
    where: { id },
  });

  if (!existingUser) {
    throw new Error("NOT_FOUND");
  }

  // update user
  return await prisma.user.update({
    where: { id },
    data: {
      status,
    },
  });
};


module.exports = {
  createUser,
  getAllUsers,
  deleteUser,
  updateUserStatus
};