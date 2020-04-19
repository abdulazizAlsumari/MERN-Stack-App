const express = require("express");
const router = express.Router();

const userController = require("../controller/user_controller");

// Auth and Sign up
router.post("/register", userController.register);

module.exports = router;
