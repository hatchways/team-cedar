const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const {
  getAllRequest,
  createRequest,
  updateRequestById,
} = require("../controllers/request");

router.route("/").get(protect, getAllRequest).post(protect, createRequest);
router.route("/:id/edit").put(protect, updateRequestById);

module.exports = router;
