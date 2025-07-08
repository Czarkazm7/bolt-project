import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LockClosedIcon, XIcon } from '../components/icons';
import { signInWithEmailAndPassword, sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';

const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // --- Forgot Password Modal State ---
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetMessage, setResetMessage] = useState('');
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Invalid email or password.');
      console.error(err);
    }
  };
  
  const openForgotPasswordModal = () => {
    setResetEmail('');
    setResetMessage('');
    setIsForgotPasswordOpen(true);
  };
  
  const closeForgotPasswordModal = () => {
    setIsForgotPasswordOpen(false);
  };

  const [googleError, setGoogleError] = useState('');

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetMessage('');
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setResetMessage(`If an account exists for ${resetEmail}, a password reset link has been sent to your email.`);
    } catch (error) {
      console.error("Error sending password reset email:", error);
      setResetMessage("Failed to send password reset email. Please try again.");
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleError('');
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/admin/dashboard');
    } catch (err) {
      console.error("Google Sign-in error:", err);
      setGoogleError('Failed to sign in with Google. Please try again.');
    }
  };

  const renderModalContent = () => {
    return (
      <>
        <h2 className="text-2xl font-bold text-brand-dark mb-2">Forgot Password</h2>
        <p className="text-brand-muted mb-4">Enter your admin email to receive a password reset link.</p>
        <form onSubmit={handleEmailSubmit}>
          <input
            type="email"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            placeholder="your-email@example.com"
            required
            className="w-full p-3 bg-brand-light-gray border-transparent focus:ring-2 focus:ring-brand-primary focus:outline-none rounded-md"
          />
          <button
            type="submit"
            className="mt-6 w-full py-3 px-4 bg-brand-primary text-white rounded-md font-semibold hover:bg-brand-primary-hover transition-colors"
          >
            Send Reset Email
          </button>
        </form>
        {resetMessage && <p className="text-sm text-center mt-4 text-brand-muted">{resetMessage}</p>}
      </>
    );
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg">
          <div className="text-center">
            <LockClosedIcon className="mx-auto h-12 w-12 text-brand-primary" />
            <h2 className="mt-6 text-3xl font-extrabold text-brand-dark">
              Admin Sign In
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-brand-primary focus:border-brand-primary focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password-for-login" className="sr-only">Password</label>
                <input
                  id="password-for-login"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-brand-primary focus:border-brand-primary focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-600 text-center">{error}</p>
            )}

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <button
                  type="button"
                  onClick={openForgotPasswordModal}
                  className="font-medium text-brand-primary hover:text-brand-primary-hover"
                >
                  Forgot your password?
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-brand-primary hover:bg-brand-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary"
              >
                Sign in
              </button>
            </div>

            {googleError && (
              <p className="text-sm text-red-600 text-center">{googleError}</p>
            )}

            <div>
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="group relative w-full flex justify-center py-3 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google logo" className="h-5 w-5 mr-2" />
                Sign in with Google
              </button>
            </div>
          </form>
        </div>
      </div>

      {isForgotPasswordOpen && (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-[99] flex items-center justify-center p-4" 
            onClick={closeForgotPasswordModal}
        >
          <div 
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-auto p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={closeForgotPasswordModal} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1">
                <XIcon className="h-5 w-5" />
            </button>
            <div className="text-center">
              {renderModalContent()}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminLoginPage;
