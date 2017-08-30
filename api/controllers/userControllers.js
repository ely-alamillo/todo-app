// const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// const session = require('express-session');

const { User } = require('../models/userModels');

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

const showAllUsers = (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      sendUserError(err, res);
      return;
    }
    res.json(users);
  });
};

const createUser = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    sendUserError('provide username and password', res);
    return;
  }
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      sendUserError('failed to hash password', res)
      return;
    }
    const user = new User({ username, password: hash });
    user.save((saveErr) => {
      if (saveErr) {
        sendUserError(saveErr, res);
        return;
      }
      req.session.user = user.username;
      req.session.save((err) => {
        console.log(req.session);
        res.json({ userSaved: user });
      });
      // console.log(req.session);
      // res.json({ userSaved: user });
      // res.send('hello')
    })
  });
};

const logIn = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    sendUserError('provide username and password', res);
    return;
  }
  User.findOne({ username }, (err, user) => {
    if (err) {
      sendUserError(err, res);
      return;
    }
    if (!user) {
      sendUserError('bad credentials', res);
      return;
    }
    // console.log(user.username);
    bcrypt.compare(password, user.password, (err, valid) => {
      if (!valid) {
        sendUserError('bad credentials', res);
        return;
      }
      // req.session.user = user.username;

      req.session.user = user.username;
      console.log(req.session);
      res.send({ login: 'sucessfull login attempt' });
      // console.log(req.session);
      // res.send({ login: 'sucessfull login attempt' });
    })
  });
};

const logOut = (req, res) => {
  if (!req.session.user) {
    sendUserError('sign in to log out', res);
    return;
  }
  delete req.session.user;
  res.json({ logout: 'you have logged out', session: req.session });
};

const verify = (req, res) => {
  if (!req.session.user) {
    sendUserError('u are not logged in', res);
    return;
  }
  res.send( 'some one is logged in')
};

module.exports = {
  showAllUsers,
  createUser,
  logIn,
  logOut,
  verify,
}
