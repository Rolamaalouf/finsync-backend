const jwt = require("jsonwebtoken");
const { Admin } = require("./models/admin");

// Middleware to authenticate and authorize Super Admin
const authenticateSuperAdmin = async (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findByPk(decoded.adminId);

    if (admin && admin.role === "superadmin") {
      req.admin = admin;
      next();
    } else {
      res.status(403).json({ message: "Access denied, super admin required" });
    }
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};

module.exports = { authenticateSuperAdmin };
