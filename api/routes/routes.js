const routes = (server) => {
  const userControllers = require('../controllers/userControllers');
  // const taskControllers = require('../controllers/taskControllers');

  server.route('/showUsers')
    .get(userControllers.showAllUsers);
  server.route('/signup')
    .post(userControllers.createUser);
  server.route('/login')
    .post(userControllers.logIn)
  server.route('/logout')
    .post(userControllers.logOut);
  server.route('/verify')
    .get(userControllers.verify)
};

module.exports = { routes };
