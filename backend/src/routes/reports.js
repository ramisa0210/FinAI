import express from 'express';
import { generatePdf, generateCsv, getReportData } from '../controllers/reportController.js'; // Import getReportData
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/pdf', protect, generatePdf);
router.get('/csv', protect, generateCsv);
router.get('/data', protect, getReportData); // New route for aggregated data

export default router;
