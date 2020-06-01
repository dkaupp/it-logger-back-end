const express = require("express");
const connectDB = require("./config/db");
require("express-async-errors");
const Joi = require("joi");
const cors = require("cors");

const logs = require("./routes/logs");
const techs = require("./routes/techs");
const auth = require("./routes/auth");
const error = require("./middleware/error");

require("./startup/logging")();
require("./startup/config")();

const app = express();

connectDB();
app.use(cors());
app.use(express.json());
Joi.objectId = require("joi-objectid")(Joi);

app.use("/api/logs", logs);
app.use("/api/techs", techs);
app.use("/api/auth", auth);
app.use(error);

const port = process.env.PORT || 8000;
app.listen(port, console.log(`Listening on port ${port}...`));
