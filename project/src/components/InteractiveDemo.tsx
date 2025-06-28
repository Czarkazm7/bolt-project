import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

const InteractiveDemo: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isGenerating) {
      // Show spinner for first 2 seconds
      setTimeout(() => {
        setShowProgress(true);
        setProgress(10);
        
        // Update progress every 500ms
        interval = setInterval(() => {
          setProgress(prev => {
            if (prev >= 95) return prev;
            return prev + Math.random() * 20;
          });
        }, 500);
      }, 2000);
    } else {
      setShowProgress(false);
      setProgress(0);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isGenerating]);

  const handleTryDemo = async () => {
    if (!inputValue.trim()) return;
    
    setIsGenerating(true);
    setShowResults(false);
    
    // Simulate generation with progress
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    setIsGenerating(false);
    setShowResults(true);
    
    // Create confetti effect
    createConfetti();
  };

  const createConfetti = () => {
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.animationDelay = Math.random() * 3 + 's';
      document.body.appendChild(confetti);
      
      setTimeout(() => {
        confetti.remove();
      }, 4000);
    }
  };

  const sampleResults = [
    { type: 'Blog Post', preview: 'The Ultimate Guide to Remote Work Productivity: 10 Proven Strategies That Actually Work for Modern Teams...' },
    { type: 'Twitter Thread', preview: '🧵 THREAD: Remote work productivity (1/8) Here\'s what changed my game completely and boosted my output by 300%...' },
    { type: 'LinkedIn Post', preview: 'Remote work productivity isn\'t about working more hours—it\'s about working smarter. Here\'s what I learned after 3 years of remote work...' }
  ];

  const handleWatchDemo = () => {
    window.open('https://www.loom.com/embed/demo-placeholder', '_blank');
  };

  return (
    <section className="py-24 bg-gradient-to-br from-indigo-50/60 to-purple-50/40" data-aos="fade-up">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-semibold text-gray-900 mb-6">
          See the magic in action
        </h2>
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          Try our AI with a sample topic and watch it generate content for multiple platforms instantly
        </p>
        
        {/* Demo Video Link */}
        <div className="mb-8">
          <button
            onClick={handleWatchDemo}
            className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium text-lg underline decoration-2 underline-offset-4 hover:decoration-teal-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            Watch 40s Product Demo
          </button>
        </div>

        <div className="bg-white p-8 border-radius-custom shadow-custom max-w-2xl mx-auto">
          <div className="flex gap-4 mb-6">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="What do you want to talk about today?"
              className="flex-1 px-4 py-3 border border-gray-300 border-radius-custom focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
              aria-label="Enter topic for demo"
            />
            <button
              onClick={handleTryDemo}
              disabled={!inputValue.trim() || isGenerating}
              className="bg-teal-600 text-white px-6 py-3 border-radius-custom font-semibold button-hover disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all duration-200 flex items-center"
            >
              {isGenerating ? (
                <>
                  {!showProgress ? (
                    <>
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                      Generating...
                    </>
                  ) : (
                    <span>{Math.round(progress)}%</span>
                  )}
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Try Sample Topic
                </>
              )}
            </button>
          </div>

          {/* Progress bar for demo */}
          {isGenerating && showProgress && (
            <div className="mb-6">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Loading feedback with aria-live */}
          <div aria-live="polite" className="sr-only">
            {isGenerating && (
              showProgress 
                ? `Demo generation ${Math.round(progress)}% complete`
                : "Starting demo generation"
            )}
          </div>

          {showResults && (
            <div className="space-y-4 animate-fade-in-up" aria-live="polite">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Generated Content Preview:</h3>
              {sampleResults.map((result, index) => (
                <div key={index} className="text-left p-4 bg-gray-50 border-radius-custom border border-gray-100">
                  <div className="font-medium text-teal-600 text-sm mb-1">{result.type}</div>
                  <p className="text-gray-700 text-sm leading-relaxed">{result.preview}</p>
                </div>
              ))}
              <div className="mt-6">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 border-radius-custom font-semibold button-gradient-hover">
                  Get Full Content Pack
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default InteractiveDemo;