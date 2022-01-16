const User = require("../models/User");
const Notifications = require("../models/Notifications");
const asyncHandler = require("express-async-handler");

// @route GET /notifications/all
// @desc get all notifications for a user
// @access private
exports.getAllNotifications = asyncHandler(async (req, res, next) => {
  const id = req.user.id;

  const notifications = await Notifications.find({ userId: id });

  res.status(200).json({
    success: {
      notifications: notifications,
    },
  });
});
