const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database/db.js");

const Permission = sequelize.define("Permission", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },

});


module.exports = Permission;
