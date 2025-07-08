
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CalculatorPage from './pages/CalculatorPage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfUsePage from './pages/TermsOfUsePage';
import FloatingCalculatorWidget from './components/FloatingCalculatorWidget';
import FloatingStandardCalculatorWidget from './components/FloatingStandardCalculatorWidget';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRedirect from './pages/AdminRedirect';
import { auth, db } from './firebase';

function App() {
  return (
    <div className="flex flex-col min-h-screen font-sans text-brand-dark p-4 sm:p-6 lg:p-8">
      <div className="flex-grow flex flex-col items-center justify-center">
        <div className="w-full max-w-7xl mx-auto bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl shadow-slate-300/20">
          <Header />
          <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/calculator/:calculatorId" element={<CalculatorPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:postId" element={<BlogPostPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms-of-use" element={<TermsOfUsePage />} />

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminRedirect />} />
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route 
                path="/admin/dashboard" 
                element={
                  <ProtectedRoute>
                    <AdminDashboardPage />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
      <FloatingCalculatorWidget />
      <FloatingStandardCalculatorWidget />
    </div>
  );
}

export default App;
