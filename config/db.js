const mongoose = require("mongoose");
const config = require("config");
const db = config.get("db");

const connectDB = async () => {
  try {
    mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("MongoDB Connected...");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
