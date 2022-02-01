const mongoose = require('mongoose')
const Profile = require('./Profile')
const convertCents = require('../utils/convertCents')


const petSitterSchema  = Profile.discriminator('PetSitter', new mongoose.Schema({
  stripeConnectId: {
    type: String,
    default: "",
  },
  availabilityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Availability'
  },
  activatedAvailabilitySchedule: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Schedule'
  },
  rate: {
    type: String,
    set: convertCents
  }
}))

module.exports = PetSitter = mongoose.model("PetSitter");
