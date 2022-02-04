const stripe = require("stripe")(process.env.STRIPE_SECRET);

async function createStripeAccount(user) {
  return await stripe.account.create({
    type: "standard",
    business_type: "individual",
    country: "CA",
    default_currency: "cad",
    company: {
      name: user.name,
    },
    email: user.email,
  });
}

async function createStripeCustomer(user) {
  return await stripe.customers.create({
    name: user.name,
    email: user.email,
  });
}

async function createStripeAccountLink(petsitter) {
  return await stripe.accountLinks.create({
    account: petsitter.stripeAccountId,
    refresh_url: process.env.REFRESH_URL,
    return_url: process.env.RETURN_URL,
    type: "account_onboarding",
  });
}

module.exports = {
  createStripeAccount,
  createStripeCustomer,
  createStripeAccountLink,
};
