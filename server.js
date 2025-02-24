require("dotenv").config();
const express = require("express");
const sequelize = require("./config/database");
const superAdminRoutes = require("./routes/superAdminRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();
app.use(express.json());

app.use("/super-admin", superAdminRoutes);
app.use("/admin", adminRoutes);

sequelize.sync().then(() => {
  console.log("Database synced");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
