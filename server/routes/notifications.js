const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  getAllNotifications,
  getUnreadNotifications,
} = require("../controllers/notifications");

router.route("/").get(protect, getUnreadNotifications);

router.route("/all").get(protect, getAllNotifications);

module.exports = router;
