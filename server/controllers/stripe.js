const asyncHandler = require("express-async-handler");
const PetSitter = require("../models/PetSitter");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

// @route POST /connect/stripe
// @desc redirect to Stripe onboarding
// @access Private
exports.connect = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  const petsitter = await PetSitter.findOne({ userId: user._id });

  if (petsitter.stripeConnectId) {
    return res
      .status(403)
      .json({ error: "Already registered to Stripe Connect" });
  }

  const site_url =
    process.env.NODE_ENV === "production"
      ? process.env.PRODUCTION_SITE
      : "http://localhost:3000";

  const userAccount = await stripe.account.create({
    type: "standard",
    business_type: "individual",
    country: "CA",
    default_currency: "cad",
    company: {
      name: user.name,
    },
    email: user.email,
  });

  if (!userAccount?.id) {
    res.status(500).json({ error: "Unable to connect to Stripe API" });
    return next();
  }

  petsitter.stripeConnectId = userAccount.id;
  await petsitter.save();

  const stripeAccount = await stripe.accountLinks.create({
    account: userAccount.id,
    refresh_url: process.env.REFRESH_URL,
    return_url: process.env.RETURN_URL,
    type: "account_onboarding",
  });

  if (stripeAccount.url) {
    res.json({
      success: {
        stripeAccount,
      },
    });
  } else {
    res.status(500).json({ error: "Unable to connect to Stripe API" });
  }
});
