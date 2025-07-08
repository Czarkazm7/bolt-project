
import React from 'react';

const TermsOfUsePage: React.FC = () => {
  return (
    <div className="bg-white rounded-xl p-8 md:p-12">
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-6">Terms of Use</h1>
            <div className="prose prose-lg max-w-none text-slate-700 prose-headings:text-slate-900 prose-strong:text-slate-800">
                <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                
                <p>
                    Please read these Terms of Use ("Terms", "Terms of Use") carefully before using the CalculatorBear.com website (the "Service") operated by CalculatorBear ("us", "we", or "our").
                </p>
                <p>
                    Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.
                </p>

                <h3>Disclaimer</h3>
                <p>
                    The calculators and information provided on this Service are for informational and educational purposes only. We do not guarantee the accuracy or applicability of any information provided. The Service is not intended to provide financial, health, or legal advice. You should consult with a professional for advice tailored to your specific situation. Your use of the Service is at your own risk.
                </p>
                
                <h3>Intellectual Property</h3>
                <p>
                    The Service and its original content, features, and functionality are and will remain the exclusive property of CalculatorBear and its licensors.
                </p>

                <h3>Links To Other Web Sites</h3>
                <p>
                    Our Service may contain links to third-party web sites or services that are not owned or controlled by CalculatorBear. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party web sites or services.
                </p>
                
                <h3>Governing Law</h3>
                <p>
                    These Terms shall be governed and construed in accordance with the laws of our jurisdiction, without regard to its conflict of law provisions.
                </p>

                <h3>Changes</h3>
                <p>
                    We reserve the right, at our sole discretion, to modify or replace these Terms at any time.
                </p>
                
                <h3>Contact Us</h3>
                <p>
                    If you have any questions about these Terms, please contact us.
                </p>
            </div>
        </div>
    </div>
  );
};

export default TermsOfUsePage;