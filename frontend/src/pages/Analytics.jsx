import React, { useEffect, useState } from 'react';
import api from '../services/api';
import LineChartCashflow from '../components/charts/LineChartCashflow';
import DonutCategory from '../components/charts/DonutCategory';

export default function Analytics() {
  const [forecast, setForecast] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const f = await api.get('/analytics/forecast');
        const c = await api.get('/analytics/spendingCategory');
        setForecast(f.data.forecast || []);
        setCategories(c.data.categories || []);
      } catch (err) {
        // fallback mock
        setForecast(undefined);
        setCategories(undefined);
      }
    };
    load();
  }, []);

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Analytics</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <LineChartCashflow data={forecast} />
        <DonutCategory data={categories} />
      </div>

      <div className="mt-6 card bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h4 className="font-medium mb-3 text-gray-800 dark:text-gray-100">AI Insights</h4>
        <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-400">
          <li>Projected cashflow next 30 days: <strong>Stable</strong></li>
          <li>Top categories increasing: <strong>Transport, Marketing</strong></li>
          <li>Recommendation: Collect overdue invoices faster — try 7-day early payment discount.</li>
        </ul>
      </div>
    </div>
  );
}
