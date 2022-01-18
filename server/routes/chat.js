const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getChat,
} = require('../controllers/chat');

router.route('/:user1/:user2/:limit?').get(protect, getChat);

module.exports = router;