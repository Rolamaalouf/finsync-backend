const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const ProfitGoal = sequelize.define("ProfitGoal", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  goalAmount: { type: DataTypes.FLOAT, allowNull: false },
  targetDate: { type: DataTypes.DATE, allowNull: false },
});

module.exports = ProfitGoal;
