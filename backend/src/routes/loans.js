import express from 'express';
const router = express.Router();

// Mock recommendations
const mockRecommendations = [
  {
    id: 1,
    bankInitials: 'BB',
    bankName: 'Bangladesh Bank',
    bankType: 'SME Growth Loan',
    interestRate: 8.5,
    tenure: 5,
    maxAmount: 5000000,
    monthlyPayment: 10250,
    tags: ['Flexible repayment', 'Low Interest', 'Quick approval'],
  },
  {
    id: 2,
    bankInitials: 'CB',
    bankName: 'City Bank',
    bankType: 'SME Growth Loan',
    interestRate: 9.5,
    tenure: 6,
    maxAmount: 4000000,
    monthlyPayment: 20250,
    tags: ['Flexible repayment', 'Low Interest', 'Quick approval'],
  },
];

// --- GET DETAILS ---
router.get('/:id', (req, res) => {
  const loanId = parseInt(req.params.id);
  const loan = mockRecommendations.find(l => l.id === loanId);
  if (!loan) return res.status(404).json({ error: 'Loan not found' });
  res.json(loan);
});

// --- POST RECOMMENDATIONS ---
router.post('/recommend', (req, res) => {
  res.json({ recommendations: mockRecommendations });
});

// --- POST EMI CALCULATION ---
router.post('/calculate-emi', (req, res) => {
  const { principal, rate, tenure } = req.body;
  if (!principal || !rate || !tenure) return res.status(400).json({ error: 'Missing data' });

  const monthlyRate = rate / 12 / 100;
  const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, tenure * 12) /
              (Math.pow(1 + monthlyRate, tenure * 12) - 1);

  res.json({ emi: emi.toFixed(2) });
});

export default router;
