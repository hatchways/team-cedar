const asyncHandler = require("express-async-handler");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

// @route GET /connect/stripe
// @desc redirect to Stripe onboarding
// @access Private
exports.connect = asyncHandler(async (req, res, next) => {
  const id = req.user.id;
  const site_url =
    process.env.NODE_ENV === "production"
      ? process.env.PRODUCTION_SITE
      : `http://localhost:${process.env.PORT}`;

  const accountLink = stripe.accountLinks
    .create({
      account: `acct_${req.user.id}`,
      refresh_url: site_url + "/connect/reauth",
      return_url: site_url + "/connect/return",
      type: "account_onboarding",
    })
    .then((res) => {
      console.log("stripe response", res);
      if (res.url) {
        //success
        res.redirect(301, res.url);
      } else {
        res.status(500).json({ error: "Unable to connect to Stripe API" });
      }
    })
    .catch(next);
});
