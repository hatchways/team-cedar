const mongoose = require("mongoose");

const options = { toJSON: { virtuals: true, } };

const paymentSchema = new mongoose.Schema({
  sitterId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user'
  },
  rate: {
    type: Number,
    required: true,
  },
  hoursOfService: {
    startTime: {
      type: Number,
      required: true
    },
    endTime: {
      type: Number,
      required: true
    }
  },
  customerId: {
    type: String,
    required: true
  },
  paid: {
    type: Boolean,
    default: false
  },
  cancel: {
    type: Boolean,
    default: false
  }
},
  options
);

paymentSchema.virtual("totalPayment").get(function () {
  return (this.hoursOfService.endTime - this.hoursOfService.startTime) * this.rate
})

module.exports = Payment = mongoose.model("Payment", paymentSchema);
