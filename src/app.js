const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const bodyParser = require("body-parser");

const app = express();

// -------------------- DB config ---------------- //
mongoose.connect(process.env.MONGO_DB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("connected to database");
});
mongoose.connection.on("error", (err) => {
  console.error(`failed to connected to the database : ${err}`);
});
// -------------------- Middliewares ---------------- //

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// -------------------- Routes ---------------- //
app.post("/aziz", (req, res) => {
  const name = req.body.name;
  res.send({
    message: `welcome ${name}`,
  });
});
module.exports = app;
