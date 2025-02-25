const express = require("express");
const router = express.Router();
const { Income } = require("../models/income");
const { authenticateSuperAdmin } = require("../authenticateSuperAdmin");

// Create Income
router.post("/", async (req, res) => {
  try {
    const { title, description, amount, currency, date, categoryId } = req.body;
    const income = await Income.create({ title, description, amount, currency, date, categoryId });
    res.status(201).json({ message: "Income added!", income });
  } catch (error) {
    res.status(500).json({ message: "Error adding income" });
  }
});

// Update Income (Super Admin Only)
router.put("/:id", authenticateSuperAdmin, async (req, res) => {
  const { id } = req.params;
  const { title, description, amount, currency, date, categoryId } = req.body;

  try {
    const income = await Income.findByPk(id);
    if (income) {
      income.title = title;
      income.description = description;
      income.amount = amount;
      income.currency = currency;
      income.date = date;
      income.categoryId = categoryId;

      await income.save();
      res.status(200).json({ message: "Income updated!", income });
    } else {
      res.status(404).json({ message: "Income not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating income" });
  }
});

// Delete Income (Super Admin Only)
router.delete("/:id", authenticateSuperAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const income = await Income.findByPk(id);
    if (income) {
      await income.destroy();
      res.status(200).json({ message: "Income deleted!" });
    } else {
      res.status(404).json({ message: "Income not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting income" });
  }
});

module.exports = router;
