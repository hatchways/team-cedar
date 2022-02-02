const asyncHandler = require("express-async-handler");
const PetSitter = require("../models/PetSitter");
const { createStripeAccountLink } = require("../utils/stripeUtils");

// @route POST /connect/stripe
// @desc redirect to Stripe onboarding
// @access Private
exports.connect = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  const petsitter = await PetSitter.findOne({ userId: user._id });

  if (!petsitter) {
    return res.status(404).json({ error: "Couldn't find Pet Sitter account" });
  }

  const stripeAccount = await createStripeAccountLink(petsitter);

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
