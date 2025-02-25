const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const SuperAdmin = require("../models/superAdmin");

// Super Admin Login

// Test Route
router.get("/", (req, res) => {
  res.json({ message: "Super Admin route is working!" });
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const superAdmin = await SuperAdmin.findOne({ where: { username } });

    if (!superAdmin || !(await bcrypt.compare(password, superAdmin.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: superAdmin.id, role: "superadmin" }, process.env.JWT_SECRET, { expiresIn: "24h" });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a Super Admin (One-time use)
router.post("/create", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newSuperAdmin = await SuperAdmin.create({ username, password: hashedPassword });

    res.status(201).json({ message: "Super Admin created successfully", newSuperAdmin });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
