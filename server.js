require("dotenv").config();
const express = require("express");
const sequelize = require("./database");
const superAdminRoutes = require("./routes/superAdminRoute");
const adminRoutes = require("./routes/adminRoute");

const app = express();
app.use(express.json());

app.use("/super-admin", superAdminRoutes);
app.use("/admin", adminRoutes);
app.use("/admin", require("./routes/adminRoute"));
app.use("/income", require("./routes/incomeRoute"));
app.use("/expense", require("./routes/expenseRoute"));
app.use("/profit", require("./routes/profitGoalRoute"));
app.use("/report", require("./routes/reportRoute"));

sequelize.sync().then(() => {
  console.log("Database synced");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
