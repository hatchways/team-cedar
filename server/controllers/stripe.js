const asyncHandler = require("express-async-handler");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

// @route POST /connect/stripe
// @desc redirect to Stripe onboarding
// @access Private
exports.connect = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  const site_url =
    process.env.NODE_ENV === "production"
      ? process.env.PRODUCTION_SITE
      : "http://localhost:3000";

  stripe.account
    .create({
      type: "standard",
      business_type: "individual",
      country: "CA",
      default_currency: "cad",
      company: {
        name: user.name,
      },
      email: user.email,
    })
    .then((userAccount) => {
      return stripe.accountLinks.create({
        account: userAccount.id,
        refresh_url: process.env.REFRESH_URL,
        return_url: process.env.RETURN_URL,
        type: "account_onboarding",
      });
    })
    .then((stripeAccount) => {
      if (stripeAccount.url) {
        res.json({
          success: {
            stripeAccount,
          },
        });
      } else {
        res.status(500).json({ error: "Unable to connect to Stripe API" });
      }
    })
    .catch((error) => {
      console.log(error);
      next();
    });
});
