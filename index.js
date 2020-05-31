const express = require("express");
const connectDB = require("./config/db");
const Joi = require("joi");
const config = require("config");

const logs = require("./routes/logs");
const techs = require("./routes/techs");
const auth = require("./routes/auth");

if (!config.get("jwtPrivateKey")) {
  console.error("Fatal error  private key provided!");
  process.exit(1);
}

const app = express();

connectDB();

app.use(express.json());
Joi.objectId = require("joi-objectid")(Joi);

app.use("/api/logs", logs);
app.use("/api/techs", techs);
app.use("/api/auth", auth);

const port = process.env.PORT || 8000;
app.listen(port, console.log(`Listening on port ${port}...`));
