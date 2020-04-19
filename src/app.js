const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const bodyParser = require("body-parser");

const v1 = require("./routes/v1");

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
app.use("/api/v1", v1);

// -------------------- Errors ---------------- //
app.use((req, res, next) => {
  //404 not found
  var err = new Error("not found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  //404 not found
  const status = err.status || 500;
  const error = err.message || "Error processing your request";

  res.status(status).send({
    error: error,
  });
});

module.exports = app;
