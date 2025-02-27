require("dotenv").config();
const { Sequelize } = require("sequelize");

console.log("DATABASE_URL:", process.env.DATABASE_URL);


const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false, // Disable logs in production
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
})();

module.exports = sequelize;
