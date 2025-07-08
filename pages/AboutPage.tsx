
import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white rounded-xl p-8 md:p-12">
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-brand-dark tracking-tight">About CalculatorBear</h1>
                <p className="mt-4 text-lg text-brand-muted">Our Mission: Making Calculations Clear and Accessible for Everyone.</p>
            </div>

            <div className="prose prose-lg max-w-none text-brand-muted prose-headings:text-brand-dark prose-strong:text-brand-dark space-y-6">
                <p>
                    In a world filled with complex information, getting a straightforward answer shouldn't be a chore. That's the simple idea behind CalculatorBear. We were tired of searching for specialized calculators only to find clunky, hard-to-use websites that were difficult to trust.
                </p>
                <p>
                    We believe that everyone—from students to professionals, home buyers to health enthusiasts—deserves access to high-quality, reliable, and free tools. Whether you're planning a major life event, managing your business, or simply satisfying your curiosity, you need tools that just <span className="font-bold">work</span>.
                </p>
                <h3 className="text-2xl font-bold">Our Promise</h3>
                <ul>
                    <li><strong>Clean & Simple:</strong> We focus on giving you the calculator you need in a clean, intuitive interface.</li>
                    <li><strong>Accurate & Reliable:</strong> Our calculators are built on standard formulas and are rigorously tested to ensure you get the right numbers.</li>
                    <li><strong>Completely Free:</strong> Our tools are supported by advertising, which allows us to keep CalculatorBear free for everyone. Our goal is to empower you with information.</li>
                    <li><strong>Helpful & Transparent:</strong> We don't just give you a number; we provide clear explanations so you understand how the calculation works and what it means for you.</li>
                </ul>
                <p>
                    Thank you for visiting. We hope our tools make your day a little bit easier and your decisions a little bit clearer.
                </p>
                <p className="font-semibold text-right">- The CalculatorBear Team</p>
            </div>
        </div>
    </div>
  );
};

export default AboutPage;