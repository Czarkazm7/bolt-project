import React from 'react';
import ContentCard from './ContentCard';
import { Download, FileText, Twitter, Linkedin, Youtube, Instagram, Hash, Lightbulb } from 'lucide-react';

interface ContentDisplayProps {
  content: GeneratedContent;
  onDownload: () => void;
}

export interface GeneratedContent {
  blogPost: string;
  twitterThread: string;
  linkedinPost: string;
  youtubeScript: string;
  instagramCaption: string;
  titleBank: string;
  hashtags: string;
}

const ContentDisplay: React.FC<ContentDisplayProps> = ({ content, onDownload }) => {
  const contentItems = [
    {
      title: 'SEO Blog Post',
      content: content.blogPost,
      icon: <FileText className="w-6 h-6" />,
      description: 'Optimized for search engines',
      gradient: 'bg-gradient-to-r from-purple-500 to-purple-600'
    },
    {
      title: 'Twitter Thread',
      content: content.twitterThread,
      icon: <Twitter className="w-6 h-6" />,
      description: 'Engaging thread format',
      gradient: 'bg-gradient-to-r from-blue-400 to-blue-500'
    },
    {
      title: 'LinkedIn Post',
      content: content.linkedinPost,
      icon: <Linkedin className="w-6 h-6" />,
      description: 'Professional networking',
      gradient: 'bg-gradient-to-r from-blue-600 to-blue-700'
    },
    {
      title: 'YouTube Shorts Script',
      content: content.youtubeScript,
      icon: <Youtube className="w-6 h-6" />,
      description: 'Short-form video content',
      gradient: 'bg-gradient-to-r from-red-500 to-red-600'
    },
    {
      title: 'Instagram Caption',
      content: content.instagramCaption,
      icon: <Instagram className="w-6 h-6" />,
      description: 'Visual storytelling',
      gradient: 'bg-gradient-to-r from-pink-500 to-purple-500'
    },
    {
      title: 'Title Bank',
      content: content.titleBank,
      icon: <Lightbulb className="w-6 h-6" />,
      description: 'Alternative headlines',
      gradient: 'bg-gradient-to-r from-yellow-500 to-orange-500'
    },
    {
      title: 'Hashtag Collection',
      content: content.hashtags,
      icon: <Hash className="w-6 h-6" />,
      description: 'Trending hashtags',
      gradient: 'bg-gradient-to-r from-teal-500 to-green-500'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Content Pack is Ready!</h2>
        <p className="text-gray-600 mb-6">
          Complete multi-platform content strategy generated and ready to use
        </p>
        <button
          onClick={onDownload}
          className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-teal-700 transition-all duration-200 flex items-center mx-auto"
        >
          <Download className="w-5 h-5 mr-2" />
          Download All Content
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {contentItems.map((item, index) => (
          <ContentCard
            key={index}
            title={item.title}
            content={item.content}
            icon={item.icon}
            description={item.description}
            gradient={item.gradient}
          />
        ))}
      </div>
    </div>
  );
};

export default ContentDisplay;