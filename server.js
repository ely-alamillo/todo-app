const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
const session = require('express-session');
const cors = require('cors');

// const bcrypt = require('bcrypt'); --> used in the userControllers

// const corsOptions = {
//     "origin": "*",
//     "methods": "GET, HEAD, PUT, PATCH, POST, DELETE",
//     "preflightContinue": false,
//     "optionsSuccessStatus": 204
// };

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


server.use(cors());
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
