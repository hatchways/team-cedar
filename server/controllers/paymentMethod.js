const asyncHandler = require("express-async-handler");
const Profile = require("../models/Profile");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

// @route POST /payment_methods/session
// @desc create payment for future
// @access Private
exports.createPaymentSession = asyncHandler(async (req, res, next) => {
  const id = req.user.id;
  const getProfile = await Profile.findOne({ userId: id });
  var getStripeCustomerId;
  if (getProfile?.stripeCustomerId) {
    getStripeCustomerId = getProfile?.stripeCustomerId;
  } else {
    getStripeCustomerId = await stripe.customers.create();
    await Profile.findByIdAndUpdate(getProfile.id, {
      stripeCustomerId: getStripeCustomerId,
    });
  }
  if (getStripeCustomerId) {
    const setupIntent = await stripe.setupIntents.create({
      customer: getStripeCustomerId.id,
      payment_method_types: ["card"],
    });
    return res.status(200).json({
      success: {
        client_secret: setupIntent.client_secret,
      },
    });
  }
});



// @route GET /payment_methods/session
// @desc GET saved payment
// @access Private
exports.listPaymentSession = asyncHandler(async (req, res, next) => {
  const id = req.user.id;
  const getProfile = await Profile.findOne({ userId: id });
  console.log(getProfile?.stripeCustomerId);
  if (!getProfile.stripeCustomerId) {
    res.status(404);
    throw Error("No Payment Account");
  } else {
    const listPaymentMethods = await stripe.paymentMethods.list({
      customer: getProfile?.stripeCustomerId.id,
      type: "card",
    });
    return res.status(200).json({
      success: {
        listPaymentMethods,
      },
    });
  }
});
