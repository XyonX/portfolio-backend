const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const app = express();
const port = process.env.PORT || 8080;

// Security Middleware
app.use(cors());
app.use(helmet());

// Load JSON Data Safely
let blogs = [];
let portfolios = [];

try {
  blogs = require("./content/blogs.json");
  portfolios = require("./content/portfolios.json");
} catch (error) {
  console.error("Error loading JSON files:", error);
}

app.get("/", (req, res) => {
  res.send("Express server running");
});

app.get("/api/blogs", (req, res) => {
  res.json({ data: blogs });
});

app.get("/api/portfolios", (req, res) => {
  res.json({ data: portfolios });
});

// Graceful Shutdown
process.on("SIGINT", () => {
  console.log("Shutting down server...");
  process.exit();
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
