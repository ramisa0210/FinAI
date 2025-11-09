import React, { useState } from 'react';
import api from '../services/api';

export default function DailyEntry() {
  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0,10),
    type: 'Expense',
    amount: '',
    category: 'General',
    note: ''
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      await api.post('/transactions', {
        ...form,
        amount: Number(form.amount)
      });
      setMsg({ type: 'success', text: 'Transaction saved.' });
      setForm({...form, amount: '', note: ''});
    } catch (err) {
      setMsg({ type: 'error', text: 'Failed to save. (Server offline?)' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Daily Entry</h2>
      <div className="card max-w-lg bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        {msg && <div className={`p-2 rounded mb-3 ${msg.type === 'success' ? 'bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300' : 'bg-red-50 text-red-700 dark:bg-red-900 dark:text-red-300'}`}>{msg.text}</div>}
        <form onSubmit={submit} className="space-y-3">
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-400">Date</label>
            <input type="date" value={form.date} onChange={e=>setForm({...form, date: e.target.value})} className="w-full rounded-md border px-3 py-2 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-200" />
          </div>
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-400">Type</label>
            <select value={form.type} onChange={e=>setForm({...form, type: e.target.value})} className="w-full rounded-md border px-3 py-2 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-200">
              <option>Income</option>
              <option>Expense</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-400">Category</label>
            <input value={form.category} onChange={e=>setForm({...form, category: e.target.value})} className="w-full rounded-md border px-3 py-2 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-200" />
          </div>
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-400">Amount</label>
            <input value={form.amount} onChange={e=>setForm({...form, amount: e.target.value})} type="number" className="w-full rounded-md border px-3 py-2 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-200" />
          </div>
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-400">Note</label>
            <textarea value={form.note} onChange={e=>setForm({...form, note: e.target.value})} className="w-full rounded-md border px-3 py-2 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-200" />
          </div>
          <button className="px-4 py-2 rounded-md bg-primary text-white" disabled={loading}>{loading ? 'Saving...' : 'Save Transaction'}</button>
        </form>
      </div>
    </div>
  );
}
