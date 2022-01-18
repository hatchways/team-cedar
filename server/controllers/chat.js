const Chat = require('../models/Chat')
const asyncHandler = require("express-async-handler");

exports.getChat = asyncHandler(async (req, res, next) => {
  try {
    const chats = Chat.find({
      $or: [
        { sender: req.params.user1, recipient: req.params.user2 },
        { sender: req.params.user2, recipient: req.params.user1 },
      ],
    })

    res.status(200).json(
      chats.map((chat) => ({
        sender: chat.sender,
        recipient: chat.recipient,
        text: chat.text,
      })),
    );

  } catch (e) {
    res.status(500)
    throw new Error("Error while retrieving chat:  ", e);
  }

});