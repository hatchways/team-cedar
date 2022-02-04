const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const {
  getAllNotifications,
  getUnreadNotifications,
  markNotificationsAsRead,
  createNotification,
} = require("../controllers/notifications");

router.route("/").get(protect, getUnreadNotifications);

router.route("/all").get(protect, getAllNotifications);

router.route("/").post(protect, createNotification);

router.route("/read").put(protect, markNotificationsAsRead);

module.exports = router;
