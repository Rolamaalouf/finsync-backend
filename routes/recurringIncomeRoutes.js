const express = require("express");
const router = express.Router();
const RecurringIncome = require("../models/recurringIncome");

// Create a new recurring income
router.post("/create", async (req, res) => {
  try {
    const { title, description, amount, currency, startDate, endDate, frequency, categoryId } = req.body;
    const newRecurringIncome = await RecurringIncome.create({ title, description, amount, currency, startDate, endDate, frequency, categoryId });

    res.status(201).json({ message: "Recurring income created successfully", newRecurringIncome });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all recurring incomes
router.get("/", async (req, res) => {
  try {
    const incomes = await RecurringIncome.findAll();
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching recurring incomes", error: error.message });
  }
});


module.exports = router;
