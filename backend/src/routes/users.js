import express from "express";
import {
  registerUser,
  loginUser,
  getUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// GET current user
router.get("/me", protect, async (req, res) => {
  // protect middleware sets req.user
  res.json({ user: req.user });
});

export default router;
