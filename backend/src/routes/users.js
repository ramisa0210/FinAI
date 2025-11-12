import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ====== Public Routes ======
router.post("/register", registerUser);
router.post("/login", loginUser);

// ====== Protected Route Example ======
router.get("/profile", protect, getUserProfile);

// ====== Optional Logout ======
router.post("/logout", (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
});

export default router;
