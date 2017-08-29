const mongoose = require('mongoose');
// const TaskSchema = require('./tasksModel');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task'
  }],
});

module.exports = mongoose.model('User', UserSchema);
