import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protect = async (req, res, next) => {
  try {
    // Check cookie first (for browser-based requests), then Authorization header as fallback.
    const tokenFromCookie = req.cookies && req.cookies.token;
    const authHeader = req.headers.authorization;
    let token;

    if (tokenFromCookie) {
      token = tokenFromCookie;
    } else if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ message: "User not found" });
    req.user = user;
    next();
  } catch (err) {
    console.error("Auth protect error:", err);
    return res.status(401).json({ message: "Not authorized" });
  }
};
