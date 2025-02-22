const express = require("express");
const port = 3001;
const app = express();

const blogs = require("./content/blogs.json");
const portfolios = require("./content/portfolios.json");

app.get("/", (req, res) => {
  res.send("Express server running");
});

app.get("/api/blogs", (req, res) => {
  res.json({
    data: blogs,
  });
});

app.get("/api/portfolios", (req, res) => {
  res.json({
    data: portfolios,
  });
});

app.listen(port);
