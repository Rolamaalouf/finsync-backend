const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const Category = require("./models/category");

const RecurringExpense = sequelize.define("RecurringExpense", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  amount: { type: DataTypes.FLOAT, allowNull: false },
  currency: { type: DataTypes.STRING, allowNull: false },
  startDate: { type: DataTypes.DATE, allowNull: false },
  endDate: { type: DataTypes.DATE, allowNull: false },
  frequency: { type: DataTypes.ENUM("daily", "weekly", "monthly", "yearly"), allowNull: false },
  categoryId: { type: DataTypes.UUID, allowNull: false, references: { model: Category, key: "id" } },
});

module.exports = RecurringExpense;
