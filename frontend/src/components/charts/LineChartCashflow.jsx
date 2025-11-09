import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const sample = [
  { date: '01 Jan', inflow: 1200, outflow: 800 },
  { date: '02 Jan', inflow: 2100, outflow: 900 },
  { date: '03 Jan', inflow: 800, outflow: 500 },
  { date: '04 Jan', inflow: 1600, outflow: 700 },
  { date: '05 Jan', inflow: 2000, outflow: 1200 }
];

export default function LineChartCashflow({ data = sample }) {
  return (
    <div className="card">
      <h4 className="font-medium mb-3">Cash Flow</h4>
      <div style={{ width: '100%', height: 220 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="inflow" stroke="#4f46e5" strokeWidth={3} dot={false} />
            <Line type="monotone" dataKey="outflow" stroke="#06b6d4" strokeWidth={3} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
