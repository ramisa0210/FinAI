import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/common/ProtectedRoute';
import Layout from './components/common/Layout';

import Landing from './pages/Homepage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';
import Contact from './pages/Contact';
import Features from './pages/Features';
import Chatbot from './pages/Chatbot';
import Dashboard from './pages/Dashboard';
import DailyEntry from './pages/DailyEntry';
import Analytics from './pages/Analytics';
import LoanAdvisor from './pages/LoanAdvisor';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/features" element={<Features />} />
        <Route path="/chatbot" element={<Chatbot />} />

        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/daily" element={<ProtectedRoute><DailyEntry /></ProtectedRoute>} />
        <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
        <Route path="/loan-advisor" element={<ProtectedRoute><LoanAdvisor /></ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />

        <Route path="*" element={<div className="p-6">Page not found</div>} />
      </Routes>
    </Layout>
  );
}