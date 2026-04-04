const prisma = require('../prisma');

// Summary: income, expense, balance
const getSummary = async (user) => {
  const records = await prisma.financialRecord.findMany({
    where: user.role === "ADMIN" ? {} : { userId: user.id }
  });

  let totalIncome = 0;
  let totalExpense = 0;

  records.forEach(r => {
    if (r.type === 'INCOME') totalIncome += r.amount;
    if (r.type === 'EXPENSE') totalExpense += r.amount;
  });

  return {
    totalIncome,
    totalExpense,
    netBalance: totalIncome - totalExpense
  };
};

// Category breakdown
const getCategoryBreakdown = async (user) => {
  const records = await prisma.financialRecord.findMany({
    where: user.role === "ADMIN" ? {} : { userId: user.id }
  });

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
const getRecent = async (user) => {
  return await prisma.financialRecord.findMany({
    where: user.role === "ADMIN" ? {} : { userId: user.id },
    orderBy: { createdAt: "desc" },
    take: 5
  });
};
//Get monthly trends
const getMonthlyTrends = async (user) => {
  const records = await prisma.financialRecord.findMany({
    where: user.role === "ADMIN" ? {} : { userId: user.id }
  });

  const result = {};

  records.forEach(r => {
    const month = r.date.toISOString().slice(0, 7); // YYYY-MM

    if (!result[month]) {
      result[month] = { income: 0, expense: 0 };
    }

    if (r.type === "INCOME") result[month].income += r.amount;
    if (r.type === "EXPENSE") result[month].expense += r.amount;
  });

  return Object.keys(result).sort().map(month => ({
    month,
    ...result[month]
  }));
};

module.exports = {
  getSummary,
  getCategoryBreakdown,
  getRecent,
  getMonthlyTrends
};