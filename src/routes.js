const routes = require('express').Router()
/**
 * Controllers
 */

const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')
const PlantsController = require('./app/controllers/PlantsController')
const PlantDataController = require('./app/controllers/PlantDataController')
const PlantInputsController = require('./app/controllers/PlantInputsController')
const PlantPhotoController = require('./app/controllers/PlantPhotoController')
const InsightsController = require('./app/controllers/InsightsController')

/**
 * Middlewares
 */

const auth = require('./app/middleware/auth')
const multer = require('multer')
const multerConfig = require('./config/multer')
// const brute = require('express-brute');
// const bruteRedis = require('express-brute-redis');

/**
 * Error Handler
 */
const handler = require('express-async-handler')

routes.post('/user', handler(UserController.create))
routes.post('/auth', handler(SessionController.create))
routes.route('/plant/data/:token').post(handler(PlantDataController.create))

routes.use(auth)

/**
 * User Routes
 */

routes
  .route('/user')
  .get(handler(UserController.show))
  .put(handler(UserController.update))
  .delete(handler(UserController.delete))

/**
 * Plant Routes
 */

routes
  .route('/plant')
  .post(handler(PlantsController.create))
  .get(handler(PlantsController.index))

routes
  .route('/plant/:id')
  .get(handler(PlantsController.show))
  .put(handler(PlantsController.update))
  .delete(handler(PlantsController.delete))

routes
  .route('/insights/plant')
  .post(handler(InsightsController.tgetPlanInsights))

/*
  * Plant Inputss
  *
  */

routes
  .route('/inputs')
  .post(handler(PlantInputsController.create))
  .get(handler(PlantInputsController.index))

routes
  .route('/inputs/:id')
  .get(handler(PlantInputsController.show))
  .put(handler(PlantInputsController.update))
  .delete(handler(PlantInputsController.delete))

/**
 * Plant Photo
 *
 *
 */

routes
  .route('/plant/photo')
  .post(multer(multerConfig).single('file'), handler(PlantPhotoController.create))
  .get(handler(PlantPhotoController.index))

routes
  .route('/plant/photo/:id')
  .get(handler(PlantPhotoController.show))
  // .put(handler(PlantPhotoController.update))
  .delete(handler(PlantPhotoController.delete))

/**
 * Plant Data
 */

// Create Plant data

// view all plant data
routes.route('/plant/:idPlant/data').get(handler(PlantDataController.index))
// view a specific plant data
routes.route('/plant/data/:idData').get(handler(PlantDataController.show))
// view all plant data
routes.route('/plants/data').get(handler(PlantDataController.index))
// .put(handler(PlantDataController.update))->Cannot Update Plant Data
// .delete(handler(PlantDataController.delete))->Cannot delete Plant Data

module.exports = routes
