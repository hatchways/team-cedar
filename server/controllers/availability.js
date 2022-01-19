const { Availability, Schedule } = require("../models/Availability");
const asyncHandler = require("express-async-handler");

// @route POST /availability/createSchedule
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

// @route PUT /availability/:scheduleId
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

  schedule.timeSlots = JSON.parse(req.body.schedule);
  await schedule.save();
  await availability.save();

  res.status(204).send();
});

// @route GET /availability/active
// @desc Get user profile data
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

// @route PUT /availability/:scheduleId/activate
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
