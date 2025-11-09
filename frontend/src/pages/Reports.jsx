// pages/Reports.jsx (Fix: Dynamic Date and Recent Exports)
import React, { useState, useEffect } from 'react';
import { MdDownload, MdList, MdDateRange, MdPictureAsPdf, MdOutlineTableChart, MdAttachMoney, MdBarChart, MdTrendingUp, MdTrendingDown } from 'react-icons/md';
import api from '../services/api';

// --- Theme Colors ---
const FINAI_GREEN_DARK = '#38765A';
const FINAI_GREEN_LIGHT = 'bg-green-700';
const FINAI_GREEN_HOVER = 'hover:bg-green-800';

// --- Report Type Definitions ---
const REPORT_TYPES = [
    { id: 'all', name: 'All Financial Data', icon: MdOutlineTableChart },
    { id: 'revenue', name: 'Revenue Report', icon: MdTrendingUp },
    { id: 'expense', name: 'Expense Report', icon: MdTrendingDown },
    { id: 'profit', name: 'Profit & Loss Report', icon: MdAttachMoney },
];

// --- Time Period Definitions ---
const TIME_PERIODS = [
    { id: 'daily', name: 'Daily' },
    { id: 'weekly', name: 'Weekly' },
    { id: 'monthly', name: 'Monthly' },
    { id: 'alltime', name: 'All Time' },
];

