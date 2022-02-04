const asyncHandler = require("express-async-handler");
const Payment = require("../models/Payment");

exports.createPayment = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const { sitterId, rate, startTime, endTime, customerId } = req.body;

  const createPayment = await Payment.create({
    userId,
    sitterId,
    rate,
    hoursOfService: {
      startTime,
      endTime,
    },
    customerId,
  });

  if (!createPayment) {
    res.status(400);
    throw new Error("Invalid Data");
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: payment.totalPayment,
    currency: "cad",
    payment_method_types: ["card"],
  });

  console.log("payment intent", paymentIntent);
  createPayment.client_secret = paymentIntent.client_secret;
  await createPayment.save();

  return res.status(200).json({
    success: {
      payment: createPayment,
    },
  });
});

exports.getPayment = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const payment = await Payment.findById(id);
  if (!payment) {
    res.status(404);
    throw new Error("Pls enter valid payment id");
  }
  return res.status(200).json({
    success: {
      payment: payment,
    },
  });
});

exports.makePayment = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;
  const cardElement = req.body.cardElement;
  const payment = await Payment.findOne({ userId: userId, id });
  if (!payment) {
    res.status(404);
    throw new Error("Payment doesn't exist");
  }

  const { paymentIntent, error } = await stripe.confirmCardPayment(
    payment.client_secret,
    {
      payment_method: { card: cardElement },
    }
  );
  if (error) {
    res.status(500).json({
      error: {
        msg: "Unable to complete payment",
      },
    });
  } else {
    payment.set({ paid: true });
    const updatedPayment = await payment.save();
    if (updatedPayment) {
      return res.status(200).json({
        success: {
          payment: updatedPayment,
          msg: "Payment Complete",
        },
      });
    }
  }
});

exports.cancelPayment = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const { id } = req.params;
  const merchantPayment = await Payment.findOne({ id: id, sitterId: userId });
  if (!merchantPayment) {
    res.status(401);
    throw new Error("Only merchant can cancel");
  } else {
    merchantPayment.set({ cancel: true });
    const updatedPayment = await merchantPayment.save();
    if (updatedPayment) {
      return res.status(200).json({
        success: {
          payment: updatedPayment,
          msg: "Payment has been Canceled",
        },
      });
    }
  }
});

exports.getAllPayments = asyncHandler(async (req, res, next) => {
  const payment = await Payment.find({ userId: req.user.id });
  return res.status(200).json({
    success: {
      payment: payment,
    },
  });
});
