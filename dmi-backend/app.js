"use strict"
const express = require("express");
const cors = require('cors');
const app = express();
app.use(express.json());

//error classes
const { NotFoundError } = require("./expressError");

//list of strings routes
const stringsRoutes = require("./routes/strings");

//allow cross site origin
app.use(cors());

app.use("/strings", stringsRoutes);

/** Handle 404 errors -- this matches everything */
/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});

module.exports = app;