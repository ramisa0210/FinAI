import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = ['#6366f1', '#06b6d4', '#f97316', '#ef4444'];

export default function DonutCategory({ data = [
  { name: 'Food', value: 400 },
  { name: 'Transport', value: 300 },
  { name: 'Salary', value: 800 },
  { name: 'Rent', value: 200 }
] }) {
  return (
    <div className="card">
      <h4 className="font-medium mb-3">Spending by Category</h4>
      <div style={{ width: '100%', height: 220 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie data={data} innerRadius={50} outerRadius={80} dataKey="value" nameKey="name" paddingAngle={4}>
              {data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
