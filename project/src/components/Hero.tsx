import React, { useEffect, useRef } from 'react';
import { Play, Zap, Check } from 'lucide-react';

interface HeroProps {
  onStartGenerator: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartGenerator }) => {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const animatedElements = heroRef.current?.querySelectorAll('.scroll-animate');
    animatedElements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleWatchDemo = () => {
    window.open('https://www.loom.com/embed/demo-placeholder', '_blank');
  };

  return (
    <section 
      ref={heroRef}
      className="pt-24 pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-teal-50/60 via-white to-indigo-50/40"
      data-aos="fade-up"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column */}
          <div className="text-center lg:text-left scroll-animate" data-aos="fade-right">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Create{' '}
              <span className="gradient-text">
                7 Pieces of Content
              </span>{' '}
              in &lt; 60 Seconds
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Blog, Tweets, Reels scripts & more from one keyword. 
              Transform any idea into a complete content strategy instantly.
            </p>
            
            {/* Feature bullets */}
            <div className="grid grid-cols-2 gap-3 mb-8 text-left max-w-md mx-auto lg:mx-0">
              <div className="flex items-center">
                <Check className="w-5 h-5 text-teal-600 mr-2 flex-shrink-0" />
                <span className="text-gray-700">SEO blog</span>
              </div>
              <div className="flex items-center">
                <Check className="w-5 h-5 text-teal-600 mr-2 flex-shrink-0" />
                <span className="text-gray-700">10-tweet thread</span>
              </div>
              <div className="flex items-center">
                <Check className="w-5 h-5 text-teal-600 mr-2 flex-shrink-0" />
                <span className="text-gray-700">LinkedIn post</span>
              </div>
              <div className="flex items-center">
                <Check className="w-5 h-5 text-teal-600 mr-2 flex-shrink-0" />
                <span className="text-gray-700">Shorts script</span>
              </div>
              <div className="flex items-center">
                <Check className="w-5 h-5 text-teal-600 mr-2 flex-shrink-0" />
                <span className="text-gray-700">Instagram caption</span>
              </div>
              <div className="flex items-center">
                <Check className="w-5 h-5 text-teal-600 mr-2 flex-shrink-0" />
                <span className="text-gray-700">Hashtag bank</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                onClick={onStartGenerator}
                className="relative group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 border-radius-custom font-semibold text-lg flex items-center justify-center focus-ring overflow-hidden"
                aria-label="Generate My Content Pack"
              >
                <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-60 blur-md group-hover:opacity-90 transition-all duration-300"></span>
                <span className="relative z-10 flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Generate My Content Pack
                </span>
              </button>
              <button 
                onClick={handleWatchDemo}
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 border-radius-custom font-semibold text-lg hover:border-gray-400 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center focus-ring"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </button>
            </div>
          </div>

          {/* Right Column - Hero Illustration */}
          <div className="relative scroll-animate" data-aos="fade-left" data-aos-delay="200">
            <div className="relative">
              <svg 
                viewBox="0 0 400 300" 
                className="w-full h-auto max-w-lg mx-auto"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Background elements */}
                <defs>
                  <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0D9488" stopOpacity="0.1"/>
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.1"/>
                  </linearGradient>
                  <linearGradient id="screenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F8FAFC"/>
                    <stop offset="100%" stopColor="#E2E8F0"/>
                  </linearGradient>
                </defs>
                
                {/* Background circle */}
                <circle cx="200" cy="150" r="140" fill="url(#bgGradient)" opacity="0.3"/>
                
                {/* Laptop base */}
                <rect x="80" y="180" width="240" height="80" rx="8" fill="#374151"/>
                <rect x="85" y="185" width="230" height="70" rx="6" fill="#1F2937"/>
                
                {/* Laptop screen */}
                <rect x="100" y="80" width="200" height="120" rx="8" fill="#111827"/>
                <rect x="105" y="85" width="190" height="110" rx="4" fill="url(#screenGradient)"/>
                
                {/* Content on screen */}
                <rect x="115" y="95" width="60" height="4" rx="2" fill="#0D9488"/>
                <rect x="115" y="105" width="170" height="3" rx="1.5" fill="#64748B"/>
                <rect x="115" y="112" width="140" height="3" rx="1.5" fill="#64748B"/>
                <rect x="115" y="119" width="160" height="3" rx="1.5" fill="#64748B"/>
                
                {/* Social media icons floating around */}
                <circle cx="320" cy="100" r="15" fill="#1DA1F2" opacity="0.8">
                  <animate attributeName="cy" values="100;90;100" dur="3s" repeatCount="indefinite"/>
                </circle>
                <text x="320" y="106" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">𝕏</text>
                
                <circle cx="60" cy="120" r="15" fill="#0077B5" opacity="0.8">
                  <animate attributeName="cy" values="120;110;120" dur="4s" repeatCount="indefinite"/>
                </circle>
                <text x="60" y="126" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">in</text>
                
                <circle cx="340" cy="180" r="15" fill="#FF0000" opacity="0.8">
                  <animate attributeName="cy" values="180;170;180" dur="3.5s" repeatCount="indefinite"/>
                </circle>
                <text x="340" y="186" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">▶</text>
                
                <circle cx="40" cy="200" r="15" fill="#E4405F" opacity="0.8">
                  <animate attributeName="cy" values="200;190;200" dur="4.5s" repeatCount="indefinite"/>
                </circle>
                <rect x="35" y="195" width="10" height="10" rx="2" fill="white"/>
                
                {/* Sparkles */}
                <g opacity="0.6">
                  <polygon points="150,60 152,66 158,66 153,70 155,76 150,72 145,76 147,70 142,66 148,66" fill="#F59E0B">
                    <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
                  </polygon>
                  <polygon points="280,50 281,54 285,54 282,57 283,61 280,58 277,61 278,57 275,54 279,54" fill="#8B5CF6">
                    <animate attributeName="opacity" values="0.6;1;0.6" dur="2.5s" repeatCount="indefinite"/>
                  </polygon>
                  <polygon points="350,140 351,143 354,143 352,145 353,148 350,146 347,148 348,145 346,143 349,143" fill="#0D9488">
                    <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite"/>
                  </polygon>
                </g>
                
                {/* Content generation visualization */}
                <g opacity="0.8">
                  <rect x="115" y="140" width="30" height="20" rx="4" fill="#0D9488" opacity="0.2">
                    <animate attributeName="opacity" values="0.2;0.8;0.2" dur="1.5s" repeatCount="indefinite"/>
                  </rect>
                  <rect x="150" y="140" width="30" height="20" rx="4" fill="#3B82F6" opacity="0.2">
                    <animate attributeName="opacity" values="0.2;0.8;0.2" dur="1.5s" begin="0.3s" repeatCount="indefinite"/>
                  </rect>
                  <rect x="185" y="140" width="30" height="20" rx="4" fill="#8B5CF6" opacity="0.2">
                    <animate attributeName="opacity" values="0.2;0.8;0.2" dur="1.5s" begin="0.6s" repeatCount="indefinite"/>
                  </rect>
                  <rect x="220" y="140" width="30" height="20" rx="4" fill="#F59E0B" opacity="0.2">
                    <animate attributeName="opacity" values="0.2;0.8;0.2" dur="1.5s" begin="0.9s" repeatCount="indefinite"/>
                  </rect>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;