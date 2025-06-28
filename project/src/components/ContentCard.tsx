import React from 'react';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface ContentCardProps {
  title: string;
  content: string;
  icon: React.ReactNode;
  description: string;
  gradient: string;
}

const ContentCard: React.FC<ContentCardProps> = ({ title, content, icon, description, gradient }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="bg-white border-radius-custom shadow-custom border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className={`${gradient} p-4 text-white`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {icon}
            <div className="ml-3">
              <h3 className="font-semibold text-lg">{title}</h3>
              <p className="text-white/80 text-sm">{description}</p>
            </div>
          </div>
          <button
            onClick={handleCopy}
            className="p-2 bg-white/20 hover:bg-white/30 border-radius-custom transition-colors duration-200"
            title="Copy to clipboard"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>
      <div className="p-6">
        <div className="bg-gray-50 border-radius-custom p-4 max-h-64 overflow-y-auto">
          <pre className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed">
            {content}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;