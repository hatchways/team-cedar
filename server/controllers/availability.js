const { Availability, Schedule } = require("../models/Availability");
const asyncHandler = require("express-async-handler");

// @route POST /availability/schedule/createSchedule
// @desc add a new user schedule
// @access Private
exports.createSchedule = asyncHandler(async (req, res, next) => {
  const availability = await Availability.findOne({
    petSitterId: req.user.id,
  });

  if (!availability) {
    res.status(404);
    throw new Error("Not found");
  }

  const schedule = await Schedule.create({
    timeSlots: JSON.parse(req.body.schedule),
  });
  if (!schedule) {
    res.status(400);
    throw new Error(
      "Bad input; expected format is { schedule: [{ day, startTime, endTime }, ] }"
    );
  }

  availability.schedules.push(schedule);
  await availability.save();

  res.status(201).send({ success: availability });
});

// @route PUT /availability/schedule/:scheduleId
// @desc edit user schedules
// @access Private
exports.editSchedule = asyncHandler(async (req, res, next) => {
  const availability = await Availability.findOne({
    petSitterId: req.user.id,
  });
  const schedule = await Schedule.findById(req.params.scheduleId);

  if (!availability || !schedule) {
    res.status(404);
    throw new Error("Not found");
  }

  schedule.name = req.schedule.name || schedule.name;
  schedule.timeSlots = req.schedule.timeSlots;

  await schedule.save();
  await availability.save();

  res.status(204).send();
});

// @route DELETE /availability/schedule/:scheduleId
// @desc Delete user profile data
// @access Private
exports.deleteSchedule = asyncHandler(async (req, res, next) => {
  Schedule.deleteOne({ _id: req.params.scheduleId }, (err) => {
    if (err) {
      res.status(404);
      throw new Error("Not found");
    }
  });

  res.status(204).send();
});

// @route GET /availability/schedule/active
// @desc Get user's active schedule
// @access Private
exports.getActiveSchedule = asyncHandler(async (req, res, next) => {
  const availability = await Availability.findOne({
    petSitterId: req.user.id,
  }).populate("activeSchedule");

  if (!availability) {
    res.status(404);
    throw new Error("Not found");
  }

  const activeSchedule = availability.activeSchedule;

  res.status(200).json({
    success: {
      activeSchedule: activeSchedule,
    },
  });
});

// @route GET /availability
// @desc get all schedules for this user
// @access Private
exports.getAvailability = asyncHandler(async (req, res, next) => {
  const availability = await Availability.findOne({
    petSitterId: req.user.id,
  }).populate("schedules activeSchedule");

  if (!availability) {
    res.status(404);
    throw new Error("Not found");
  }

  res.status(200).json({
    success: {
      availability,
    },
  });
});

// @route PUT /availability/schedule/:scheduleId/activate
// @desc activate schedule for user
// @access Private
exports.setActiveSchedule = asyncHandler(async (req, res, next) => {
  const availability = await Availability.findOne({
    petSitterId: req.user.id,
  }).populate("activeSchedule");

  const schedule = await Schedule.findById(req.params.scheduleId);
  availability.activeSchedule = schedule?._id || null;

  await availability.save();

  if (!availability) {
    res.status(404);
    throw new Error("Not found");
  }

  res.status(204).send();
});
