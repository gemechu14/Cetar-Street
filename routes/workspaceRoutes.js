const express = require("express");
const workspacesControllers = require("../controllers/workspaceController.js");
// const middleware=require("../middleware/auth.js")
const router = express.Router();
//GET WORKSPACES
router.get("/workspaces", workspacesControllers.getWorkspaces);
//GET ACCESS TOKEN
router.get("/", workspacesControllers.getAccessToken);

module.exports = router;
