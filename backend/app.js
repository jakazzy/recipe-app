const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const Recipe = require("./models/recipe");

mongoose
  .connect(
    "mongodb+srv://jida:stbf6CKIQoicpx7r@cluster0-d9wpy.mongodb.net/test?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connection with mongoDB successful"))
  .catch(err => {
    console.log("unable to connect to mongodb atlas");
    console.error(err);
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

app.post("/api/recipes", (req, res, next) => {
  const recipe = new Recipe({
    title: req.body.title,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    timeToPrepare: req.body.timeToPrepare,
    difficulty: req.body.difficulty,
    userId: req.body.userId
  });
  console.log(recipe, "this is the recipe");
  recipe
    .save()
    .then(() => {
      return res.status(201).json({
        message: "Post saved successfully"
      });
    })
    .catch(error => {
      return res.status(400).json({
        error: error
      });
    });
});
module.exports = app;
