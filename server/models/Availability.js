const mongoose = require("mongoose");

const availabilitySchema = new mongoose.Schema({
  petSitterId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "User",
  },
  schedules: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Schedule" }],
  },
  activeSchedule: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Schedule",
    default: null,
  },
});

const timeSlotSchema = new mongoose.Schema({
  day: {
    type: String,
    enum: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    required: true,
  },
  startTime: {
    type: Number,
    required: true,
    min: [0, "startTime must be between 0 and 24"],
    max: [24, "startTime must be between 0 and 24"],
  },
  endTime: {
    type: Number,
    required: true,
    min: [0, "endTime must be between 0 and 24"],
    max: [24, "endTime must be between 0 and 24"],
  },
});

const scheduleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  timeSlots: {
    type: [timeSlotSchema],
  },
});

Schedule = mongoose.model("Schedule", scheduleSchema);
Availability = mongoose.model("Availability", availabilitySchema);

module.exports = { Availability, Schedule };
