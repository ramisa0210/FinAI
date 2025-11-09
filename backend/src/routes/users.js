import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ===== Public Routes =====
router.post("/register", registerUser);
router.post("/login", loginUser);

// ===== Protected Routes =====
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// GET current user (alias for profile)
router.get("/me", protect, getUserProfile);

export default router;
