const express = require("express");
const logs = require("../routes/logs");
const techs = require("../routes/techs");
const auth = require("../routes/auth");
const error = require("../middleware/error");

module.exports = (app) => {
  app.use(express.json());
  app.use("/api/logs", logs);
  app.use("/api/techs", techs);
  app.use("/api/auth", auth);
  app.use(error);
};
