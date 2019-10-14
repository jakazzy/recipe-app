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
    time: req.body.time,
    difficulty: req.body.difficulty
  });
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

app.delete("/api/recipes/:id", (req, res, next) => {
  Recipe.deleteOne({
    _id: req.params.id
  })
    .then(() => {
      console.log(req.params.id, "this is id");
      return res.status(200).json({
        message: "successfully deleted"
      });
    })
    .catch(error => {
      return res.status(400).json({
        error: error
      });
    });
});

app.put("/api/recipes/:id", (req, res, next) => {
  const recipe = new Recipe({
    _id: req.params.id,
    title: req.body.title,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    time: req.body.time,
    difficulty: req.body.difficulty
  });

  Recipe.updateOne({ _id: req.params.id }, recipe)
    .then(() => {
      res.status(201).json({
        message: "Recipe updated successfully"
      });
    })
    .catch(error => {
      res.status(400).json({
        error: error
      });
    });
});
app.get("/api/recipes/:id", (req, res, next) => {
  Recipe.findOne({ _id: req.params.id })
    .then(recipe => {
      res.status(200).json(recipe);
    })
    .catch(error => {
      res.status(404).json({ error: error });
    });
});

app.get("/api/recipes", (req, res, next) => {
  Recipe.find()
    .then(recipes => {
      return res.status(200).json(recipes);
    })
    .catch(error => {
      return res.status(400).json({
        error: error
      });
    });
});
module.exports = app;
