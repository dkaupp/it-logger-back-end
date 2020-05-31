const router = require("express").Router();
const Joi = require("joi");
const bcrypt = require("bcrypt");
const { Tech } = require("../models/techs");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let tech = await Tech.findOne({ username: req.body.username });
  if (!tech) return res.status(400).send("Invalid Username or Password.");

  const validPassword = await bcrypt.compare(req.body.password, tech.password);
  if (!validPassword) res.status(400).send("Invalid Username or Password.");

  const token = tech.generateAuthToken();

  res.send(token);
});

function validate(req) {
  const schema = {
    username: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  };

  return Joi.validate(req, schema);
}

module.exports = router;
