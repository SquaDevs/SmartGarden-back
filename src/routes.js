const routes = require("express").Router();
const UserController = require("./app/controllers/UserController");
const SessionController = require("./app/controllers/SessionController");
const auth = require("./app/middleware/auth");

routes.post("/user", UserController.create);
routes.post("/auth", SessionController.create);

routes.use(auth);

routes
  .route("/user")
  .get(UserController.show)
  .put(UserController.update);

module.exports = routes;
