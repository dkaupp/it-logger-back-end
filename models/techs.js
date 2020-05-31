const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const techSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  isAdmin: Boolean,
});

techSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this.id,
      username: this.username,
      isAdmin: this.isAdmin,
    },
    "secretKey"
  );
  return token;
};

const Tech = mongoose.model("Techs", techSchema);

function validateTech(tech) {
  const schema = {
    username: Joi.string().min(5).max(255).required(),
    password: Joi.string().min(5).max(255).required(),
    name: Joi.string().min(5).max(50).required(),
  };
  return Joi.validate(tech, schema);
}

exports.Tech = Tech;
exports.validate = validateTech;
exports.techSchema = techSchema;
