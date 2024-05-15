const express = require("express");
const roleControllers = require("../controllers/roleControllers.js");
const router = express.Router();

router.get("/getall", roleControllers.getAllRoles);

module.exports = router;
