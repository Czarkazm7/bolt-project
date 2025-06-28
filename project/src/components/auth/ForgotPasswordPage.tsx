import React, { useState } from 'react';
import { Mail, ArrowLeft, Zap, CheckCircle } from 'lucide-react';

interface ForgotPasswordPageProps {
  onSendResetEmail: (email: string) => Promise<void>;
  onBackToLogin: () => void;
  onBackToLanding: () => void;
  isLoading?: boolean;
}

const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({ 
  onSendResetEmail, 
  onBackToLogin, 
  onBackToLanding,
  isLoading = false 
}) => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validation
    if (!email) {
      setErrors({ email: 'Email is required' });
      return;
    }
    if (!email.includes('@')) {
      setErrors({ email: 'Please enter a valid email' });
      return;
    }

    try {
      await onSendResetEmail(email);
      setEmailSent(true);
    } catch (error) {
      setErrors({ general: 'Failed to send reset email. Please try again.' });
    }
  };

  if (emailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50/60 via-white to-indigo-50/40 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          {/* Back to login button */}
          <button
            onClick={onBackToLogin}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to login
          </button>

          {/* Success message */}
          <div className="bg-white border-radius-custom shadow-custom p-8 border border-gray-100 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Check your email</h1>
            <p className="text-gray-600 mb-6 leading-relaxed">
              We've sent a password reset link to <strong>{email}</strong>. 
              Click the link in the email to reset your password.
            </p>
            
            <div className="space-y-4">
              <button
                onClick={onBackToLogin}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-4 border-radius-custom hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                Back to login
              </button>
              
              <button
                onClick={() => setEmailSent(false)}
                className="w-full text-gray-600 hover:text-gray-900 font-medium"
              >
                Didn't receive the email? Try again
              </button>
            </div>
          </div>

          {/* Help text */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Check your spam folder if you don't see the email in your inbox
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50/60 via-white to-indigo-50/40 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Back to login button */}
        <button
          onClick={onBackToLogin}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to login
        </button>

        {/* Logo and header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Zap className="w-8 h-8 text-teal-600 mr-2" />
            <span className="text-2xl font-semibold text-gray-900">ContentCraft AI</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Reset your password</h1>
          <p className="text-gray-600">Enter your email and we'll send you a reset link</p>
        </div>

        {/* Reset form */}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                    Sending reset link...
                  </>
                ) : (
                  'Send reset link'
                )}
              </span>
            </button>
          </form>

          {/* Back to login link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Remember your password?{' '}
              <button
                onClick={onBackToLogin}
                className="text-teal-600 hover:text-teal-700 font-medium"
                disabled={isLoading}
              >
                Sign in
              </button>
            </p>
          </div>
        </div>

        {/* Security note */}
        <div className="mt-6 bg-blue-50 border border-blue-200 border-radius-custom p-4">
          <p className="text-sm text-blue-800">
            <strong>Security note:</strong> For your protection, password reset links expire after 1 hour.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;