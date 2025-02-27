// models/superAdmin.js
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database"); // Adjust the path as necessary

class SuperAdmin extends Model {}

SuperAdmin.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email :{
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "SuperAdmin",
  }
);

module.exports = SuperAdmin;