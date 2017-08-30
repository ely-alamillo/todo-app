const mongoose = require('mongoose');
// const TaskSchema = require('./tasksModel');

const TaskSchema = new mongoose.Schema({
  task: String,
  completed: { type: Boolean },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tasks: [TaskSchema],
});

const Task = mongoose.model('Task', TaskSchema)
const User = mongoose.model('User', UserSchema);

module.exports = {
  Task,
  User,
}
