import React, { useState, useEffect } from 'react';
import api from '../services/api'; // Axios instance pointing to your backend

// --- Business Health Score ---
const BusinessHealthScoreCard = ({ data }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8 shadow-md border border-gray-200 dark:border-gray-700">
    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Your Business Health Score</h3>
    <div className="flex justify-between gap-4 flex-wrap">
      {Object.keys(data).map((key, idx) => (
        <div key={idx} className="min-w-[150px]">
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1 capitalize">
            {key.replace(/([A-Z])/g, ' $1')}
          </div>
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">{data[key]}</div>
          <div className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full mt-1">
            <div style={{ width: `${Math.random() * 100}%` }} className="h-full bg-green-600 dark:bg-green-400 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

// --- Loan Card ---
const LoanRecommendationCard = ({ card, viewDetails, calculateEMI }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg p-5 mb-6 shadow-md border border-gray-200 dark:border-gray-700">
    <div className="flex items-center mb-4">
      <div className="w-12 h-12 rounded-lg bg-green-600 text-white text-xl font-bold flex justify-center items-center mr-4">
        {card.bankInitials}
      </div>
      <div>
        <div className="text-lg font-bold text-gray-800 dark:text-gray-100">{card.bankName}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">{card.bankType}</div>
      </div>
    </div>
    <div className="flex justify-between flex-wrap mb-3">
      <div>
        <div className="text-sm text-gray-500 dark:text-gray-400">Interest Rate</div>
        <div className="text-base font-bold text-gray-800 dark:text-gray-100">{card.interestRate}</div>
      </div>
      <div>
        <div className="text-sm text-gray-500 dark:text-gray-400">Tenure</div>
        <div className="text-base font-bold text-gray-800 dark:text-gray-100">{card.tenure}</div>
      </div>
      <div>
        <div className="text-sm text-gray-500 dark:text-gray-400">Max Amount</div>
        <div className="text-base font-bold text-gray-800 dark:text-gray-100">{card.maxAmount}</div>
      </div>
    </div>
    <div className="mt-2 flex gap-2 flex-wrap">
      {card.tags.map((tag, idx) => (
        <div key={idx} className="bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 px-3 py-1 rounded-full text-xs">
          {tag}
        </div>
      ))}
    </div>
    <div className="flex justify-between gap-3 mt-4">
      <button onClick={() => viewDetails(card)} className="w-full py-2 px-4 bg-white dark:bg-gray-700 text-green-600 dark:text-green-300 border border-green-600 dark:border-green-500 rounded-md font-semibold hover:bg-gray-50 dark:hover:bg-gray-600">
        View Details
      </button>
      <button onClick={() => calculateEMI(card)} className="w-full py-2 px-4 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700">
        Calculate EMI
      </button>
    </div>
  </div>
);

// --- Main Component ---
export default function LoanAdvisor() {
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState([]);

  const recommend = async () => {
    setLoading(true);
    try {
      const { data } = await api.post('/loans/recommend', {});
      setCards(data.recommendations || []);
    } catch (err) {
      console.error(err);
      setCards([{ id: 1, bankInitials: 'GN', bankName: 'Generic Bank', bankType: 'Working Capital Loan', interestRate: '12% p.a.', tenure: 'N/A', maxAmount: '৳100,000 - 500,000', tags: ['Error Fallback'] }]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { recommend(); }, []);

  const viewDetails = async (card) => {
    try {
      const { data } = await api.get(`/loans/${card.id}`);
      alert(JSON.stringify(data, null, 2));
    } catch (err) {
      console.error(err);
      alert('Failed to fetch details');
    }
  };

  const calculateEMI = async (card) => {
    try {
      const payload = {
        principal: 1000000, // Example principal
        rate: parseFloat(card.interestRate),
        tenure: parseInt(card.tenure),
      };
      const { data } = await api.post('/loans/calculate-emi', payload);
      alert(`EMI: ৳${data.emi}`);
    } catch (err) {
      console.error(err);
      alert('Failed to calculate EMI');
    }
  };

  const healthData = {
    creditScore: 780,
    cashFlow: 'Strong',
    debtToIncome: 0.35,
    repaymentCapacity: 'High',
  };

  return (
    <div className="p-10 min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-2">Smart Loan Recommendations</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-6">Personalized loan options based on your business performance</p>

      <BusinessHealthScoreCard data={healthData} />

      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8 shadow-md border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Generate Latest Recommendations 🔄</h3>
        <button onClick={recommend} className="py-2 px-5 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700 disabled:bg-gray-400" disabled={loading}>
          {loading ? 'Thinking...' : 'Get Recommendations'}
        </button>
      </div>

      <div>
        {cards.map(card => (
          <LoanRecommendationCard key={card.id} card={card} viewDetails={viewDetails} calculateEMI={calculateEMI} />
        ))}
      </div>
    </div>
  );
}
