require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})
var morgan = require('morgan')
const express = require('express')
const mongoose = require('mongoose')
const validate = require('express-validation')
const { uri } = require('./config/database')
const cors = require('cors')
class AppController {
  constructor() {
    this.express = express()
    this.middlewares()
    this.routes()
    this.database()
    this.exception()
  }

  database() {
    mongoose.connect(uri, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true })
  }

  middlewares() {
    this.express.use(cors())
    this.express.use(express.json())
    this.express.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
    this.express.use((req, res, next) => {
      // console.log(req.headers);
      // console.log(req.body);
      return next()
    })
  }

  routes() {
    this.express.use('/v1', require('./routes'))
  }

  exception() {
    this.express.use(async (err, req, res, next) => {
      // if (err instanceof validate.ValidationError) {
      //   return res.status(err.status).json(err);
      // }
      console.log(err)
      return res
        .status(err.status || 500)
        .json({ error: 'Internarl Server Error' })
    })
  }
}

module.exports = new AppController().express
