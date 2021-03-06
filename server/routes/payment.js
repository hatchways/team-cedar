const express = require('express');
const { getAllPayments, getPayment, makePayment, cancelPayment, createPayment } = require('../controllers/payment');
const router = express.Router();
const { protect } = require('../middleware/auth');

router.route("/").get(protect, getAllPayments).post(protect, createPayment);
router.route("/:id").get(protect, getPayment);
router.route("/:id/pay").put(protect, makePayment);
router.route("/:id/cancel").put(protect, cancelPayment);

module.exports = router;