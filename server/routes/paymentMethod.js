const express = require("express");
const router = express.Router();
const { createPaymentSession, listPaymentSession } = require("../controllers/paymentMethod");
const { protect } = require("../middleware/auth");

router.route("/session").post(protect, createPaymentSession);
router.route("/session").get(protect, listPaymentSession)
module.exports = router;
