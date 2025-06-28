import React from 'react';
import { Zap } from 'lucide-react';

interface ClosingCTAProps {
  onStartGenerator: () => void;
}

const ClosingCTA: React.FC<ClosingCTAProps> = ({ onStartGenerator }) => {
  return (
    <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600" data-aos="fade-up">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-semibold text-white mb-6 leading-tight">
          Ready to save 5+ hours every week?
        </h2>
        <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-2xl mx-auto">
          Join thousands of content creators who've transformed their workflow with ContentCraft AI. 
          Start generating professional content for all platforms in seconds.
        </p>
        <button 
          onClick={onStartGenerator}
          className="relative group bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg flex items-center mx-auto overflow-hidden"
        >
          <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-white to-blue-50 opacity-60 blur-sm group-hover:opacity-90 transition-all duration-300"></span>
          <span className="relative z-10 flex items-center">
            <Zap className="w-5 h-5 mr-2" />
            Start Free Trial
          </span>
        </button>
        <p className="text-blue-200 text-sm mt-4">
          No credit card required • 30-day money-back guarantee
        </p>
      </div>
    </section>
  );
};

export default ClosingCTA;