export default function Reports() {
    const [selectedReportType, setSelectedReportType] = useState(REPORT_TYPES[0].id);
    const [selectedTimePeriod, setSelectedTimePeriod] = useState(TIME_PERIODS[2].id); // Default to Monthly
    const [isGenerating, setIsGenerating] = useState(false);
    const [reportData, setReportData] = useState(null); // State to hold fetched report data
    
    const [recentReports, setRecentReports] = useState([
        { name: 'Profit & Loss Q4 2025 (PDF)', date: '06 Nov 2025' },
        { name: 'Cash Flow Monthly (CSV)', date: '01 Nov 2025' },
    ]);

    const getCurrentFormattedDate = () => {
        return new Date().toLocaleString('en-US', {
            day: '2-digit', 
            month: 'short', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    // Function to fetch report data for preview
    const fetchReportPreview = async () => {
        try {
            const response = await api.get(`/reports/data?reportType=${selectedReportType}&timePeriod=${selectedTimePeriod}`);
            setReportData(response.data);
        } catch (error) {
            console.error('Error fetching report preview:', error);
            setReportData(null);
        }
    };

    // Fetch preview data on component mount and when selections change
    useEffect(() => {
        fetchReportPreview();
    }, [selectedReportType, selectedTimePeriod]);


    const handleGenerateReport = async (format) => {
        setIsGenerating(true);
        try {
            const response = await api.get(`/reports/${format}?reportType=${selectedReportType}&timePeriod=${selectedTimePeriod}`, { responseType: 'blob' });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `report-${selectedReportType}-${selectedTimePeriod}.${format}`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);

            const reportName = REPORT_TYPES.find(r => r.id === selectedReportType).name;
            const timePeriodName = TIME_PERIODS.find(t => t.id === selectedTimePeriod).name;
            const generatedDate = getCurrentFormattedDate();
            const newReport = { 
                name: `${reportName} (${timePeriodName}) (${format.toUpperCase()})`,
                date: generatedDate
            };
            setRecentReports(prev => [newReport, ...prev.slice(0, 4)]); // Keep max 5 reports
            
            alert(`✅ ${reportName} Report generated successfully! Download started.`);
        } catch (error) {
            console.error('Report Generation Error:', error);
            alert('Failed to generate report.');
        } finally {
            setIsGenerating(false);
        }
    };
    
    // Placeholder component for a quick visual preview of the report data
    const ReportPreview = () => {
        if (!reportData) {
            return (
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 h-96 flex items-center justify-center text-gray-500 dark:text-gray-400">
                    Loading report preview...
                </div>
            );
        }

        const { totalRevenue, totalExpense, totalProfit, transactions } = reportData;
        const currentReportType = REPORT_TYPES.find(r => r.id === selectedReportType);
        const currentTimePeriod = TIME_PERIODS.find(t => t.id === selectedTimePeriod);

        return (
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 h-96 overflow-y-auto">
                <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4 border-b pb-2 border-gray-200 dark:border-gray-700">
                    Preview: {currentReportType.name} ({currentTimePeriod.name})
                </h4>
                
                <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    {(selectedReportType === 'all' || selectedReportType === 'revenue' || selectedReportType === 'profit') && (
                        <div className="bg-green-100 dark:bg-green-900 p-3 rounded-md text-green-800 dark:text-green-300">
                            <strong>Revenue:</strong> ${totalRevenue?.toFixed(2) || '0.00'}
                        </div>
                    )}
                    {(selectedReportType === 'all' || selectedReportType === 'expense' || selectedReportType === 'profit') && (
                        <div className="bg-red-100 dark:bg-red-900 p-3 rounded-md text-red-800 dark:text-red-300">
                            <strong>Expense:</strong> ${totalExpense?.toFixed(2) || '0.00'}
                        </div>
                    )}
                    {(selectedReportType === 'all' || selectedReportType === 'profit') && (
                        <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-md text-blue-800 dark:text-blue-300">
                            <strong>Profit:</strong> ${totalProfit?.toFixed(2) || '0.00'}
                        </div>
                    )}
                </div>

                {transactions && transactions.length > 0 ? (
                    <table className="min-w-full text-sm text-gray-600 dark:text-gray-400">
                        <thead className="text-xs text-gray-500 dark:text-gray-300 uppercase bg-gray-100 dark:bg-gray-700 sticky top-0">
                            <tr>
                                <th className="py-2 px-4 text-left">Date</th>
                                <th className="py-2 px-4 text-left">Type</th>
                                <th className="py-2 px-4 text-left">Category</th>
                                <th className="py-2 px-4 text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((t, i) => (
                                <tr key={i} className="border-b dark:border-gray-700 hover:bg-white dark:hover:bg-gray-700">
                                    <td className="py-2 px-4">{new Date(t.date).toLocaleDateString()}</td>
                                    <td className="py-2 px-4">{t.type}</td>
                                    <td className="py-2 px-4">{t.category}</td>
                                    <td className="py-2 px-4 text-right">${t.amount.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-center text-gray-500 dark:text-gray-400 mt-4">No transactions found for this selection.</p>
                )}
            </div>
        );
    };


    return (
        <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
                <MdOutlineTableChart className="mr-3 text-green-700 dark:text-green-500" /> Financial Reports
            </h2>
            
            {/* --- 1. Report Configuration Card --- */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mb-8 border-t-4 border-green-700 dark:border-green-500">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Generate New Report</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* Report Type Selector */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Select Report Type
                        </label>
                        <select
                            value={selectedReportType}
                            onChange={(e) => setSelectedReportType(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                        >
                            {REPORT_TYPES.map(report => (
                                <option key={report.id} value={report.id}>
                                    {report.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Time Period Selector */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                            <MdDateRange className="mr-1" /> Time Period
                        </label>
                        <select
                            value={selectedTimePeriod}
                            onChange={(e) => setSelectedTimePeriod(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                        >
                            {TIME_PERIODS.map(period => (
                                <option key={period.id} value={period.id}>
                                    {period.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Action Buttons */}
                    <div className="self-end pt-2 md:pt-0 flex space-x-3">
                        <button 
                            onClick={() => handleGenerateReport('pdf')}
                            disabled={isGenerating}
                            className={`flex items-center px-4 py-2 rounded-lg font-semibold text-white transition duration-150 shadow-md w-1/2 justify-center
                                ${isGenerating ? 'bg-gray-400 cursor-not-allowed' : `${FINAI_GREEN_LIGHT} ${FINAI_GREEN_HOVER}`}
                            `}
                        >
                            <MdPictureAsPdf className="mr-2 text-xl" /> 
                            {isGenerating ? 'Generating...' : 'PDF'}
                        </button>
                        
                        <button 
                            onClick={() => handleGenerateReport('csv')}
                            disabled={isGenerating}
                            className={`flex items-center px-4 py-2 rounded-lg font-semibold transition duration-150 shadow-md w-1/2 justify-center
                                ${isGenerating ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-500'}
                            `}
                        >
                            <MdDownload className="mr-2 text-xl" /> 
                            CSV
                        </button>
                    </div>
                </div>
            </div>
            
            {/* --- 2. Report Preview / Recent Reports --- */}
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Report Preview</h3>
            
            {/* Placeholder for the visual report summary */}
            <ReportPreview />

            {/* --- 3. Recent Exports/History --- */}
            <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Recent Exports</h3>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md">
                    <ul className="divide-y divide-gray-100 dark:divide-gray-700">
                        {/* 🔑 FIX: Render list items from state */}
                        {recentReports.length > 0 ? (
                            recentReports.map((report, index) => (
                                <li key={index} className="flex justify-between items-center py-2 text-sm text-gray-700 dark:text-gray-300">
                                    <span>{report.name}</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">Generated: **{report.date}**</span>
                                </li>
                            ))
                        ) : (
                            <li className="py-2 text-sm text-gray-500 dark:text-gray-400 text-center">No reports exported yet.</li>
                        )}
                    </ul>
                </div>
            </div>

        </div>
    );
}