const routes = (server) => {
  const userControllers = require('../controllers/userControllers');
  const taskControllers = require('../controllers/taskControllers');

  server.route('/showUsers')
    .get(userControllers.showAllUsers);
  server.route('/signup')
    .post(userControllers.createUser);
  server.route('/login')
    .post(userControllers.logIn)
  server.route('/logout')
    .post(userControllers.logOut);
  server.route('/verify')
    .get(userControllers.verify);

  // task routes
  server.route('/showAllTasks')
    .get(taskControllers.verifyUserLoggedIn, taskControllers.showAllTasks);
  server.route('/createTask')
    .post(taskControllers.verifyUserLoggedIn, taskControllers.addTask);
  server.route('/showUserTasks')
    .get(taskControllers.showUserTasks)
};

module.exports = { routes };
