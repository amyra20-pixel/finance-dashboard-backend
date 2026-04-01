const prisma = require('../prisma');

// Summary: income, expense, balance
const getSummary = async () => {
  const records = await prisma.financialRecord.findMany();

  let totalIncome = 0;
  let totalExpense = 0;

  records.forEach(r => {
    if (r.type === 'income') totalIncome += r.amount;
    if (r.type === 'expense') totalExpense += r.amount;
  });

  return {
    totalIncome,
    totalExpense,
    netBalance: totalIncome - totalExpense
  };
};

// Category breakdown
const getCategoryBreakdown = async () => {
  const records = await prisma.financialRecord.findMany();

  const result = {};

  records.forEach(r => {
    if (!result[r.category]) {
      result[r.category] = 0;
    }
    result[r.category] += r.amount;
  });

  return result;
};

// Recent transactions
const getRecent = async () => {
  return await prisma.financialRecord.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5
  });
};

module.exports = {
  getSummary,
  getCategoryBreakdown,
  getRecent
};