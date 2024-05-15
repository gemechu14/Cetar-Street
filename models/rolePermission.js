const { DataTypes } = require('sequelize')
const sequelize = require('../database/db')
const Company = require('./company.js')
const User=require("../models/Users.js");
const Role= require("../models/role.js")

const RolePermission = sequelize.define('RolePermission', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
 
})
// RolePermission.sync({ force: true }).then(() => console.log('positon model is ready'));
User.belongsToMany(Role, {
  through: RolePermission,
});
Role.belongsToMany(User, {
  through: RolePermission,
});
// Company.hasMany(RolePermission)
// RolePermission.belongsTo(Company)

module.exports = RolePermission
