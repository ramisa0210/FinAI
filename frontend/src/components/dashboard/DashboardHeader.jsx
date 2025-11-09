// components/dashboard/DashboardHeader.jsx (Minimal Version)
import React from 'react';
import { MdSettings } from 'react-icons/md';

const COLORS = {
    primaryDark: '#38765A', // Dark Green
};

const DashboardHeader = () => {
    
    // Note: Since we removed login name, notification, and logout, 
    // this component remains minimalistic.

    return (
        // Padding adjusted to keep it slightly cleaner than the main site header
        <div className="flex justify-between items-center bg-white py-3 px-4 border-b border-gray-200">
            
            {/* Logo/Branding Section */}
            <div className="flex items-center space-x-2">
                <div style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '5px', 
                    backgroundColor: COLORS.primaryDark,
                    color: 'white',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                }}>
                    FI
                </div>
                <span className="text-xl font-bold text-gray-800">FinAI Dashboard</span>
            </div>
            
            {/* Action Items (Only Settings/Help remains) */}
            <div className="flex items-center space-x-4">
                
                {/* Settings Icon */}
                <button 
                    className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
                    title="Settings"
                >
                    <MdSettings className="text-2xl" />
                </button>
                
            </div>
        </div>
    );
};

export default DashboardHeader;