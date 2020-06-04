const express = require("express");

const app = express();

require("./startup/logging")();
require("./startup/cors")(app);
require("./startup/routes")(app);
require("./startup/config")();
require("./startup/db")();
require("./startup/validationId")();

const port = process.env.PORT || 8000;
app.listen(port, console.log(`Listening on port ${port}...`));
