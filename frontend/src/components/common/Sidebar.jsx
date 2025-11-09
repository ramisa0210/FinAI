import React from 'react';
import { NavLink } from 'react-router-dom';
// FiDollarSign or FiTrendingUp are suitable for Loan Advisor, using FiTrendingUp here.
import { FiHome, FiPieChart, FiFileText, FiSettings, FiPlusSquare, FiTrendingUp } from 'react-icons/fi';

export default function Sidebar({ collapsed }) {
  // --- Consistent Teal-Green Theme ---
  // The colors in the active state (from-[#0b4741] to-[#0e5b52]) are dark teal
  // which is a good contrast to the light background of the image dashboard sidebar
  const base =
    'flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 text-gray-800 dark:text-gray-200 hover:bg-[#0f544d]/10 dark:hover:bg-[#0f544d]/30 hover:text-[#0b8b72]';
  const active =
    'bg-gradient-to-r from-[#0b4741] to-[#0e5b52] text-white shadow-lg shadow-[#0b8b72]/40 ring-1 ring-[#0b8b72]/40';

  return (
    <aside
      className={`w-72 ${
        collapsed ? 'hidden sm:block' : 'block'
      } p-4 mt-16`}
    >
      <nav className="space-y-2">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? `${base} ${active}` : base
          }
        >
          <FiHome /> <span className="font-medium">Dashboard</span>
        </NavLink>

        <NavLink
          to="/daily"
          className={({ isActive }) =>
            isActive ? `${base} ${active}` : base
          }
        >
          <FiPlusSquare /> <span className="font-medium">Daily Entry</span>
        </NavLink>

        <NavLink
          to="/analytics"
          className={({ isActive }) =>
            isActive ? `${base} ${active}` : base
          }
        >
          <FiPieChart /> <span className="font-medium">Analytics</span>
        </NavLink>
        
        {/* ===== ADDED: Loan Advisor (as seen in the dashboard image) ===== */}
        <NavLink
          to="/loan-advisor"
          className={({ isActive }) =>
            isActive ? `${base} ${active}` : base
          }
        >
          <FiTrendingUp /> <span className="font-medium">Loan Advisor</span>
        </NavLink>
        {/* ========================================================================================= */}

        <NavLink
          to="/reports"
          className={({ isActive }) =>
            isActive ? `${base} ${active}` : base
          }
        >
          <FiFileText /> <span className="font-medium">Reports</span>
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive ? `${base} ${active}` : base
          }
        >
          <FiSettings /> <span className="font-medium">Settings</span>
        </NavLink>
      </nav>
    </aside>
  );
}