const mongoose = require("mongoose");

const availabilitySchema = new mongoose.Schema({
  petSitterId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "User",
  },
  schedules: {
    type: [scheduleSchema],
  },
  activatedSchedule: {
    type: mongoose.Schema.Types.ObjectId,
    nullable: true,
    ref: "Schedule",
  },
});

const scheduleSchema = new mongoose.Schema({
  dates: {
    type: [dateSchema],
  },
});

const dateSchema = new mongoose.Schema({
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
  },
  startTime: {
    type: Number,
    required: true,
  },
  endTime: {
    type: Number,
    required: true,
  },
});

Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = Availability = mongoose.model(
  "Availability",
  availabilitySchema
);
