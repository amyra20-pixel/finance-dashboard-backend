const prisma = require('../prisma');

const createRecord = async (data) => {
  return await prisma.financialRecord.create({
    data: {
      amount: data.amount,
      type: data.type,
      category: data.category,
      date: new Date(data.date),
      notes: data.notes,
      userId: data.userId
    }
  });
};

const getRecords = async (filters) => {
  return await prisma.financialRecord.findMany({
    where: {
      type: filters.type,
      category: filters.category,
    }
  });
};

module.exports = {
  createRecord,
  getRecords
};