const routes = require("express").Router();
/**
 * Controllers
 */

const UserController = require("./app/controllers/UserController");
const SessionController = require("./app/controllers/SessionController");
const PlantsController = require("./app/controllers/PlantsController");

/**
 * Middlewares
 */

const auth = require("./app/middleware/auth");

/**
 * Error Handler
 */
const handler = require("express-async-handler");

routes.post("/user", handler(UserController.create));
routes.post("/auth", handler(SessionController.create));

routes.use(auth);

/**
 * User Routes
 */

routes
  .route("/user")
  .get(handler(UserController.show))
  .put(handler(UserController.update));

/**
 * Plant Routes
 */

routes
  .route("/plant")
  .post(handler(PlantsController.create))
  .get(handler(PlantsController.show));

module.exports = routes;
