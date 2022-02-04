const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { connect } = require("../controllers/stripe");

router.route("/stripe").post(protect, connect);

module.exports = router;
