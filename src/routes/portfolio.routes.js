import express from "express";
import {
  getPortfolios,
  getPortfolioBySlug,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
} from "../controllers/portfolio.controller.js";
import { authenticate } from "../middleware/auth.js";
import upload from "../middleware/upload.js";
//import { validatePortfolio } from "../validators/Portfolio.validator.js";

const router = express.Router();

router.get("/", getPortfolios);
router.get("/:slug", getPortfolioBySlug);

// Protected admin routes
// router.post("/", authenticate, validatePortfolio, createPortfolio);
// router.put("/:id", authenticate, validatePortfolio, updatePortfolio);
// Apply the upload middleware before the controller
router.post(
  "/",
  upload.fields([
    { name: "featuredImage", maxCount: 1 },
    { name: "mdFile", maxCount: 1 },
  ]),
  createPortfolio
);
router.put("/:id", authenticate, updatePortfolio);
router.delete("/:id", authenticate, deletePortfolio);

export default router;
