import express from 'express';
import { createTransaction, getTransactions } from '../controllers/transactionController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, createTransaction).get(protect, getTransactions);

export default router;
