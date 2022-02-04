const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { validateSchedule } = require("../middleware/schedule");
const {
  createSchedule,
  editSchedule,
  deleteSchedule,
  getActiveSchedule,
  getAvailability,
  setActiveSchedule,
} = require("../controllers/availability");

router.route("/active").get(protect, getActiveSchedule);

router.route("/").get(protect, getAvailability);

router.route("/").post(protect, createSchedule);

router.route("/:scheduleId").put(protect, validateSchedule, editSchedule);

router.route("/:scheduleId").delete(protect, deleteSchedule);

router
  .route("/:scheduleId/activate")
  .put(protect, validateSchedule, setActiveSchedule);

module.exports = router;
