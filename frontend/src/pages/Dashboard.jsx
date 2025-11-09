// pages/Dashboard.jsx (Functional Search and Chart Simulation)
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import { MdAttachMoney, MdTrendingUp, MdBarChart, MdSearch, MdInfo } from 'react-icons/md';

// --- Theme Colors ---
const FINAI_GREEN_DARK = 'text-green-700 dark:text-green-400';
const FINAI_GREEN_LIGHT = 'bg-green-500';
const FINAI_RED = 'text-red-500';

// --- Mock Data for Charts ---
const initialCashFlowData = [
    { month: 'Jan', amount: 3000 }, { month: 'Feb', amount: 4500 }, 
    { month: 'Mar', amount: 5200 }, { month: 'Apr', amount: 6000 }, 
    { month: 'May', amount: 7500 }, { month: 'Jun', amount: 8100 }
];
const initialExpenseData = [
    { label: 'Salaries', amount: 15000 }, 
    { label: 'Rent', amount: 10000 }, 
    { label: 'Utilities', amount: 12000 }, 
    { label: 'Marketing', amount: 9500 }, 
    { label: 'Supplies', amount: 11000 }
];

// --- Placeholder Chart Component (Updated for better professional look) ---
const ChartPlaceholder = ({ title, data, type }) => {
    // If Cash Flow (Line Chart)
    if (type === 'line' && data.length > 0) {
        const amounts = data.map(d => d.amount);
        const labels = data.map(d => d.month);
        const maxVal = Math.max(...amounts) * 1.1; // 10% buffer for Y-axis

        return (
            <div className="p-4 h-72">
                <div className="relative h-full">
                    {/* Simplified Y-Axis Labels */}
                    <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 dark:text-gray-400 pr-2">
                        <span>${(maxVal).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                        <span>${(maxVal / 2).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                        <span>$0</span>
                    </div>
                    {/* Chart Area */}
                    <div className="ml-10 h-full relative border-l border-b border-gray-300 dark:border-gray-700">
                        {/* Simulated Line Graph */}
                        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <polyline
                                fill="none"
                                stroke="#38765A" 
                                strokeWidth="2"
                                // Points calculation for line graph
                                points={amounts.map((val, i) => {
                                    const x = (i / (amounts.length - 1)) * 100;
                                    const y = 100 - (val / maxVal) * 100;
                                    return `${x},${y}`;
                                }).join(' ')}
                            />
                        </svg>
                    </div>
                    {/* X-Axis Labels */}
                    <div className="ml-10 flex justify-between text-xs text-gray-500 dark:text-gray-400 pt-1">
                        {labels.map((label, i) => <span key={i}>{label}</span>)}
                    </div>
                </div>
            </div>
        );
    }
    
    // If Expense Breakdown (Bar Chart)
    if (type === 'bar' && data.length > 0) {
        const total = data.reduce((sum, d) => sum + d.amount, 0);
        const maxAmount = Math.max(...data.map(d => d.amount));
        
        return (
            <div className="flex flex-col h-72 justify-between space-y-3 p-4">
                {data.map((item, index) => {
                    const percentage = Math.round((item.amount / maxAmount) * 100);
                    return (
                        <div key={index} className="flex items-center">
                            <span className="text-sm w-28 text-gray-600 dark:text-gray-300 font-medium">{item.label}</span>
                            <div className="flex-grow bg-gray-200 dark:bg-gray-700 h-6 rounded-md">
                                <div
                                    className={`h-full ${FINAI_GREEN_LIGHT} rounded-md`}
                                    style={{ width: `${percentage}%` }}
                                ></div>
                            </div>
                            <span className="text-sm font-semibold ml-3 text-gray-800 dark:text-gray-100">${item.amount.toLocaleString()}</span>
                        </div>
                    );
                })}
            </div>
        );
    }

    return <div className="h-72 flex items-center justify-center text-gray-400 dark:text-gray-500">[No Data Available]</div>;
};


// --- Dashboard Component ---
const Dashboard = () => {
    const { user } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [cashFlowData, setCashFlowData] = useState(initialCashFlowData);
    const [expenseData, setExpenseData] = useState(initialExpenseData);

    const userName = user?.name || 'Rosy';

    // --- Search Logic (Simulated for Charts) ---
    useEffect(() => {
        const query = searchTerm.toLowerCase();

        if (query.includes('q3')) {
            // Simulated Q3 Data
            setCashFlowData([
                { month: 'Jul', amount: 8000 }, { month: 'Aug', amount: 7000 }, { month: 'Sep', amount: 9500 }
            ]);
            setExpenseData([
                { label: 'Salaries', amount: 11000 }, { label: 'Rent', amount: 13000 }, { label: 'Utilities', amount: 10500 }
            ]);
        } else if (query.includes('last 3')) {
            // Simulated Last 3 Months Data
            setCashFlowData(initialCashFlowData.slice(-3));
            setExpenseData(initialExpenseData.slice(2)); // Just a slice example
        } else if (query.includes('marketing')) {
            // Focus on marketing expense
            setCashFlowData(initialCashFlowData);
            setExpenseData(initialExpenseData.filter(d => d.label === 'Marketing'));
        } else {
            // Default Data
            setCashFlowData(initialCashFlowData);
            setExpenseData(initialExpenseData);
        }
    }, [searchTerm]);


    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900"> 
            
            {/* Sidebar component would go here */}
            {/* Note: I'm assuming the sidebar from image_32f51f.png is on the left */}

            <div className="flex-grow flex flex-col">
                {/* --- Header with Search Bar (Integrated) --- */}
                <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
                    <DashboardHeader /> 
                    
                    {/* Search Bar - Below Header Logo Section */}
                    <div className="max-w-7xl mx-auto px-4 pb-3">
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Search financial data, trends, or ask AI... (e.g., Q3, Last 3 Months, Marketing)"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full py-2 pl-10 pr-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-150 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                            />
                            <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                        </div>
                    </div>
                </header>

                <main className="p-6 bg-gray-50 dark:bg-gray-900 flex-grow max-w-7xl mx-auto w-full">
                    
                    {/* ওয়েলকাম সেকশন */}
                    <div className="mb-8 border-b pb-4 border-gray-200 dark:border-gray-700">
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                            Welcome Back, <span className={`${FINAI_GREEN_DARK}`}>{userName}</span>
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">Here's the AI-powered financial overview of your business today.</p>
                        {searchTerm && (
                            <p className={`text-sm ${FINAI_GREEN_DARK} mt-2 font-medium`}>
                                Showing filtered results for: **{searchTerm}**
                            </p>
                        )}
                    </div>

                    {/* টপ স্ট্যাটিস্টিকস কার্ডস (Existing code optimized with theme colors) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {/* Revenue Card */}
                        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg border-t-4 border-green-500 flex items-center space-x-4">
                            <div className="p-3 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full flex-shrink-0">
                                <MdAttachMoney className="text-2xl" />
                            </div>
                            <div>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">Total Revenue</p>
                                <h3 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100">$ 67,000</h3>
                            </div>
                        </div>

                        {/* Expense Card */}
                        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg border-t-4 border-red-500 flex items-center space-x-4">
                            <div className="p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-full flex-shrink-0">
                                <MdTrendingUp className="text-2xl rotate-180" />
                            </div>
                            <div>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">Total Expense</p>
                                <h3 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100">$ 41,000</h3>
                                <p className={`text-red-500 text-xs flex items-center mt-1`}>
                                    <MdTrendingUp className="mr-1 text-sm" />8.2% from last month
                                </p>
                            </div>
                        </div>

                        {/* Net Profit Card */}
                        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg border-t-4 border-green-700 flex items-center space-x-4">
                            <div className="p-3 bg-green-200 dark:bg-green-800 text-green-700 dark:text-green-300 rounded-full flex-shrink-0">
                                <MdBarChart className="text-2xl" />
                            </div>
                            <div>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">Total Net Profit</p>
                                <h3 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100">$ 26,009</h3>
                                <p className={`text-green-600 dark:text-green-400 text-xs flex items-center mt-1`}>
                                    <MdTrendingUp className="mr-1 text-sm" />18.3% from last month
                                </p>
                            </div>
                        </div>

                        {/* Risk Level Card */}
                        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg border-t-4 border-yellow-500 flex items-center space-x-4">
                            <div className="p-3 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 rounded-full flex-shrink-0">
                                <MdInfo className="text-2xl" />
                            </div>
                            <div>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">Risk Level</p>
                                <h3 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100">Low</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">AI Health Score: 85%</p>
                            </div>
                        </div>
                    </div>

                    {/* গ্রাফস: Cash Flow Forecast & Expense Breakdown */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        {/* Cash Flow Forecast Chart */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Cash Flow Forecast ({cashFlowData.length} Periods)</h3>
                            <div className="h-72">
                                <ChartPlaceholder title="Cash Flow" data={cashFlowData} type="line" />
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                *Data updated based on AI prediction (Search term: **{searchTerm || 'Default'}**)
                            </p>
                        </div>

                        {/* Expense Breakdown Chart */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Expense Breakdown ({expenseData.length} Categories)</h3>
                            <div className="h-72">
                                <ChartPlaceholder title="Expense" data={expenseData} type="bar" />
                            </div>
                             <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                *Expense data categorized by FinAI's automated system.
                            </p>
                        </div>
                    </div>

                    {/* Recent Transactions & AI Insights (Same as previous design) */}
                    {/* ... (Existing code for transactions and insights) ... */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Recent Transactions Table */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Recent Transactions</h3>
                                <button className={`bg-green-700 hover:bg-green-800 text-white text-sm px-4 py-2 rounded-lg transition-colors flex items-center font-medium`}>
                                    + Add New
                                </button>
                            </div>
                            
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-700">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Amount</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Category</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Method</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                        {/* Simplified Transaction Items */}
                                        {[
                                            { date: '2025-11-05', type: 'Income', amount: '+৳15,800', category: 'Sales', method: 'Bank Transfer', typeClass: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300', amountClass: 'text-green-600 dark:text-green-400' },
                                            { date: '2025-11-04', type: 'Expense', amount: '-৳5,200', category: 'Utilities', method: 'Cash', typeClass: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300', amountClass: 'text-red-600 dark:text-red-400' },
                                            { date: '2025-11-04', type: 'Income', amount: '+৳15,800', category: 'Online Sales', method: 'Credit Card', typeClass: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300', amountClass: 'text-green-600 dark:text-green-400' },
                                                                                          { date: '2025-11-03', type: 'Expense', amount: '-৳12,000', category: 'Salaries', method: 'Bank Transfer', typeClass: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300', amountClass: 'text-red-600 dark:text-red-400' },                                        ].map((tx, index) => (
                                            <tr key={index} className="dark:bg-gray-800">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">{tx.date}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${tx.typeClass}`}>{tx.type}</span>
                                                </td>
                                                <td className={`px-6 py-4 whitespace-nowrap text-sm ${tx.amountClass} font-medium`}>{tx.amount}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{tx.category}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{tx.method}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* AI Insights Card */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">AI Insights & Alerts</h3>
                            <div className="space-y-4">
                                {/* Insights based on existing data/theme */}
                                <div className="bg-green-50 dark:bg-green-900 border-l-4 border-green-700 dark:border-green-500 p-4 rounded-lg">
                                    <p className="text-sm text-green-900 dark:text-green-200"><strong className="font-semibold">Your revenue is 12% higher</strong> than average this month.</p>
                                    <p className="text-xs text-green-700 dark:text-green-400 mt-1">2 hours ago</p>
                                </div>
                                <div className="bg-yellow-50 dark:bg-yellow-900 border-l-4 border-yellow-500 dark:border-yellow-400 p-4 rounded-lg">
                                    <p className="text-sm text-yellow-800 dark:text-yellow-200"><strong className="font-semibold">Utilities spending is 8% higher</strong> than usual.</p>
                                    <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">3 hours ago</p>
                                </div>
                                <div className="bg-purple-50 dark:bg-purple-900 border-l-4 border-purple-500 dark:border-purple-400 p-4 rounded-lg">
                                    <p className="text-sm text-purple-800 dark:text-purple-200">You're eligible for <strong className="font-semibold">3 new loan options.</strong> Check Loan Advisor</p>
                                    <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">2 day ago</p>
                                </div>
                            </div>
                            <button className={`mt-6 ${FINAI_GREEN_DARK} hover:text-green-900 dark:hover:text-green-300 font-semibold flex items-center`}>
                                Ask AI for more insight 
                                <MdTrendingUp className="ml-2 text-xl" />
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;