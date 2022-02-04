const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user'
  },
  sitterId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user'
  },
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    required: true
  },
  accepted: {
    type: Boolean,
    default: false
  },
  declined: {
    type: Boolean,
    default: false
  },
  paid: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
    default: ""
  }
}, {
  timestamps: true,
});

module.exports = Request = mongoose.model("Request", requestSchema);
