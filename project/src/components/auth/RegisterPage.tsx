import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, Zap, Check } from 'lucide-react';

interface RegisterPageProps {
  onRegister: (name: string, email: string, password: string) => Promise<void>;
  onBackToLanding: () => void;
  onSwitchToLogin: () => void;
  isLoading?: boolean;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ 
  onRegister, 
  onBackToLanding, 
  onSwitchToLogin,
  isLoading = false 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const validatePassword = (password: string) => {
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password)
    };
    return requirements;
  };

  const passwordRequirements = validatePassword(formData.password);
  const isPasswordValid = Object.values(passwordRequirements).every(Boolean);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validation
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.email.includes('@')) newErrors.email = 'Please enter a valid email';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!isPasswordValid) newErrors.password = 'Password does not meet requirements';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!acceptedTerms) newErrors.terms = 'You must accept the terms and conditions';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await onRegister(formData.name, formData.email, formData.password);
    } catch (error) {
      setErrors({ general: 'Registration failed. Please try again.' });
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50/60 via-white to-indigo-50/40 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create your account</h1>
          <p className="text-gray-600">Start generating amazing content in seconds</p>
        </div>

        {/* Register form */}
        <div className="bg-white border-radius-custom shadow-custom p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* General error */}
            {errors.general && (
              <div className="bg-red-50 border border-red-200 border-radius-custom p-4">
                <p className="text-red-600 text-sm">{errors.general}</p>
              </div>
            )}

            {/* Name field */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                Full name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border border-radius-custom shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 ${
                    errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Enter your full name"
                  disabled={isLoading}
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

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
                  placeholder="Create a password"
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
              
              {/* Password requirements */}
              {formData.password && (
                <div className="mt-2 space-y-1">
                  <div className={`flex items-center text-xs ${passwordRequirements.length ? 'text-green-600' : 'text-gray-500'}`}>
                    <Check className={`w-3 h-3 mr-1 ${passwordRequirements.length ? 'text-green-600' : 'text-gray-400'}`} />
                    At least 8 characters
                  </div>
                  <div className={`flex items-center text-xs ${passwordRequirements.uppercase ? 'text-green-600' : 'text-gray-500'}`}>
                    <Check className={`w-3 h-3 mr-1 ${passwordRequirements.uppercase ? 'text-green-600' : 'text-gray-400'}`} />
                    One uppercase letter
                  </div>
                  <div className={`flex items-center text-xs ${passwordRequirements.lowercase ? 'text-green-600' : 'text-gray-500'}`}>
                    <Check className={`w-3 h-3 mr-1 ${passwordRequirements.lowercase ? 'text-green-600' : 'text-gray-400'}`} />
                    One lowercase letter
                  </div>
                  <div className={`flex items-center text-xs ${passwordRequirements.number ? 'text-green-600' : 'text-gray-500'}`}>
                    <Check className={`w-3 h-3 mr-1 ${passwordRequirements.number ? 'text-green-600' : 'text-gray-400'}`} />
                    One number
                  </div>
                </div>
              )}
              
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  className={`w-full pl-10 pr-12 py-3 border border-radius-custom shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 ${
                    errors.confirmPassword ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Confirm your password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  disabled={isLoading}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Terms and conditions */}
            <div>
              <label className="flex items-start">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="mt-1 h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                  disabled={isLoading}
                />
                <span className="ml-2 text-sm text-gray-600">
                  I agree to the{' '}
                  <a href="#" className="text-teal-600 hover:text-teal-700 underline">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-teal-600 hover:text-teal-700 underline">
                    Privacy Policy
                  </a>
                </span>
              </label>
              {errors.terms && (
                <p className="mt-1 text-sm text-red-600">{errors.terms}</p>
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
                    Creating account...
                  </>
                ) : (
                  'Create account'
                )}
              </span>
            </button>
          </form>

          {/* Login link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <button
                onClick={onSwitchToLogin}
                className="text-teal-600 hover:text-teal-700 font-medium"
                disabled={isLoading}
              >
                Sign in
              </button>
            </p>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-8 bg-white/50 border-radius-custom p-6 border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-3">What you get with ContentCraft AI:</h3>
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <Check className="w-4 h-4 text-teal-600 mr-2 flex-shrink-0" />
              Generate 7 types of content instantly
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Check className="w-4 h-4 text-teal-600 mr-2 flex-shrink-0" />
              Save 5+ hours every week
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Check className="w-4 h-4 text-teal-600 mr-2 flex-shrink-0" />
              30-day money-back guarantee
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;