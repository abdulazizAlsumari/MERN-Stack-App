const express = require("express");
const router = express.Router();
const passport = require("passport");
const userController = require("../controller/user_controller");

// Auth and Sign up
router.post("/register", userController.register);
router.post("/auth", userController.login);

router.get(
  "/test",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    return res.send({ message: "hi , you are authintacated " });
  }
);

module.exports = router;
