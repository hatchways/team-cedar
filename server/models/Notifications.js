const mongoose = require("mongoose");

const notificationsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  type: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  read: {
    type: Boolean,
    default: false,
  },
  time: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Notifications = mongoose.model(
  "Notifications",
  notificationsSchema
);
