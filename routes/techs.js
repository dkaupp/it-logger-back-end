const router = require("express").Router();
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const mongoose = require("mongoose");
const { Tech, validate } = require("../models/techs");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let tech = await Tech.findOne({ email: req.body.username });
  if (tech) return res.status(400).send("Tech is already registered.");

  tech = new Tech(_.pick(req.body, ["username", "password", "name"]));
  const salt = await bcrypt.genSalt(10);
  tech.password = await bcrypt.hash(tech.password, salt);
  await tech.save();

  const token = tech.generateAuthToken();
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(_.pick(tech, ["_id", "name", "username"]));
});

router.get("/", async (req, res) => {
  const techs = await Tech.find().select(["username", "_id", "name"]);
  res.send(techs);
});

module.exports = router;
