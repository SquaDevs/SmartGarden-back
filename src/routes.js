const routes = require("express").Router();
/**
 * Controllers
 */

const UserController = require("./app/controllers/UserController");
const SessionController = require("./app/controllers/SessionController");
const PlantsController = require("./app/controllers/PlantsController");
const PlantDataController = require("./app/controllers/PlantDataController");

/**
 * Middlewares
 */

const auth = require("./app/middleware/auth");


/**
 * Error Handler
 */
const handler = require("express-async-handler");
routes.post("/", handler((req,res)=>res.json({status:'OK'})));

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
  .get(handler(PlantsController.index));

routes
  .route("/plant/:id")
  .get(handler(PlantsController.show))
  .put(handler(PlantsController.update))
  .delete(handler(PlantsController.delete));

/**
 * Plant Data
 */

//Create Plant data
routes.route("/plant/data/:token").post(handler(PlantDataController.create));
//view all plant data
routes.route("/plant/:idPlant/data").get(handler(PlantDataController.index));
//view a specific plant data
routes.route("/plant/data/:idData").get(handler(PlantDataController.show));
//view all plant data
routes.route("/plants/data").get(handler(PlantDataController.index));
// .put(handler(PlantDataController.update))->Cannot Update Plant Data
// .delete(handler(PlantDataController.delete))->Cannot delete Plant Data

module.exports = routes;
