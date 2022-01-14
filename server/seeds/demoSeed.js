const User = require("../models/User");
const mongoose = require("mongoose");

const users = [
  new User({
    name: process.env.DEMO_USER_NAME,
    email: process.env.DEMO_USER_EMAIL,
    password: process.env.DEMO_USER_PASSWORD,
  })]

mongoose
  .connect(process.env.MONGO_URI)
  .catch(err => {
    console.log('error while connecting to mongoose: ', err.stack);
    process.exit(1);
  })
  .then(() => {
    console.log("db connection ready");
  });


users.map(async (user, index) => {
  await user.save((err, result) => {
    if (index === users.length - 1) {
      console.log("Done");
      mongoose.disconnect();
      process.exit()
    }
  });
});

