const router = require("express").Router();
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
  res.send("this works");
});

module.exports = router;
