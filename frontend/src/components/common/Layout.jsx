import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import ChatbotOverlay from '../Chatbot/ChatbotOverlay';

export default function Layout({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();
  const publicPaths = ['/', '/login', '/signup', '/about', '/features', '/chatbot', '/contact'];
  const showSidebar = !publicPaths.includes(location.pathname);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <div className={`${showSidebar ? 'max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6' : ''}`}>
        {showSidebar && <Sidebar collapsed={sidebarCollapsed} />}
        <main className="bg-transparent min-h-[70vh] w-full pt-20"> {/* main content always full width of its container */}
          {children}
        </main>
      </div>
      <ChatbotOverlay />
    </div>
  );
}