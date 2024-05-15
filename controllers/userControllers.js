const User = require("../models/Users.js");
const sequelize = require('../database/db')
const createError= require("../utils/errorResponse.js");
const Role=require("../models/role.js");
const UserRole=require("../models/userRole.js")
// GET ALL USER
exports.getAllUser = async (req, res,next) => {

    try {
        const users = await User.findAll({
            attributes: { exclude: ["password"] },
            include:{
              model: Role
            }
          });
     
      const formattedUsers = users.map((user) => ({
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        isSuperTenant: user.isSuperTenant,
        role: user.Roles.length ? user.Roles[0].name : null, 
      }));
          return res.status(200).json({
            data:
            formattedUsers});
        
    } catch (error) {
        return next(createError.createError(500,"Internal server Error"))
        
    }

};




// CREATE USER
exports.createUser= async (req, res,next) => {
  const transaction = await sequelize.transaction();
  try {
    const { fullName, email, password, phoneNumber,roleId } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return next(createError.createError(500,"User already exists"))
    }

    const defaultRole = await Role.findOne({ where: { name: "user" } });
    if (!defaultRole) {

      return next(createError.createError(404,"Default role not found"))
    }

    const newUser = await User.create({
      fullName,
      email,
      password,
      phoneNumber,
    }, {transaction});


    
    await UserRole.create({
      UserId: newUser.id,
      RoleId: defaultRole.id,
    },{transaction});
    await transaction.commit();
    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error registering user:", error);
    await transaction.rollback();
    return next(createError.createError(500,"Internal server error"))
  }
};


