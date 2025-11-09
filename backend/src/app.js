import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

import userRoutes from "./routes/users.js";

dotenv.config();

const app = express();

// ===== Middleware =====
app.use(
  cors({
    origin: process.env.CLIENT_URL, // frontend URL
    credentials: true,               // allow cookies
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, please try again later.",
});
app.use(limiter);

// ===== Routes =====
app.use("/api/users", userRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("🚀 FinAI Backend is running successfully on Render");
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

export default app;
