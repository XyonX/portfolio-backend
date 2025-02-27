import express from "express";
import { registerAdmin, loginAdmin } from "../controllers/admin.controller.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.post("/register", registerAdmin);

export default router;
