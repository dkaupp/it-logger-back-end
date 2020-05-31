const Joi = require("joi");
const mongoose = require("mongoose");

const Log = mongoose.model(
  "Logs",
  new mongoose.Schema({
    message: {
      type: String,
      required: true,
    },
    tech: {
      type: techSchema,
      required: true,
    },
    attention: {
      type: Boolean,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
  })
);

function validateLog(log) {
  const schema = {
    message: Joi.string().required(),
    tech: Joi.objectId().required(),
    attention: Joi.boolean(),
  };

  return Joi.validate(log, schema);
}

exports.Log = Log;
exports.validate = validateLog;
