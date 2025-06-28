import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import SocialProof from './components/SocialProof';
import Features from './components/Features';
import InteractiveDemo from './components/InteractiveDemo';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import ClosingCTA from './components/ClosingCTA';
import Footer from './components/Footer';
import ContentForm from './components/ContentForm';
import ContentDisplay from './components/ContentDisplay';
import LoadingState from './components/LoadingState';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import ForgotPasswordPage from './components/auth/ForgotPasswordPage';
import UserDashboard from './components/auth/UserDashboard';
import { AuthProvider, useAuth } from './components/auth/AuthContext';
import { generateContent, downloadContent } from './utils/contentGenerator';
import { initScrollAnimations } from './utils/scrollAnimations';
import { FormData } from './components/ContentForm';
import { GeneratedContent } from './components/ContentDisplay';

type ViewType = 'landing' | 'generator' | 'loading' | 'results' | 'login' | 'register' | 'forgot-password' | 'dashboard';

function AppContent() {
  const { user, login, register, sendPasswordReset, updateUser } = useAuth();
  const [currentView, setCurrentView] = useState<ViewType>('landing');
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    // Initialize scroll animations
    const cleanup = initScrollAnimations();
    
    return cleanup;
  }, [currentView]);

  // Redirect to dashboard if user is logged in and on landing page
  useEffect(() => {
    if (user && currentView === 'landing') {
      setCurrentView('dashboard');
    }
  }, [user, currentView]);

  const handleGenerateContent = async (formData: FormData) => {
    setIsGenerating(true);
    setCurrentView('loading');
    
    try {
      const content = await generateContent(formData);
      setGeneratedContent(content);
      setCurrentView('results');
      
      // Update user's content pack usage
      if (user) {
        updateUser({ contentPacksUsed: user.contentPacksUsed + 1 });
      }
    } catch (error) {
      console.error('Error generating content:', error);
      setCurrentView('generator');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (generatedContent) {
      downloadContent(generatedContent, 'Content Pack');
    }
  };

  const handleStartGenerator = () => {
    if (user) {
      setCurrentView('generator');
    } else {
      setCurrentView('login');
    }
  };

  const handleBackToLanding = () => {
    setCurrentView(user ? 'dashboard' : 'landing');
    setGeneratedContent(null);
  };

  const handleLogin = async (email: string, password: string) => {
    setAuthLoading(true);
    try {
      await login(email, password);
      setCurrentView('dashboard');
    } catch (error) {
      throw error;
    } finally {
      setAuthLoading(false);
    }
  };

  const handleRegister = async (name: string, email: string, password: string) => {
    setAuthLoading(true);
    try {
      await register(name, email, password);
      setCurrentView('dashboard');
    } catch (error) {
      throw error;
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSendPasswordReset = async (email: string) => {
    setAuthLoading(true);
    try {
      await sendPasswordReset(email);
    } catch (error) {
      throw error;
    } finally {
      setAuthLoading(false);
    }
  };

  // Auth pages
  if (currentView === 'login') {
    return (
      <LoginPage
        onLogin={handleLogin}
        onBackToLanding={handleBackToLanding}
        onSwitchToRegister={() => setCurrentView('register')}
        onSwitchToForgotPassword={() => setCurrentView('forgot-password')}
        isLoading={authLoading}
      />
    );
  }

  if (currentView === 'register') {
    return (
      <RegisterPage
        onRegister={handleRegister}
        onBackToLanding={handleBackToLanding}
        onSwitchToLogin={() => setCurrentView('login')}
        isLoading={authLoading}
      />
    );
  }

  if (currentView === 'forgot-password') {
    return (
      <ForgotPasswordPage
        onSendResetEmail={handleSendPasswordReset}
        onBackToLogin={() => setCurrentView('login')}
        onBackToLanding={handleBackToLanding}
        isLoading={authLoading}
      />
    );
  }

  if (currentView === 'dashboard' && user) {
    return (
      <UserDashboard
        onStartGenerator={handleStartGenerator}
        onBackToLanding={handleBackToLanding}
      />
    );
  }

  // Generator pages
  if (currentView === 'generator') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <Navigation onBackToLanding={handleBackToLanding} />
        <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <ContentForm onGenerate={handleGenerateContent} isGenerating={isGenerating} />
        </div>
      </div>
    );
  }

  if (currentView === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <Navigation onBackToLanding={handleBackToLanding} />
        <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <LoadingState />
        </div>
      </div>
    );
  }

  if (currentView === 'results' && generatedContent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <Navigation onBackToLanding={handleBackToLanding} />
        <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <ContentDisplay content={generatedContent} onDownload={handleDownload} />
        </div>
      </div>
    );
  }

  // Landing page
  return (
    <div className="min-h-screen bg-white">
      <Navigation onStartGenerator={handleStartGenerator} />
      <Hero onStartGenerator={handleStartGenerator} />
      <div className="scroll-animate">
        <SocialProof />
      </div>
      <div className="scroll-animate">
        <Features />
      </div>
      <div className="scroll-animate">
        <InteractiveDemo />
      </div>
      <div className="scroll-animate">
        <Pricing />
      </div>
      <div className="scroll-animate">
        <Testimonials />
      </div>
      <div className="scroll-animate">
        <FAQ />
      </div>
      <div className="scroll-animate">
        <ClosingCTA onStartGenerator={handleStartGenerator} />
      </div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;