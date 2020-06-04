const router = require("express").Router();
const { Log, validate } = require("../models/logs");
const { Tech } = require("../models/techs");
const _ = require("lodash");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validateObjectId = require("../middleware/validateObjectId");

router.get("/", async (req, res) => {
  const logs = await Log.find().select(["-__v"]);
  res.send(logs);
});

router.get("/:id", [validateObjectId], async (req, res) => {
  const log = await Log.findById(req.params.id).select(["-__v"]);
  res.send(log);
});

router.post("/", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const tech = await Tech.findOne({ _id: req.body.tech });
  if (!tech) return res.status(400).send("Invalid Tech");

  let log = new Log({
    message: req.body.message,
    tech: {
      name: tech.name,
      _id: tech._id,
    },
    attention: req.body.attention,
  });

  log = await log.save();
  res.send(log);
});

router.put("/:id", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const tech = await Tech.findOne({ _id: req.body.tech });
  if (!tech) return res.status(400).send("Invalid Tech");

  const log = await Log.findByIdAndUpdate(
    req.params.id,
    {
      message: req.body.message,
      tech: {
        name: tech.name,
        _id: tech._id,
      },
      attention: req.body.attention,
      date: req.body.date,
    },
    { new: true }
  );

  if (!log)
    return res.status(404).send("The log with the given ID was not found.");

  res.send(log);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const log = await Log.findByIdAndRemove(req.params.id);
  if (!log)
    return res.status(404).send("The movie with the given id was not found.");

  res.send(log);
});

module.exports = router;
