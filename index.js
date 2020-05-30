const express = require("express");
const logs = require("./routes/logs");

const app = express();

app.use(express.json());

app.use("/api/logs", logs);

const port = process.env.PORT || 8000;
app.listen(port, console.log(`Listening on port ${port}...`));
