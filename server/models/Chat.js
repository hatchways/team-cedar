const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new mongoose.Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'Player',
      required: true,
    },
    recipient: {
      type: Schema.Types.ObjectId,
      ref: 'Player',
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;