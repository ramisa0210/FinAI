import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './config/db.js';

// ===== Handle uncaught exceptions =====
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
  process.exit(1);
});

// ===== Load environment variables =====
dotenv.config();

// ===== Connect to MongoDB =====
connectDB();

// ===== Server config =====
const PORT = process.env.PORT || 5000;

// ✅ Render requires 0.0.0.0 for networking
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 FinAI Backend running on port ${PORT}`);
});

// ===== Handle unhandled promise rejections =====
process.on('unhandledRejection', (err) => {
  console.error('⚠️ Unhandled Rejection:', err);
  server.close(() => process.exit(1));
});
