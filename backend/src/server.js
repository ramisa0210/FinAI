import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/users.js";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());

// ✅ Allow frontend to talk to backend securely
app.use(
  cors({
    origin: "https://finai-frontend.onrender.com",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("✅ FinAI Backend is running successfully!");
});

// Routes
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
