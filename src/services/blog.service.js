import Blog from "../model/Blog.js";

/**
 * Get all blog entries from the database.
 */
export const getAllBlogs = async () => {
  return await Blog.find().lean();
};

/**
 * Get a blog by its slug.
 */
export const getBlogBySlug = async (slug) => {
  return await Blog.findOne({ slug }).lean();
};

/**
 * Create a new blog entry.
 */
export const createBlog = async (blogData) => {
  return await Blog.create(blogData);
};

/**
 * Update a blog entry by ID.
 */
export const updateBlog = async (id, updateData) => {
  return await Blog.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  }).lean();
};

/**
 * Delete a blog entry by ID.
 */
export const deleteBlog = async (id) => {
  return await Blog.findByIdAndDelete(id);
};
