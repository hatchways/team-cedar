const express = require("express");
const router = express.Router();
const { validateRegister, validateLogin } = require("../validate");
const { protect, addDemoUserCredentials } = require("../middleware/auth");
const {
  registerUser,
  loginUser,
  loadUser,
  logoutUser,
} = require("../controllers/auth");

router.route("/register").post(validateRegister, registerUser);

router.route("/login").post(validateLogin, loginUser);

router.route("/demo").post(addDemoUserCredentials, loginUser);

router.route("/user").get(protect, loadUser);

router.route("/logout").post(logoutUser);

module.exports = router;
