const express = require("express");
const app = express();

app.use((req, res) => {
  res.end("server running");
});
module.exports = app;
