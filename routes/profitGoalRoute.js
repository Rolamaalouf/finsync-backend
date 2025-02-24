const express = require("express");
const router = express.Router();
const { ProfitGoal } = require("../models");

// Create Profit Goal
router.post("/", async (req, res) => {
  try {
    const { goalAmount, currency, deadline } = req.body;
    const profitGoal = await ProfitGoal.create({ goalAmount, currency, deadline });
    res.status(201).json({ message: "Profit goal set!", profitGoal });
  } catch (error) {
    res.status(500).json({ message: "Error setting profit goal" });
  }
});

// Get all Profit Goals
router.get("/", async (req, res) => {
  try {
    const profitGoals = await ProfitGoal.findAll();
    res.status(200).json(profitGoals);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving profit goals" });
  }
});

module.exports = router;
