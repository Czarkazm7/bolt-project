import React from 'react';
import { ArrowRight, Sliders, FileDown } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      title: 'One Input, Seven Outputs',
      description: 'Transform a single topic into blog posts, social media content, video scripts, and more. Our AI understands context and adapts content for each platform\'s unique requirements and audience expectations.',
      icon: <ArrowRight className="w-8 h-8 text-teal-600" />,
      illustration: (
        <div className="relative bg-gradient-to-br from-teal-50 to-blue-50 p-8 rounded-xl">
          <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-6 mx-auto">
            <span className="text-teal-600 font-semibold text-sm">Topic</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[1,2,3,4,5,6,7].map(i => (
              <div key={i} className="w-full h-8 bg-white rounded-lg shadow-sm border border-gray-100 flex items-center justify-center">
                <div className="w-4 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      title: 'Brand-Ready Tone Control',
      description: 'Fine-tune your content\'s voice with precision controls. From professional corporate communications to casual social media posts, maintain consistent brand personality across all platforms with advanced AI tone matching.',
      icon: <Sliders className="w-8 h-8 text-blue-600" />,
      illustration: (
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-xl space-y-4">
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600 w-20">Professional</span>
            <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
              <div className="w-3/4 h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600 w-20">Casual</span>
            <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
              <div className="w-1/2 h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full"></div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600 w-20">Enthusiastic</span>
            <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
              <div className="w-5/6 h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full"></div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Export Anywhere',
      description: 'Seamlessly integrate with your existing workflow. Export to Notion, Google Docs, PDF, or copy directly to your clipboard. Your content, your way, wherever you need it.',
      icon: <FileDown className="w-8 h-8 text-purple-600" />,
      illustration: (
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-xl">
          <div className="grid grid-cols-3 gap-4">
            <div className="w-16 h-16 bg-gray-900 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-sm font-bold">N</span>
            </div>
            <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-sm font-bold">G</span>
            </div>
            <div className="w-16 h-16 bg-red-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-xs font-bold">PDF</span>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <section id="features" className="py-24 bg-teal-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20" data-aos="fade-up">
          <h2 className="text-4xl font-semibold text-gray-900 mb-6">
            Everything you need to scale content creation
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Stop spending hours creating content for different platforms. Our AI does the heavy lifting while you focus on strategy and growth.
          </p>
        </div>

        <div className="space-y-24">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`grid lg:grid-cols-2 gap-16 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mr-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900">{feature.title}</h3>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
              <div className={`flex justify-center ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                <div className="w-full max-w-md">
                  {feature.illustration}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;