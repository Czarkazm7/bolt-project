import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { CALCULATORS } from '../constants';
import Breadcrumbs from '../components/Breadcrumbs';

const CalculatorPage: React.FC = () => {
  const { calculatorId } = useParams<{ calculatorId: string }>();
  
  const calculator = CALCULATORS.find(c => c.id === calculatorId);

  useEffect(() => {
    if (!calculator) return;

    // Set document title and meta description
    document.title = `${calculator.title} | CalculatorBear`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', calculator.description);
    }
    
    // Manage structured data for AEO
    const scriptId = 'json-ld-faq';
    document.getElementById(scriptId)?.remove(); // Clean up old script

    if (calculator.faq && calculator.faq.length > 0) {
      const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: calculator.faq.map(item => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.a,
          },
        })),
      };

      const script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(faqSchema);
      document.head.appendChild(script);
    }
    
    window.scrollTo(0, 0);

    return () => {
      // Cleanup script when component unmounts
      document.getElementById(scriptId)?.remove();
    };

  }, [calculator]);

  if (!calculator) {
    return <Navigate to="/" replace />;
  }

  const { title, explanation, component: CalculatorComponent, category, faq } = calculator;

  return (
    <div className="max-w-7xl mx-auto">
      <Breadcrumbs paths={[{ name: 'Home', path: '/' }, { name: category, path: `/?category=${category}` }, { name: title }]} />
      
      <div className="mt-8 flex justify-center">
        <div className="w-full max-w-4xl">
            <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-10">
                <div className="space-y-4">
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight">{title}</h1>
                  <div className="prose prose-lg max-w-none text-brand-muted">
                      {explanation}
                  </div>
                </div>
                
                <div className="mt-8 pt-8 border-t border-slate-200">
                  <CalculatorComponent />
                </div>

                {faq && faq.length > 0 && (
                  <div className="mt-10 pt-8 border-t border-slate-200">
                    <h2 className="text-2xl font-bold text-brand-dark mb-6">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                      {faq.map((item, index) => (
                        <div key={index}>
                          <h3 className="text-lg font-semibold text-brand-dark">{item.q}</h3>
                          <p className="mt-2 text-brand-muted">{item.a}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorPage;