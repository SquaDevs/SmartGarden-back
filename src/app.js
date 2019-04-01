require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
});
const express = require("express");
const mongoose = require("mongoose");
const validate = require("express-validation");
const { uri } = require("./config/database");
class AppController {
  constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
    this.database();
    this.exception();
  }
  database() {
    mongoose.connect(uri, { useCreateIndex: true, useNewUrlParser: true });
  }

  middlewares() {
    this.express.use(express.json());
  }
  routes() {
    this.express.use(require("./routes"));
  }

  exception() {
    this.express.use(async (err, req, res, next) => {
      // if (err instanceof validate.ValidationError) {
      //   return res.status(err.status).json(err);
      // }

      return res
        .status(err.status || 500)
        .json({ error: "Internarl Server Error" });
    });
  }
}

module.exports = new AppController().express;
