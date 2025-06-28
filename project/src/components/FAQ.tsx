import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'How does ContentCraft AI generate content for different platforms?',
      answer: 'Our AI analyzes your topic and target audience, then creates platform-specific content optimized for each channel\'s unique requirements. For example, Twitter content is concise and engaging with proper threading, while blog posts are comprehensive and SEO-optimized with proper structure and keywords.'
    },
    {
      question: 'Can I customize the tone and style of the generated content?',
      answer: 'Absolutely! ContentCraft AI offers advanced tone controls including professional, casual, enthusiastic, and educational styles. You can also train the AI on your brand voice for consistent, on-brand content across all platforms. Our Pro plan includes custom brand voice training.'
    },
    {
      question: 'What content formats does ContentCraft AI support?',
      answer: 'We generate 7 different content formats from a single input: SEO-optimized blog posts, Twitter threads, LinkedIn posts, YouTube Shorts scripts, Instagram captions with hashtags, title banks with 15+ alternatives, and platform-specific hashtag collections. All optimized for maximum engagement.'
    },
    {
      question: 'Is there a limit to how much content I can generate?',
      answer: 'Limits depend on your plan. Starter includes 50 content packs per month, Pro includes 200, and Agency offers unlimited generation. Each content pack includes all 7 formats for your topic. You can upgrade or downgrade your plan anytime.'
    },
    {
      question: 'How accurate and high-quality is the AI-generated content?',
      answer: 'Our AI is trained on high-performing content across industries and continuously updated with the latest trends and best practices. While we recommend reviewing and personalizing the content, most users find it publication-ready with minimal editing. Our quality score averages 4.8/5 from user feedback.'
    },
    {
      question: 'Can I export content to my existing tools and platforms?',
      answer: 'Yes! ContentCraft AI integrates with popular tools like Notion, Google Docs, and offers PDF exports. You can also copy content directly to your clipboard or use our API for custom integrations. Pro and Agency plans include advanced export options and direct publishing capabilities.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-white" data-aos="fade-up">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-semibold text-gray-900 mb-6">
            Frequently asked questions
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Everything you need to know about ContentCraft AI
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border border-gray-200 border-radius-custom overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
              data-aos="fade-up"
              data-aos-delay={index * 50}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-inset"
                aria-expanded={openIndex === index}
              >
                <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;