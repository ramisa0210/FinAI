import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Helper: create JWT cookie
const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

// Register
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({ _id: user._id, name: user.name, email: user.email });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
};

// Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    generateToken(res, user._id);
    res.json({ _id: user._id, name: user.name, email: user.email });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};

// Profile
export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) res.json({ name: user.name, email: user.email });
  else res.status(404).json({ message: "User not found" });
};

// Update
export const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) user.password = await bcrypt.hash(req.body.password, 10);
    const updatedUser = await user.save();
    res.json({ name: updatedUser.name, email: updatedUser.email });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};
