const prisma = require('../prisma');

const createRecord = async (data) => {
  return await prisma.financialRecord.create({
    data: {
      amount: data.amount,
      type: data.type,
      category: data.category,
      date: data.date,
      notes: data.notes,
      userId: data.userId
    }
  });
};

const getRecords = async (filters) => {
  return await prisma.financialRecord.findMany({
    where: {
      // USER ISOLATION
      ...(filters.role !== "ADMIN" && {
        userId: filters.userId
      }),

      // OPTIONAL FILTERS
      ...(filters.type && {
        type: filters.type
      }),

      ...(filters.category && {
        category: filters.category
      }),

      // DATE RANGE FILTER
      ...(filters.startDate && filters.endDate && {
        date: {
          gte: new Date(filters.startDate),
          lte: new Date(filters.endDate)
        }
      })
    },

    orderBy: {
      date: "desc"
    }
  });
};

const updateRecord = async ({ id, data, userId, role }) => {

  const record = await prisma.financialRecord.findUnique({
    where: { id }
  });

  if (!record) {
    throw new Error("NOT_FOUND");
  }

  // OWNERSHIP CHECK
  if (record.userId !== userId && role !== "ADMIN") {
    throw new Error("FORBIDDEN");
  }

  return await prisma.financialRecord.update({
    where: { id },
    data
  });
};

const deleteRecord = async ({ id, userId, role }) => {

  const record = await prisma.financialRecord.findUnique({
    where: { id }
  });

  if (!record) {
    throw new Error("NOT_FOUND");
  }

  // ownership / admin check
  if (record.userId !== userId && role !== "ADMIN") {
    throw new Error("FORBIDDEN");
  }

  return await prisma.financialRecord.delete({
    where: { id }
  });
};

module.exports = {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord
};