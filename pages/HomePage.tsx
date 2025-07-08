import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { CALCULATORS, CALCULATOR_CATEGORIES } from '../constants';
import CalculatorCard from '../components/CalculatorCard';
import { AnalysisIcon, SpeedIcon, TrustIcon, LibraryIcon, SearchIcon } from '../components/icons';

const FeatureCard = ({ icon, title, description, altText }) => (
    <div className="bg-white/60 p-8 rounded-2xl shadow-sm border border-slate-100/50 flex flex-col items-center text-center h-full">
        <div className="mb-6" role="img" aria-label={altText}>{icon}</div>
        <h3 className="text-xl font-bold text-brand-dark mb-3">{title}</h3>
        <p className="text-brand-muted flex-grow">{description}</p>
    </div>
);

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCalculators = useMemo(() => {
    if (!searchQuery.trim()) {
      return CALCULATORS;
    }
    const lowerCaseQuery = searchQuery.toLowerCase();
    return CALCULATORS.filter(calc =>
      calc.title.toLowerCase().includes(lowerCaseQuery) ||
      calc.description.toLowerCase().includes(lowerCaseQuery)
    );
  }, [searchQuery]);

  const calculatorsByCategory = useMemo(() => {
    return CALCULATOR_CATEGORIES.map(category => ({
      category,
      calculators: filteredCalculators.filter(calc => calc.category === category)
    })).filter(group => group.calculators.length > 0);
  }, [filteredCalculators]);

  return (
    <div className="space-y-16">
      <section className="text-center pt-8 pb-4">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-brand-dark tracking-tighter leading-tight">
          Free Online Calculators for <Link to="/calculator/mortgage-calculator" className="text-brand-primary hover:underline">Finance</Link>, <Link to="/calculator/bmi-calculator" className="text-brand-primary hover:underline">Health</Link>, and Everyday Use.
        </h1>
        <p className="mt-6 max-w-3xl mx-auto text-lg text-brand-muted">
          Simple, accurate, and fast calculators for your daily needs.
        </p>
      </section>

      <div className="relative max-w-3xl mx-auto">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a calculator (e.g., 'Mortgage', 'BMI', 'Tip')..."
          className="w-full py-4 pl-12 pr-4 text-lg bg-brand-light-gray-hover border-transparent focus:ring-2 focus:ring-brand-primary focus:outline-none rounded-full"
        />
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <SearchIcon className="h-6 w-6 text-brand-muted" />
        </div>
      </div>

      <div className="space-y-12">
        {calculatorsByCategory.length > 0 ? (
            calculatorsByCategory.map(({ category, calculators }) => (
              <section key={category}>
                <h2 className="text-2xl font-bold text-brand-dark mb-6">
                  {category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {calculators.map((calculator) => (
                    <CalculatorCard key={calculator.id} calculator={calculator} />
                  ))}
                </div>
              </section>
            ))
        ) : (
            <div className="text-center py-12 bg-white/60 rounded-2xl">
                <h3 className="text-2xl font-semibold text-brand-dark">No Calculators Found</h3>
                <p className="text-brand-muted mt-2">Try adjusting your search query or suggest a new calculator!</p>
            </div>
        )}
      </div>
      
      <section className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-brand-dark">Your One-Stop Hub for Calculations</h2>
        <div className="prose prose-lg max-w-none text-brand-muted prose-a:text-brand-primary prose-a:font-semibold hover:prose-a:underline prose-strong:text-brand-dark">
            <p>Welcome to CalculatorBear, your trusted resource for a comprehensive suite of free online calculators. In today's fast-paced world, making informed decisions is more critical than ever, whether you're planning your financial future, managing your health, or tackling a complex project. Our mission is to provide you with powerful, easy-to-use, and completely free tools that demystify the numbers and give you clear, actionable answers.</p>
            <p>Navigating major life decisions can be daunting. Are you thinking about buying a home? Our detailed <Link to="/calculator/mortgage-calculator">mortgage calculator</Link> can help you break down monthly payments, including taxes and insurance. Need to understand the cost of a personal or auto loan? Our versatile <Link to="/calculator/loan-repayment-calculator">loan calculator</Link> makes it simple to see your repayment schedule and total interest paid. If you're looking to grow your wealth, our intuitive <Link to="/calculator/compound-interest-calculator">interest calculator</Link> demonstrates the power of compounding, helping you visualize your savings journey and plan for a secure retirement. We believe financial literacy should be accessible to everyone, which is why our tools are designed to put you in control.</p>
            <p>But life isn't just about money. Your well-being is paramount, and our collection of health and fitness tools is designed to support a healthy lifestyle. Use our popular <Link to="/calculator/bmi-calculator">BMI calculator</Link> to get a quick assessment of your weight-to-height ratio, or explore other tools to estimate your body fat percentage and determine your daily calorie needs. These calculators provide the data you need to make smarter choices about your diet and exercise routines. At CalculatorBear, we are committed to accuracy and simplicity. Each calculator comes with a clear explanation, so you not only get the answer but also understand the logic behind it. Explore our growing library and discover how simple calculations can be.</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center text-brand-dark">Frequently Asked Questions</h2>
        <div className="space-y-8">
            <div>
                <h3 className="text-xl font-semibold text-brand-dark">Are online calculators accurate?</h3>
                <p className="mt-2 text-brand-muted">
                    Reputable online calculators, like ours at CalculatorBear, are built on standard, industry-accepted formulas and are rigorously tested for accuracy. While they provide excellent estimates for planning and educational purposes, they should not replace professional advice for major financial or health decisions. Always consult with a qualified expert for personalized guidance.
                </p>
            </div>
            <div>
                <h3 className="text-xl font-semibold text-brand-dark">What does PITI mean in a mortgage calculator?</h3>
                <p className="mt-2 text-brand-muted">
                    PITI stands for Principal, Interest, Taxes, and Insurance. These are the four core components of a typical monthly mortgage payment. Our mortgage calculator estimates all four to give you a comprehensive and realistic view of your total monthly housing cost, helping you budget more effectively before buying a home.
                </p>
            </div>
            <div>
                <h3 className="text-xl font-semibold text-brand-dark">How does an investment calculator handle compound interest?</h3>
                <p className="mt-2 text-brand-muted">
                    Our investment calculator demonstrates the power of compounding by projecting the future value of your money. It calculates earnings on both your initial investment and the accumulated interest from previous periods. By inputting your contributions and expected rate of return, you can visualize how your wealth can grow exponentially over time.
                </p>
            </div>
            <div>
                <h3 className="text-xl font-semibold text-brand-dark">Why use a specialized financial calculator?</h3>
                <p className="mt-2 text-brand-muted">
                    While a standard calculator is great for basic math, specialized tools like a mortgage or loan calculator are pre-programmed with complex formulas. They simplify the process by providing labeled inputs (e.g., "Loan Term," "Interest Rate"), saving you time and reducing the risk of error when dealing with important financial planning.
                </p>
            </div>
        </div>
      </section>
      
      <section>
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-dark tracking-tight">Why Choose CalculatorBear?</h2>
            <p className="mt-3 text-lg text-brand-muted max-w-2xl mx-auto">Powerful tools in a clean and intuitive environment.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <FeatureCard 
            icon={<AnalysisIcon className="h-24 w-24" />}
            title="Insights & Analysis"
            description="From complex mortgage amortization to detailed health metrics, our calculators provide deep insights. We break down the numbers with clear charts and explanations, so you understand the 'how' and 'why' behind the results. Make informed decisions with confidence."
            altText="Illustration of a decision tree, representing our free financial analysis calculators."
          />
          <div className="flex flex-col gap-8">
            <FeatureCard 
              icon={<SpeedIcon className="h-24 w-24" />}
              title="Streamlined for Speed"
              description="No clutter, no distractions. Just a clean, fast interface designed to get you from question to answer in seconds."
              altText="Abstract lines representing the speed and efficiency of our free online calculators."
            />
            <FeatureCard 
              icon={<TrustIcon className="h-24 w-24" />}
              title="Reliable & Trustworthy"
              description="Our tools are built on standard, industry-accepted formulas and are rigorously tested for accuracy. You can trust our results for your planning."
              altText="Icon of a shield, symbolizing trustworthy and reliable calculations for mortgage and investment planning."
            />
          </div>
          <FeatureCard 
            icon={<LibraryIcon className="h-24 w-24" />}
            title="Comprehensive Tool Library"
            description="We offer a vast and growing collection of calculators across dozens of categories, including finance, health, engineering, and everyday life. If you need to calculate something, chances are we have a tool for it. And if we don't, please suggest one!"
            altText="Icon of a honeycomb structure, representing a vast library of free online calculators."
          />
        </div>
      </section>
    </div>
  );
};

export default HomePage;