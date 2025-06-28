import React, { useState } from 'react';
import { Check, Shield, CreditCard } from 'lucide-react';

const Pricing: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: 'Starter',
      price: isAnnual ? 39 : 49,
      description: 'Perfect for individual creators',
      features: [
        '50 content packs per month',
        'All 7 content formats',
        'Basic tone controls',
        'PDF & text exports',
        'Email support'
      ],
      popular: false
    },
    {
      name: 'Pro',
      price: isAnnual ? 79 : 99,
      description: 'Best for growing businesses',
      features: [
        '200 content packs per month',
        'All 7 content formats',
        'Advanced tone & style controls',
        'All export formats',
        'Priority support',
        'Custom brand voice',
        'Team collaboration'
      ],
      popular: true
    },
    {
      name: 'Agency',
      price: isAnnual ? 239 : 299,
      description: 'For agencies and large teams',
      features: [
        'Unlimited content packs',
        'All 7 content formats',
        'White-label options',
        'API access',
        'Dedicated account manager',
        'Custom integrations',
        'Advanced analytics',
        'Multi-brand management'
      ],
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-white" data-aos="fade-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-semibold text-gray-900 mb-6">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Choose the plan that fits your content creation needs
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-8">
            <span className={`mr-3 ${!isAnnual ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-6 w-11 items-center border-radius-custom transition-colors focus:ring-2 focus:ring-teal-400 ${
                isAnnual ? 'bg-teal-600' : 'bg-gray-200'
              }`}
              aria-label="Toggle annual billing"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isAnnual ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`ml-3 ${isAnnual ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
              Annual
            </span>
            {isAnnual && (
              <span className="ml-2 bg-teal-100 text-teal-800 text-xs font-medium px-2 py-1 rounded-full">
                Save 20%
              </span>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white border-2 border-radius-custom p-8 shadow-custom hover:shadow-lg transition-all duration-200 ${
                plan.popular ? 'border-teal-500 scale-105' : 'border-gray-200'
              }`}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                  <span className="text-gray-600">/month</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="w-5 h-5 text-teal-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 px-6 border-radius-custom font-semibold transition-all duration-200 focus-ring ${
                  plan.popular
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white button-gradient-hover'
                    : 'border-2 border-gray-300 text-gray-700 hover:border-teal-500 hover:text-teal-600 hover:shadow-lg hover:-translate-y-0.5'
                }`}
              >
                Start Free Trial
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 space-y-4">
          <div className="inline-flex items-center bg-green-50 px-6 py-3 border-radius-custom border border-green-200">
            <Shield className="w-5 h-5 text-green-600 mr-2" />
            <span className="text-green-800 font-medium">30-day money-back guarantee</span>
          </div>
          <div className="flex items-center justify-center space-x-4 text-gray-500 text-sm">
            <CreditCard className="w-4 h-4" />
            <span>Secure payments powered by Stripe</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;