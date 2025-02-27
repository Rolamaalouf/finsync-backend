// routes/superAdminRoutes.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SuperAdmin = require("../models/superAdmin");

const router = express.Router();

router.post("/create", async (req, res) => {
  const { username, password, email } = req.body; // Ensure email is included

  try {
    // Check if username, password, and email are provided
    if (!username || !password || !email) {
      return res.status(400).json({ message: "Username, password, and email are required" });
    }

    // Check for existing username
    const existingAdmin = await SuperAdmin.findOne({ where: { username } });
    if (existingAdmin) {
      return res.status(409).json({ message: "Username already taken" });
    }

    // Check for existing email
    const existingEmail = await SuperAdmin.findOne({ where: { email } });
    if (existingEmail) {
      return res.status(409).json({ message: "Email already taken" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create the new super admin with the email included
    const newSuperAdmin = await SuperAdmin.create({ 
      username, 
      password: hashedPassword, 
      email 
    });

    res.status(201).json({ message: "Super admin created successfully", newSuperAdmin });
  } catch (error) {
    console.error("Error creating Super Admin:", error);
    res.status(500).json({ message: "Error creating Super Admin: " + error.message });
  }
});
// Route for super admin login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Validate input
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    // Find the super admin by username
    const superAdmin = await SuperAdmin.findOne({ where: { username } });

    // Check if super admin exists and password matches
    if (!superAdmin || !(await bcrypt.compare(password, superAdmin.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: superAdmin.id, role: "superadmin" },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Respond with success message and token
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Error during login: " + error.message });
  }
});


module.exports = router;