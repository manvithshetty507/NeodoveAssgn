const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  msg: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;