const User = require("../models/User");
const Profile = require("../models/Profile");
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI)
  .catch(err => {
    console.log('error while connecting to mongoose: ', err.stack);
    process.exit(1);
  })
  .then(() => {
    console.log("db connection ready");
  });

const seedUser = async () => {
  return await new User({
    name: process.env.DEMO_USER_NAME,
    email: process.env.DEMO_USER_EMAIL,
    password: process.env.DEMO_USER_PASSWORD,
  }).save()
}

const seedProfile = async (user) => {
  return await new Profile({
    userId: user.id,
    name: 'John Doe',
    description: 'test description',
    gender: 'male',
    address: '123 test dr',
    telephone: '555 555 5656',
    birthday: Date.now(),
    photo: 'test photo' 
  }).save()
}

async function seedDataAndCloseDbConnection() {
  try {
    const user = await seedUser()
    await seedProfile(user)
  } catch (e) {
    console.log('error while seeding data: ', e)
  } finally {
    mongoose.disconnect()
    process.exit()
  }
  
}

seedDataAndCloseDbConnection()
