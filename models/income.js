const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Category = require("./category");

const Income = sequelize.define("Income", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  amount: { type: DataTypes.FLOAT, allowNull: false },
  currency: { type: DataTypes.STRING, allowNull: false },
  date: { type: DataTypes.DATE, allowNull: false },
  isRecurring: { type: DataTypes.BOOLEAN, defaultValue: false },
  startDate: { type: DataTypes.DATE },
  endDate: { type: DataTypes.DATE },
  categoryId: { type: DataTypes.UUID, allowNull: false, references: { model: Category, key: "id" } },
});

module.exports = Income;
