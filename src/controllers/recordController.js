const recordService = require('../services/recordService');

const createRecord = async (req, res) => {
  try {
    const { amount, type, category, date, notes, } = req.body;

    if (!amount || !type || !category || !date ) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    if (amount <= 0) {
  return res.status(400).json({ error: 'Amount must be positive' });
}

if (!['INCOME', 'EXPENSE'].includes(type)) {
  return res.status(400).json({ error: 'Invalid type' });
}
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ error: "Invalid date format" });
    }
    const record = await recordService.createRecord({
      amount,
      type,
      category,
      date,
      notes,
      userId: req.user.id
      
    });

    res.status(201).json(record);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to create record' });
  }
};

const getRecords = async (req, res) => {
  try {
    const { type, category, startDate, endDate } = req.query;

    const records = await recordService.getRecords({ 
      type, 
      category,
      startDate,
      endDate,
      userId: req.user.id,
      role: req.user.role
   });

    res.json(records);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch records' });
  }
};

const updateRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, type, category, date, notes } = req.body;

    // VALIDATION

    if (amount !== undefined && amount <= 0) {
      return res.status(400).json({ error: "Amount must be positive" });
    }

    if (type && !['INCOME', 'EXPENSE'].includes(type)) {
      return res.status(400).json({ error: "Invalid type" });
    }

    if (date) {
      const parsedDate = new Date(date);

      if (isNaN(parsedDate)) {
        return res.status(400).json({ error: "Invalid date format" });
      }
    }

    const updated = await recordService.updateRecord({
      id: Number(id),
      data: {
        ...(amount !== undefined && { amount }),
        ...(type && { type }),
        ...(category && { category }),
        ...(date && { date: new Date(date) }),
        ...(notes !== undefined && { notes })
      },
      userId: req.user.id,
      role: req.user.role
    });

    res.json(updated);

  } catch (error) {

    // HANDLE KNOWN ERRORS

    if (error.message === "NOT_FOUND") {
      return res.status(404).json({ error: "Record not found" });
    }

    if (error.message === "FORBIDDEN") {
      return res.status(403).json({ error: "Not allowed to update this record" });
    }

    if (error.message === "INVALID_DATE") {
      return res.status(400).json({ error: "Invalid date" });
    }

    // FALLBACK 

    console.error(error);
    res.status(500).json({ error: "Update failed" });
  }
};
const deleteRecord = async (req, res) => {
  try {
    const { id } = req.params;

    await recordService.deleteRecord({
      id: Number(id),
      userId: req.user.id,
      role: req.user.role
    });

    res.json({ message: "Record deleted successfully" });

  } catch (error) {

    if (error.message === "NOT_FOUND") {
      return res.status(404).json({ error: "Not found" });
    }

    if (error.message === "FORBIDDEN") {
      return res.status(403).json({ error: "Not allowed" });
    }

    res.status(500).json({ error: "Delete failed" });
  }
};

module.exports = {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord
};