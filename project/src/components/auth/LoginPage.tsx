import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowLeft, Zap } from 'lucide-react';

interface LoginPageProps {
  onLogin: (email: string, password: string) => Promise<void>;
  onBackToLanding: () => void;
  onSwitchToRegister: () => void;
  onSwitchToForgotPassword: () => void;
  isLoading?: boolean;
}

const LoginPage: React.FC<LoginPageProps> = ({ 
  onLogin, 
  onBackToLanding, 
  onSwitchToRegister, 
  onSwitchToForgotPassword,
  isLoading = false 
}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Basic validation
    const newErrors: { [key: string]: string } = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.email.includes('@')) newErrors.email = 'Please enter a valid email';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await onLogin(formData.email, formData.password);
    } catch (error) {
      setErrors({ general: 'Invalid email or password. Please try again.' });
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50/60 via-white to-indigo-50/40 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Back to landing button */}
        <button
          onClick={onBackToLanding}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to home
        </button>

        {/* Logo and header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Zap className="w-8 h-8 text-teal-600 mr-2" />
            <span className="text-2xl font-semibold text-gray-900">ContentCraft AI</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h1>
          <p className="text-gray-600">Sign in to your account to continue creating amazing content</p>
        </div>

        {/* Login form */}
        <div className="bg-white border-radius-custom shadow-custom p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* General error */}
            {errors.general && (
              <div className="bg-red-50 border border-red-200 border-radius-custom p-4">
                <p className="text-red-600 text-sm">{errors.general}</p>
              </div>
            )}

            {/* Email field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border border-radius-custom shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 ${
                    errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Enter your email"
                  disabled={isLoading}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  className={`w-full pl-10 pr-12 py-3 border border-radius-custom shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 ${
                    errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Forgot password link */}
            <div className="text-right">
              <button
                type="button"
                onClick={onSwitchToForgotPassword}
                className="text-sm text-teal-600 hover:text-teal-700 font-medium"
                disabled={isLoading}
              >
                Forgot your password?
              </button>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full relative group bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-4 border-radius-custom disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center overflow-hidden"
            >
              <span className="absolute inset-0 border-radius-custom bg-gradient-to-r from-blue-500 to-purple-500 opacity-60 blur-md group-hover:opacity-90 transition-all duration-300"></span>
              <span className="relative z-10">
                {isLoading ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Signing in...
                  </>
                ) : (
                  'Sign in'
                )}
              </span>
            </button>
          </form>

          {/* Register link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={onSwitchToRegister}
                className="text-teal-600 hover:text-teal-700 font-medium"
                disabled={isLoading}
              >
                Sign up for free
              </button>
            </p>
          </div>
        </div>

        {/* Social proof */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Trusted by 350+ content creators worldwide
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;