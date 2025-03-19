import * as PortfolioService from "../services/portfolio.service.js";
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
 * Get all Portfolios.
 */
export const getPortfolios = async (req, res) => {
  try {
    const Portfolios = await PortfolioService.getAllPortfolios();
    res.status(200).json({ data: Portfolios });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch Portfolios", details: error.message });
  }
};

/**
 * Get a portfolio by its slug.
 */
export const getPortfolioBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const portfolio = await PortfolioService.getPortfolioBySlug(slug);

    if (!portfolio) {
      return res.status(404).json({ error: "Portfolio not found" });
    }

    res.status(200).json({ data: portfolio });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch portfolio", details: error.message });
  }
};

/**
 * Create a new portfolio with image upload.
 */
/**
 * Create a new portfolio with image upload.
 */
export const createPortfolio = async (req, res) => {
  try {
    console.log(
      "[Createportfolio] Initial request body:",
      JSON.stringify(req.body, null, 2)
    );

    console.log("[CreatePortfolio] Processing uploaded files:", req.files);

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

    console.log("[Createportfolio] Processed categories/tags:", {
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

    console.log("[CreatePortfolio] File metadata:", {
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

    const portfolioData = {
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
      "[CreatePortfolio] Final portfolio data before creation:",
      JSON.stringify(portfolioData, null, 2)
    );

    console.log("[CreatePortfolio] Calling PortfolioService.createPortfolio");
    const newPortfolio = await PortfolioService.createPortfolio(portfolioData);
    console.log(
      "[CreatePortfolio] Portfolio created successfully:",
      JSON.stringify(newPortfolio, null, 2)
    );

    res.status(201).json({
      message: "Portfolio created successfully",
      data: newPortfolio,
    });
  } catch (error) {
    console.error("[CreatePortfolio] Error creating portfolio:", {
      errorMessage: error.message,
      errorStack: error.stack,
      errorDetails: error.response?.data || "No additional error details",
    });

    res.status(400).json({
      error: "Failed to create portfolio",
      details:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal server error",
      ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
    });
  }
};

/**
 * Update a portfolio by its ID.
 */
export const updatePortfolio = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPortfolio = await PortfolioService.updatePortfolio(
      id,
      req.body
    );

    if (!updatedPortfolio) {
      return res
        .status(404)
        .json({ error: "Portfolio not found or update failed" });
    }

    res
      .status(200)
      .json({
        message: "Portfolio updated successfully",
        data: updatedPortfolio,
      });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update portfolio", details: error.message });
  }
};

/**
 * Delete a portfolio by its ID.
 */
export const deletePortfolio = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPortfolio = await PortfolioService.deletePortfolio(id);

    if (!deletedPortfolio) {
      return res
        .status(404)
        .json({ error: "Portfolio not found or delete failed" });
    }

    res.status(200).json({ message: "Portfolio deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to delete portfolio", details: error.message });
  }
};
