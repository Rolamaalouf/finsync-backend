const express = require("express");
const router = express.Router();
const { RecurringExpense } = require("../models/recurringExpense");

// Create Recurring Expense
router.post("/", async (req, res) => {
  try {
    const { title, description, amount, currency, startDate, endDate, frequency, categoryId } = req.body;
    const recurringExpense = await RecurringExpense.create({ title, description, amount, currency, startDate, endDate, frequency, categoryId });
    res.status(201).json({ message: "Recurring Expense added!", recurringExpense });
  } catch (error) {
    res.status(500).json({ message: "Error adding recurring expense" });
  }
});

// Get all Recurring Expenses
router.get("/", async (req, res) => {
  try {
    const recurringExpenses = await RecurringExpense.findAll();
    res.status(200).json(recurringExpenses);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving recurring expenses" });
  }
});


module.exports = router;
