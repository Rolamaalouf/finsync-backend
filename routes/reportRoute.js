const express = require("express");
const router = express.Router();
const Income = require("../models/income");
const Expense = require("../models/expense");
const { Op } = require("sequelize");

// Yearly Report
router.get("/yearly/:year", async (req, res) => {
  const year = req.params.year;

  try {
    const startOfYear = new Date(`${year}-01-01`);
    const endOfYear = new Date(`${year}-12-31`);

    const incomes = await Income.findAll({ where: { date: { [Op.gte]: startOfYear, [Op.lt]: endOfYear } } });
    const expenses = await Expense.findAll({ where: { date: { [Op.gte]: startOfYear, [Op.lt]: endOfYear } } });

    res.json({ incomes, expenses });
  } catch (error) {
    res.status(500).json({ message: "Error generating yearly report" });
  }
});

// Monthly Report
router.get("/monthly/:year/:month", async (req, res) => {
  const { year, month } = req.params;
  const startOfMonth = new Date(`${year}-${month.padStart(2, "0")}-01`);
  const endOfMonth = new Date(`${year}-${month.padStart(2, "0")}-31`);

  try {
    const incomes = await Income.findAll({ where: { date: { [Op.gte]: startOfMonth, [Op.lt]: endOfMonth } } });
    const expenses = await Expense.findAll({ where: { date: { [Op.gte]: startOfMonth, [Op.lt]: endOfMonth } } });

    res.json({ incomes, expenses });
  } catch (error) {
    res.status(500).json({ message: "Error generating monthly report" });
  }
});

// Weekly Report
router.get("/weekly/:year/:week", async (req, res) => {
  const { year, week } = req.params;

  // Get start and end date of the week
  const startOfWeek = new Date(year, 0, (week - 1) * 7 + 1); // Approximate start date
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(endOfWeek.getDate() + 6); // End of week

  try {
    const incomes = await Income.findAll({ where: { date: { [Op.gte]: startOfWeek, [Op.lt]: endOfWeek } } });
    const expenses = await Expense.findAll({ where: { date: { [Op.gte]: startOfWeek, [Op.lt]: endOfWeek } } });

    res.json({ incomes, expenses });
  } catch (error) {
    res.status(500).json({ message: "Error generating weekly report" });
  }
});

module.exports = router;
