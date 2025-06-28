import React, { useState, useEffect } from 'react';
import { FileText, Target, Palette, Ruler, Zap } from 'lucide-react';

interface ContentFormProps {
  onGenerate: (formData: FormData) => void;
  isGenerating: boolean;
}

export interface FormData {
  topic: string;
  audience: string;
  tone: string;
  length: string;
}

const ContentForm: React.FC<ContentFormProps> = ({ onGenerate, isGenerating }) => {
  const [formData, setFormData] = useState<FormData>({
    topic: '',
    audience: '',
    tone: 'professional',
    length: 'medium'
  });

  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isGenerating) {
      // Show spinner for first 2 seconds
      setTimeout(() => {
        setShowProgress(true);
        setProgress(10);
        
        // Update progress every second
        interval = setInterval(() => {
          setProgress(prev => {
            if (prev >= 90) return prev;
            return prev + Math.random() * 15;
          });
        }, 1000);
      }, 2000);
    } else {
      setShowProgress(false);
      setProgress(0);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isGenerating]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.topic.trim()) {
      onGenerate(formData);
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold gradient-text mb-4">
          Content Generator Pro
        </h1>
        <p className="text-gray-600 text-xl font-medium">
          Create your multi-platform content pack in one click
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border-radius-custom shadow-custom p-8 border border-gray-100">
        <div className="space-y-8">
          {/* Topic Input */}
          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-4">
              <FileText className="w-5 h-5 mr-3 text-teal-600" />
              Content Topic
            </label>
            <input
              type="text"
              value={formData.topic}
              onChange={(e) => handleChange('topic', e.target.value)}
              placeholder="Tell us your topic..."
              className="w-full px-5 py-4 border border-gray-200 border-radius-custom shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 text-gray-700"
              required
              aria-label="Enter your content topic"
            />
          </div>

          {/* Target Audience */}
          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-4">
              <Target className="w-5 h-5 mr-3 text-blue-600" />
              Target Audience
            </label>
            <input
              type="text"
              value={formData.audience}
              onChange={(e) => handleChange('audience', e.target.value)}
              placeholder="Who is this for?"
              className="w-full px-5 py-4 border border-gray-200 border-radius-custom shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-700"
              required
              aria-label="Enter your target audience"
            />
          </div>

          {/* Tone Selection */}
          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-4">
              <Palette className="w-5 h-5 mr-3 text-teal-600" />
              Select Content Tone
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {['professional', 'casual', 'enthusiastic', 'educational'].map((tone) => (
                <button
                  key={tone}
                  type="button"
                  role="button"
                  aria-label={`Select ${tone} tone`}
                  onClick={() => handleChange('tone', tone)}
                  className={`px-4 py-3 border-radius-custom border-2 transition-all duration-200 capitalize font-medium focus:ring-2 focus:ring-teal-400 ${
                    formData.tone === tone
                      ? 'border-teal-400 bg-teal-50 text-teal-700 shadow-sm'
                      : 'border-gray-200 hover:border-teal-200 hover:bg-teal-25 text-gray-600'
                  }`}
                >
                  {tone}
                </button>
              ))}
            </div>
          </div>

          {/* Length Preference */}
          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-4">
              <Ruler className="w-5 h-5 mr-3 text-orange-600" />
              Select Content Length
            </label>
            <div className="grid grid-cols-3 gap-3">
              {['short', 'medium', 'long'].map((length) => (
                <button
                  key={length}
                  type="button"
                  role="button"
                  aria-label={`Select ${length} content length`}
                  onClick={() => handleChange('length', length)}
                  className={`px-4 py-3 border-radius-custom border-2 transition-all duration-200 capitalize font-medium focus:ring-2 focus:ring-teal-400 ${
                    formData.length === length
                      ? 'border-blue-400 bg-blue-50 text-blue-700 shadow-sm'
                      : 'border-gray-200 hover:border-blue-200 hover:bg-blue-25 text-gray-600'
                  }`}
                >
                  {length}
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <button
            type="submit"
            disabled={!formData.topic.trim() || isGenerating}
            className="w-full relative group bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-5 px-8 border-radius-custom disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all duration-200 flex items-center justify-center text-lg focus-ring overflow-hidden"
          >
            <span className="absolute inset-0 border-radius-custom bg-gradient-to-r from-blue-500 to-purple-500 opacity-60 blur-md group-hover:opacity-90 transition-all duration-300"></span>
            <span className="relative z-10 flex items-center justify-center w-full">
              {isGenerating ? (
                <>
                  {!showProgress ? (
                    <>
                      <span className="pulse-dots mr-3"></span>
                      Generating Content...
                    </>
                  ) : (
                    <div className="w-full">
                      <div className="flex items-center justify-center mb-2">
                        <span>Generating Content... {Math.round(progress)}%</span>
                      </div>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <Zap className="w-6 h-6 mr-3" />
                  Generate My Content Pack
                </>
              )}
            </span>
          </button>

          {/* Loading feedback with aria-live */}
          <div aria-live="polite" className="sr-only">
            {isGenerating && (
              showProgress 
                ? `Generating content, ${Math.round(progress)}% complete`
                : "Starting content generation"
            )}
          </div>

          {/* Hint Text */}
          <div className="text-center">
            <p className="text-gray-500 text-sm">
              Receive SEO blog, tweets, LinkedIn post, Shorts script, and hashtags instantly.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContentForm;