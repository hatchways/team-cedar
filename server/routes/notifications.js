const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  getAllNotifications,
  getUnreadNotifications,
  markNotificationAsRead,
} = require("../controllers/notifications");

router.route("/").get(protect, getUnreadNotifications);

router.route("/all").get(protect, getAllNotifications);

router.route("/:id").put(protect, markNotificationAsRead);

module.exports = router;
