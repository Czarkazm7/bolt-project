
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { XIcon } from './icons';

const Header: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const contactEmail = "contact@calculatorbear.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(contactEmail);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2500);
  };

  return (
    <>
      <header className="bg-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/">
              <span className="text-xl font-bold text-brand-dark tracking-tight">CalculatorBear</span>
            </Link>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-5 py-2.5 rounded-full bg-brand-primary text-white text-sm font-semibold hover:bg-brand-primary-hover transition-colors"
              >
                Suggest a Calculator
              </button>
            </div>
          </div>
        </div>
      </header>

      {isModalOpen && (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-[99] flex items-start justify-center p-4 pt-24" 
            onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-auto p-8 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1">
                <XIcon className="h-5 w-5" />
            </button>
            <h2 className="text-2xl font-bold text-brand-dark mb-2">Have an Idea?</h2>
            <p className="text-brand-muted mb-4">Click the email below to send us your suggestion, or copy the address.</p>
            
            <div className="p-4 bg-brand-light-gray rounded-lg">
                <a href={`mailto:${contactEmail}?subject=Calculator Suggestion`} className="text-lg font-semibold text-brand-primary break-words hover:underline">
                  {contactEmail}
                </a>
            </div>

            <button
              onClick={handleCopy}
              className="mt-6 w-full py-3 px-4 bg-brand-primary/10 text-brand-primary rounded-md font-semibold hover:bg-brand-primary/20 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed"
              disabled={isCopied}
            >
              {isCopied ? 'Copied to Clipboard!' : 'Copy Email'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;