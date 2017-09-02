const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');

// const bcrypt = require('bcrypt'); --> used in the userControllers

const corsOptions = {
    "origin": "http://localhost:3000",
    "methods": "GET, HEAD, PUT, PATCH, POST, DELETE",
    "preflightContinue": true,
    "optionsSuccessStatus": 204,
    "credentials": true, //enable cookies
};

const server = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/todo-app', { useMongoClient: true });

server.use(bodyParser.json());
server.use(session({
  secret: 'Iv5BuXzIix4Hja8rZyrp2whtRqE96QsjIzGLg5NViZb4sAkNeDC7gGGASGrd',
  resave: true,
  saveUninitialized: false,
  cookie: { secure: false }
}));
server.set('trust proxy', 1)


server.use(cors(corsOptions));
// server.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });



const { routes } = require('./api/routes/routes.js');
routes(server);

server.listen(3030, () => {
  console.log('server listening on port 3030');
});
