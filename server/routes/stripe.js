const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { config, checkoutSession, createCheckoutSession } = require('../controllers/stripe')

router.route("/config").get(protect, config);
router.route("/session").get(protect, checkoutSession).post(protect, createCheckoutSession)

module.exports = router;
