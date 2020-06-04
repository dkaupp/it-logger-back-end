const mongoose = require("mongoose");
const config = require("config");
const db = config.get("db");
const winston = require("winston");

module.exports = () => {
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(winston.info("MongoDB Connected..."));
};
