const express = require("express");
const permissionControllers = require("../controllers/permissionControllers");
const router = express.Router();

router.get("/", permissionControllers.getAllPermissions);
router.post("/",permissionControllers.createpermission);

module.exports = router;
