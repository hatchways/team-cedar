const validateSchedule = (req, res, next) => {
  try {
    const schedule = JSON.parse(req.body.schedule);

    req.schedule = {
      name: schedule.name,
      timeSlots: schedule.timeSlots,
    };
    next();
  } catch (err) {
    res
      .status(400)
      .send(
        "Bad input; expected format is \n{\n\tname: String,\n\tschedule: [{ day: String, startTime: [0, 24], endTime: [0-24] }, ...] }"
      );
  }
};

module.exports = { validateSchedule };
