import React from 'react';
import { Sparkles, FileText, Twitter, Linkedin, Youtube, Instagram, Hash, Lightbulb } from 'lucide-react';

const LoadingState: React.FC = () => {
  const steps = [
    { icon: <Sparkles className="w-5 h-5" />, text: 'Analyzing your topic', delay: 0 },
    { icon: <FileText className="w-5 h-5" />, text: 'Generating SEO blog post', delay: 1 },
    { icon: <Twitter className="w-5 h-5" />, text: 'Creating Twitter thread', delay: 2 },
    { icon: <Linkedin className="w-5 h-5" />, text: 'Writing LinkedIn post', delay: 3 },
    { icon: <Youtube className="w-5 h-5" />, text: 'Scripting YouTube Shorts', delay: 4 },
    { icon: <Instagram className="w-5 h-5" />, text: 'Crafting Instagram caption', delay: 5 },
    { icon: <Lightbulb className="w-5 h-5" />, text: 'Building title bank', delay: 6 },
    { icon: <Hash className="w-5 h-5" />, text: 'Collecting hashtags', delay: 7 }
  ];

  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-white animate-pulse" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Generating Your Content Pack</h2>
          <p className="text-gray-600">AI is creating personalized content for all platforms...</p>
        </div>

        <div className="space-y-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex items-center p-3 rounded-lg bg-gray-50 animate-pulse"
              style={{ animationDelay: `${step.delay * 0.2}s` }}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white mr-3">
                {step.icon}
              </div>
              <span className="text-gray-700 font-medium">{step.text}</span>
              <div className="ml-auto">
                <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4">
          <p className="text-sm text-gray-600">
            <strong>Pro Tip:</strong> Each piece of content is tailored to your specified audience and tone for maximum engagement.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingState;