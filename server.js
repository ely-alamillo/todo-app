const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
// const bcrypt = require('bcrypt'); --> used in the userControllers

const server = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/todo-app', { useMongoClient: true });

server.use(bodyParser.json());
server.use(session({
  secret: 'Iv5BuXzIix4Hja8rZyrp2whtRqE96QsjIzGLg5NViZb4sAkNeDC7gGGASGrd',
  resave: true,
  saveUninitialized: false,
}));

const { routes } = require('./api/routes/routes.js');
routes(server);

server.listen(3000, () => {
  console.log('server listening on port 3000');
});
