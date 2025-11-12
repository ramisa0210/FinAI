import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

// Load env
dotenv.config();

const app = express();

// parse cookies
app.use(cookieParser());

// CORS: allow the frontend origin (set CLIENT_URL in env) and allow credentials (cookies)
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";

app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (like curl or mobile)
    if (!origin) return callback(null, true);
    if (origin === CLIENT_URL) return callback(null, true);
    return callback(new Error('CORS policy: This origin is not allowed'), false);
  },
  credentials: true,
}));

// rest of your middleware: helmet, rate limiter, bodyParser etc.
app.use(express.json());
// ... other app.use as needed
