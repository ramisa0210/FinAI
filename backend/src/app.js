import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

// Routes
import userRoutes from './routes/users.js';
import transactionRoutes from './routes/transactions.js';
import reportRoutes from './routes/reports.js';
import loanRoutes from './routes/loans.js';

dotenv.config();

const app = express();

// ===== Middleware =====
app.use(
  cors({
    origin: process.env.CLIENT_URL, // your frontend URL: https://finai-frontend.onrender.com
    credentials: true,              // allow cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ===== Rate Limiting =====
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: 'Too many requests, please try again later.',
});
app.use(limiter);

// ===== Routes =====
app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/loans', loanRoutes);

// ===== Health Check =====
app.get('/', (req, res) => {
  res.send('🚀 FinAI Backend is running successfully on Render');
});

// ===== 404 Handler =====
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

export default app;
