const Task = require('../models/taskModel');
const User = require('../models/userModels');

const SERVER_USER_ERROR = 422;


// helper function used to send errors
const sendUserError = (err, res) => {
  res.status(SERVER_USER_ERROR);
  if (typeof err === 'string') {
    res.json({ err });
    return
  } else if (err && err.message) {
    res.json({
      message: err.message,
      stack: err.stack,
    });
    return;
  }
  res.json(err);
};

const verifyUserLoggedIn = (req, res, next) => {
  const { user } = req.session;
  if (!user) {
    sendUserError('please log in', res);
    return;
  }
  User.findOne({ user }, (err, foundUser) => {
    if (err) {
      sendUserError(err);
      return;
    }
    next();
  });
};

const showAllTasks = (req, res) => {
  Task.find({}, (err, tasks) => {
    if (err) {
      sendUserError(err, res);
      return;
    }
    res.json(tasks);
  });
};

const addTask = (req, res) => {
  const { user } = req.session;
  const { task } = req.body;

  // console.log(req.session);
  if (!user) {
    sendUserError('no user is logged in', res);
    return;
  }
  if (!task) {
    sendUserError('please provide a task', res);
    return;
  }
  User.findOne({ username: user }, (err, foundUser ) => {
    if (!foundUser) {
      sendUserError('bad request', res);
      return;
    }
    const newTask = new Task({ task, createdBy: foundUser._id });
    newTask.save((err, savedTask) => {
      if (err) {
        sendUserError(err, res);
        return;
      }
      Task.findById(savedTask._id)
        .populate('createdBy', 'username')
        .exec((err, populatedTask) => {
          if (err) {
            sendUserError(err);
            return;
          }
          res.json(populatedTask);
        });
      // res.json(savedTask);
    })
  });
};

module.exports = {
  showAllTasks,
  addTask,
  verifyUserLoggedIn
}
