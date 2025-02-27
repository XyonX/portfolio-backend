import express from "express";
import cors from "cors"; // ✅ Import CORS
import blogRoutes from "./src/routes/blog.routes.js";
import adminRoutes from "./src/routes/admin.routes.js";
//import errorHandler from "./src/middleware/errorHandler";

const app = express();

// ✅ Enable CORS globally
app.use(
  cors({
    origin: "http://localhost:3000", // Allow frontend
    credentials: true, // Allow cookies
  })
);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/blogs", blogRoutes); // Mounting the blog routes under /api/blogs

app.use("/api/auth", adminRoutes); // Mounting the blog routes under /api/blogs

// Error handling
//app.use(errorHandler);

export default app;
