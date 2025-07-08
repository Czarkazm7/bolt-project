
import React from 'react';
import { Link } from 'react-router-dom';
import { FacebookIcon, TwitterIcon, LinkedInIcon } from './icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-transparent border-t border-slate-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 text-brand-muted text-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center sm:text-left">
          <div className="sm:col-span-2 md:col-span-1">
            <h4 className="font-bold text-brand-dark mb-2">CalculatorBear</h4>
            <p className="mb-4">&copy; {new Date().getFullYear()} All Rights Reserved.</p>
             <div className="flex items-center space-x-4 justify-center sm:justify-start">
                <a href="#" aria-label="Facebook" className="text-brand-muted hover:text-brand-primary transition-colors"><FacebookIcon className="h-6 w-6" /></a>
                <a href="#" aria-label="X" className="text-brand-muted hover:text-brand-primary transition-colors"><TwitterIcon className="h-6 w-6" /></a>
                <a href="#" aria-label="LinkedIn" className="text-brand-muted hover:text-brand-primary transition-colors"><LinkedInIcon className="h-6 w-6" /></a>
              </div>
          </div>
          <div>
            <h4 className="font-bold text-brand-dark mb-2">Popular Calculators</h4>
            <ul className="space-y-2">
              <li><Link to="/calculator/mortgage-calculator" className="hover:text-brand-primary transition-colors">Mortgage Calculator</Link></li>
              <li><Link to="/calculator/compound-interest-calculator" className="hover:text-brand-primary transition-colors">Investment Calculator</Link></li>
              <li><Link to="/calculator/loan-repayment-calculator" className="hover:text-brand-primary transition-colors">Loan Calculator</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-brand-dark mb-2">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-brand-primary transition-colors">About</Link></li>
              <li><Link to="/blog" className="hover:text-brand-primary transition-colors">Blog</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-brand-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-of-use" className="hover:text-brand-primary transition-colors">Terms of Use</Link></li>
              <li><Link to="/admin" className="hover:text-brand-primary transition-colors">Admin</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;