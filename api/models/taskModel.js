const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  task: String,
  completed: { Boolean, default: false },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

// const Task = mongoose.model('Task', TaskSchema);
// module.exports = { Task };

module.exports = mongoose.model('Task', TaskSchema);
