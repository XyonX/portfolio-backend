import * as BlogService from "../services/blog.service.js";
import upload from "../middleware/upload.js";
import fs from "fs/promises";
import path from "path";

// Make sure you have a variable that points to your uploads directory
const uploadDir = path.join(process.cwd(), "uploads");

// Utility function to calculate reading time
const calculateReadingTime = (text) => {
  const wordsPerMinute = 200; // average reading speed
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

/**
 * Get all blogs.
 */
export const getBlogs = async (req, res) => {
  try {
    const blogs = await BlogService.getAllBlogs();
    res.status(200).json({ data: blogs });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch blogs", details: error.message });
  }
};

/**
 * Get a blog by its slug.
 */
export const getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const blog = await BlogService.getBlogBySlug(slug);

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.status(200).json({ data: blog });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch blog", details: error.message });
  }
};

/**
 * Create a new blog with image upload.
 */
/**
 * Create a new blog with image upload.
 */
export const createBlog = async (req, res) => {
  try {
    console.log(
      "[CreateBlog] Initial request body:",
      JSON.stringify(req.body, null, 2)
    );

    console.log("[CreateBlog] Processing uploaded files:", req.files);

    const {
      title,
      description,
      slug,
      publicationDate,
      categories,
      tags,
      status,
    } = req.body;

    const categoriesArray = categories
      ? categories.split(",").map((cat) => cat.trim())
      : [];
    const tagsArray = tags ? tags.split(",").map((tag) => tag.trim()) : [];

    console.log("[CreateBlog] Processed categories/tags:", {
      categoriesArray,
      tagsArray,
    });

    const BASE_URL = process.env.API_BASE_URL || "http://localhost:3001";

    // File handling debug
    const featuredImageFile = req.files?.["featuredImage"]?.[0];
    const mdFile = req.files?.["mdFile"]?.[0];

    //TODO READ FROM MD FIEL AND STROE IN THIS CONTENT AS STRING ALSO KEEPS TE FORMATTING
    let content = "";
    if (mdFile) {
      const mdFilePath = path.join(uploadDir, mdFile.filename);
      content = await fs.readFile(mdFilePath, "utf8");
    }

    // Calculate the estimated reading time
    const readTime = calculateReadingTime(content);
    console.log("Estimated read time:", readTime);

    console.log("[CreateBlog] File metadata:", {
      featuredImage: featuredImageFile
        ? {
            filename: featuredImageFile.filename,
            size: featuredImageFile.size,
            mimetype: featuredImageFile.mimetype,
          }
        : null,
      mdFile: mdFile
        ? {
            filename: mdFile.filename,
            size: mdFile.size,
            mimetype: mdFile.mimetype,
          }
        : null,
    });

    const blogData = {
      title,
      description,
      content,
      readTime,
      slug,
      publicationDate: publicationDate || Date.now(),
      categories: categoriesArray,
      tags: tagsArray,
      featuredImage: featuredImageFile
        ? `/uploads/${featuredImageFile.filename}`
        : null,
      mdFile: mdFile ? `/uploads/${mdFile.filename}` : null,
      status,
    };

    console.log(
      "[CreateBlog] Final blog data before creation:",
      JSON.stringify(blogData, null, 2)
    );

    console.log("[CreateBlog] Calling BlogService.createBlog");
    const newBlog = await BlogService.createBlog(blogData);
    console.log(
      "[CreateBlog] Blog created successfully:",
      JSON.stringify(newBlog, null, 2)
    );

    res.status(201).json({
      message: "Blog created successfully",
      data: newBlog,
    });
  } catch (error) {
    console.error("[CreateBlog] Error creating blog:", {
      errorMessage: error.message,
      errorStack: error.stack,
      errorDetails: error.response?.data || "No additional error details",
    });

    res.status(400).json({
      error: "Failed to create blog",
      details:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal server error",
      ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
    });
  }
};

/**
 * Update a blog by its ID.
 */
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBlog = await BlogService.updateBlog(id, req.body);

    if (!updatedBlog) {
      return res.status(404).json({ error: "Blog not found or update failed" });
    }

    res
      .status(200)
      .json({ message: "Blog updated successfully", data: updatedBlog });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update blog", details: error.message });
  }
};

/**
 * Delete a blog by its ID.
 */
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBlog = await BlogService.deleteBlog(id);

    if (!deletedBlog) {
      return res.status(404).json({ error: "Blog not found or delete failed" });
    }

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to delete blog", details: error.message });
  }
};
