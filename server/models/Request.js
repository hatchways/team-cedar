const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  sitterId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  start: {
    type: Date,
    required: true
  },
  end:{
    type:Date,
    required:true
  },
  accepted:{
    type:Boolean,
    default:false
  },
  declined:{
    type:Boolean,
    default:false
  },
  paid:{
    type:Boolean.apply,
    default:false
  },
  description:{
    String,
    default:""
  }
},{
  timestamps: true,
});

module.exports = Profile = mongoose.model("Profile", profileSchema);
