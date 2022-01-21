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

// @route PUT /notifications/read
// @desc mark all notifications for a user as read
// @access private
exports.markNotificationsAsRead = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  let update = await Notifications.updateMany(
    { userId: userId, read:false },
    { read: true },
    {
      new: true, 
    }
  );
  res.status(200).json({
    success: {
      updated: update,
    },
  });
});

// @route POST /notifications
// @desc create a new notification
// @access private

exports.createNotification = asyncHandler(async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { type, title, description } = req.body;
    const newNotification = await Notifications.create({
      userId,
      type,
      title,
      description,
    });
    res.status(201).json({ notification: newNotification });
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
});
