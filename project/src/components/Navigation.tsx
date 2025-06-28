import React, { useState, useEffect } from 'react';
import { Menu, X, Zap, User } from 'lucide-react';
import { useAuth } from './auth/AuthContext';

interface NavigationProps {
  onStartGenerator?: () => void;
  onBackToLanding?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onStartGenerator, onBackToLanding }) => {
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    if (onBackToLanding) {
      onBackToLanding();
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={onBackToLanding}>
            <Zap className="w-8 h-8 text-teal-600 mr-2" />
            <span className="text-xl font-semibold text-gray-900">ContentCraft AI</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {!user && (
              <>
                <a href="#features" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                  Features
                </a>
                <a href="#pricing" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                  Pricing
                </a>
                <a href="#faq" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                  FAQ
                </a>
              </>
            )}
            
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 font-medium transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span>{user.name}</span>
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-600">{user.email}</p>
                    </div>
                    <button
                      onClick={onStartGenerator}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Generate Content
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <a href="#login" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                  Login
                </a>
                <button 
                  onClick={onStartGenerator}
                  className="bg-teal-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-teal-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                >
                  Get Started
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 rounded-b-xl shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {user ? (
                <>
                  <div className="px-3 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-600">{user.email}</p>
                  </div>
                  <button
                    onClick={onStartGenerator}
                    className="block w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50"
                  >
                    Generate Content
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <a href="#features" className="block px-3 py-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50">
                    Features
                  </a>
                  <a href="#pricing" className="block px-3 py-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50">
                    Pricing
                  </a>
                  <a href="#faq" className="block px-3 py-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50">
                    FAQ
                  </a>
                  <a href="#login" className="block px-3 py-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50">
                    Login
                  </a>
                  <button 
                    onClick={onStartGenerator}
                    className="w-full mt-2 bg-teal-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-teal-700 transition-colors"
                  >
                    Get Started
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;