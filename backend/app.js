const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const Recipe = require("./recipe");

mongoose
  .connect(
    "mongodb+srv://jida:stbf6CKIQoicpx7r@cluster0-d9wpy.mongodb.net/test?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connection with MongoDB successful");
  })
  .catch(error => {
    console.log("unable to connect with MongoDB atlas");
    console.log(error);
  });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());

app.use((req, res) => {
  res.end("server running");
});
module.exports = app;
