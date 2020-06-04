const express = require("express");

const app = express();

require("./startup/logging")();
require("./startup/cors")(app);
require("./startup/routes")(app);
require("./startup/config")();
require("./startup/db")();
require("./startup/validationId")();
require("./startup/prod")(app);

const port = process.env.PORT || 8000;
const server = app.listen(port, console.log(`Listening on port ${port}...`));

module.exports = server;
