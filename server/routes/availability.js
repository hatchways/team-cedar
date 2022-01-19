const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const {
  createSchedule,
  editSchedule,
  getActiveSchedule,
  getAvailability,
  setActiveSchedule,
} = require("../controllers/availability");

router.route("/createSchedule").post(protect, createSchedule);

router.route("/:scheduleId").put(protect, editSchedule);

router.route("/active").get(protect, getActiveSchedule);

router.route("/").get(protect, getAvailability);

router.route("/:scheduleId/activate").put(protect, setActiveSchedule);

module.exports = router;
