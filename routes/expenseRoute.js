const express = require("express");
const router = express.Router();
const { Expense } = require("../models/expense");
const { authenticateSuperAdmin } = require("../authenticateSuperAdmin");

// Create Income
router.post("/", async (req, res) => {
  try {
    const { title, description, amount, currency, date, categoryId } = req.body;
    const income = await Income.create({ title, description, amount, currency, date, categoryId });
    res.status(201).json({ message: "Expense added!", expense });
  } catch (error) {
    res.status(500).json({ message: "Error adding income" });
  }
});

// Update Income (Super Admin Only)
router.put("/:id", authenticateSuperAdmin, async (req, res) => {
  const { id } = req.params;
  const { title, description, amount, currency, date, categoryId } = req.body;

  try {
    const expense = await Income.findByPk(id);
    if (expense) {
      expense.title = title;
      expense.description = description;
      expense.amount = amount;
      expense.currency = currency;
      expense.date = date;
      expense.categoryId = categoryId;

      await income.save();
      res.status(200).json({ message: "Income updated!", income });
    } else {
      res.status(404).json({ message: "Income not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating income" });
  }
});

// Delete Expense (Super Admin Only)
router.delete("/:id", authenticateSuperAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const expense = await Expense.findByPk(id);
    if (expense) {
      await expense.destroy();
      res.status(200).json({ message: "Ex deleted!" });
    } else {
      res.status(404).json({ message: "Income not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting income" });
  }
});

module.exports = router;

