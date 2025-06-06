import express from "express";
import cors from "cors"; // ✅ Import CORS
import blogRoutes from "./src/routes/blog.routes.js";
import portfolioRoutes from "./src/routes/portfolio.routes.js";
import adminRoutes from "./src/routes/admin.routes.js";
import multer from "multer"; // For handling FormData (though used in middleware)
import path from "path"; // For serving static files
import { fileURLToPath } from "url"; // To resolve __dirname in ES modules

const app = express();

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Enable CORS globally
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://joycodes.tech",
      "https://www.joycodes.tech",
    ], // Allow frontend
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true, // Allow cookies
  })
);

// Middlewares
app.use(express.json()); // Parses JSON bodies
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded bodies

// Serve the uploads folder statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/blogs", blogRoutes); // Mounting the blog routes under /api/blogs
app.use("/api/portfolios", portfolioRoutes); // Mounting the blog routes under /api/blogs
app.use("/api/auth", adminRoutes); // Mounting the auth routes under /api/auth

app.get("/", (req, res) => {
  res.send("server running on vercel");
});

// Error handling (uncomment when implemented)
// app.use(errorHandler);

export default app;
