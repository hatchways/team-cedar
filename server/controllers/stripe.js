const asyncHandler = require("express-async-handler");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

// @route POST /connect/stripe
// @desc redirect to Stripe onboarding
// @access Private
exports.connect = asyncHandler(async (req, res, next) => {
  console.log("stripe connecting");
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
      console.log("stripe userAccount", userAccount);
      stripe.accountLinks
        .create({
          account: userAccount.id,
          refresh_url: site_url + "/settings/payment-methods", // /reauth
          return_url: site_url + "/settings/payment-methods", // /return
          type: "account_onboarding",
        })
        .then((stripeAccount) => {
          console.log("stripe response", stripeAccount);
          if (stripeAccount.url) {
            //success
            console.log("redirecting to", stripeAccount.url);
            res.redirect(stripeAccount.url);
          } else {
            res.status(500).json({ error: "Unable to connect to Stripe API" });
          }
        })
        .catch((error) => {
          console.log(error);
          next();
        });
    })
    .catch((error) => {
      console.log(error);
      next();
    });
});
