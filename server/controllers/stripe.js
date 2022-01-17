const asyncHandler = require("express-async-handler");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-1-17',
  appInfo: { // For sample support and debugging, not required for production:
    name: "stripe-samples/checkout-single-subscription",
    version: "0.0.1",
    url: "https://github.com/stripe-samples/checkout-single-subscription"
  }
});




// @route Get /stripe/config
// @desc Get payment config setting
// @access Private
exports.config = asyncHandler(async (req, res, next) => {
  // Due to this branch did not finished the sitter model. Can't get price from the DB. 
  // Will update this function late.
  const { hourlyPrice, hours } = req.query

  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    hourPrice: hourlyPrice,
    hours: hours,
  });
});

// @route Get /stripe/session
// @desc Get the Checkout Session to display the JSON result on the success page
// @access Private
exports.checkoutSession = asyncHandler(async (req, res, next) => {
  const { sessionId } = req.query
  const session = await stripe.checkout.sessions.retrieve(sessionId)
  res.send(session)
});

// @route POST /stripe/session
// @desc Create Checkout Session
// @access Private
exports.createCheckoutSession = asyncHandler(async (req, res, next) => {
  try {
    const { hourlyPrice, hours } = req.body

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: {
        price: Number(hourlyPrice).toFixed(2),
        quantity: hours,
      },
      success_url: `${process.env.CLIENT_URL}/pay/success`,
      cancel_url: `${process.env.CLIENT_URL}/pay/cancel`,
      automatic_tax: { enabled: true },
    })
    res.redirect(303, session.url)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
});
