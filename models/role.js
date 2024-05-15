const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database/db.js");

const Role = sequelize.define("Role", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },

});


module.exports = Role;
