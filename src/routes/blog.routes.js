import express from "express";
import {
  getBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blog.contoller.js";
import { authenticate } from "../middleware/auth.js";
import upload from "../middleware/upload.js";
//import { validateBlog } from "../validators/blog.validator.js";

const router = express.Router();

router.get("/", getBlogs);
router.get("/:slug", getBlogBySlug);

// Protected admin routes
// router.post("/", authenticate, validateBlog, createBlog);
// router.put("/:id", authenticate, validateBlog, updateBlog);
// Apply the upload middleware before the controller
router.post(
  "/",
  upload.fields([
    { name: "featuredImage", maxCount: 1 },
    { name: "mdFile", maxCount: 1 },
  ]),
  createBlog
);
router.put("/:id", authenticate, updateBlog);
router.delete("/:id", authenticate, deleteBlog);

export default router;
