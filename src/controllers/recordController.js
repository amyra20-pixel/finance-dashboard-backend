const recordService = require('../services/recordService');

const createRecord = async (req, res) => {
  try {
    const { amount, type, category, date, notes, userId } = req.body;

    if (!amount || !type || !category || !date || !userId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    if (amount <= 0) {
  return res.status(400).json({ error: 'Amount must be positive' });
}

if (!['income', 'expense'].includes(type)) {
  return res.status(400).json({ error: 'Invalid type' });
}

    const record = await recordService.createRecord({
      amount,
      type,
      category,
      date,
      notes,
      userId
    });

    res.status(201).json(record);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to create record' });
  }
};

const getRecords = async (req, res) => {
  try {
    const { type, category } = req.query;

    const records = await recordService.getRecords({ type, category });

    res.json(records);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch records' });
  }
};

module.exports = {
  createRecord,
  getRecords
};