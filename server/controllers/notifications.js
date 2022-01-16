const Notifications = require("../models/Notifications");
const asyncHandler = require("express-async-handler");

// @route GET /notifications
// @desc get unread notifications for a user
// @access private
exports.getUnreadNotifications = asyncHandler(async (req, res, next) => {
  const id = req.user.id;

  const notifications = await Notifications.find({ userId: id, read: false });

  res.status(200).json({
    success: {
      notifications: notifications,
    },
  });
});

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
