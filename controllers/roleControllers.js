const Role = require("../models/role.js");
const createError=require("../utils/errorResponse.js")


// GET ALL USER
exports.getAllRoles = async (req, res,next) => {

    try {
        const roles = await Role.findAll(
            {
                attributes:{ exclude:[ "createdAt","updatedAt"]}
            }
        );
    
          return res.status(200).json({
            data:roles});
        
    } catch (error) {
        return next(createError.createError(500,"Internal server Error"))
        
    }

};
