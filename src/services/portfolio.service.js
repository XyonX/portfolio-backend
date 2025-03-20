import Portfolio from "../model/Portfolio.js";

/**
 * Get all portfolio entries from the database.
 */
export const getAllPortfolios = async () => {
  return await Portfolio.find().lean();
};

/**
 * Get a portfolio by its slug.
 */
export const getPortfolioBySlug = async (slug) => {
  return await Portfolio.findOne({ slug }).lean();
};

/**
 * Create a new portfolio entry.
 */
export const createPortfolio = async (portfolioData) => {
  return await Portfolio.create(portfolioData);
};

/**
 * Update a portfolio entry by ID.
 */
export const updatePortfolio = async (id, updateData) => {
  return await Portfolio.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  }).lean();
};

/**
 * Delete a portfolio entry by ID.
 */
export const deletePortfolio = async (id) => {
  return await Portfolio.findByIdAndDelete(id);
};
