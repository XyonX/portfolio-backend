import * as BlogService from "../services/blog.service.js";

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
 * Create a new blog.
 */
export const createBlog = async (req, res) => {
  try {
    const newBlog = await BlogService.createBlog(req.body);
    res
      .status(201)
      .json({ message: "Blog created successfully", data: newBlog });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Failed to create blog", details: error.message });
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
