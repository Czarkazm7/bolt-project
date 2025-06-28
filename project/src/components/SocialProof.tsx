import React from 'react';

const SocialProof: React.FC = () => {
  const brands = [
    { name: 'Microsoft', width: 'w-24' },
    { name: 'Google', width: 'w-20' },
    { name: 'Amazon', width: 'w-24' },
    { name: 'Netflix', width: 'w-20' },
    { name: 'Spotify', width: 'w-24' },
    { name: 'Airbnb', width: 'w-20' }
  ];

  return (
    <section className="py-16 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-500 text-sm font-medium mb-2">
          Loved by 350+ creators
        </p>
        <p className="text-center text-gray-400 text-xs mb-8">
          Trusted by content teams at leading companies
        </p>
        <div className="flex justify-center items-center space-x-12 opacity-40">
          {brands.map((brand, index) => (
            <div key={index} className={`${brand.width} h-8 bg-gray-400 rounded-lg`}>
              <div className="w-full h-full flex items-center justify-center text-xs font-semibold text-white">
                {brand.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;