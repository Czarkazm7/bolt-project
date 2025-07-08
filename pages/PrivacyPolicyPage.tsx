
import React from 'react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="bg-white rounded-xl p-8 md:p-12">
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-6">Privacy Policy</h1>
            <div className="prose prose-lg max-w-none text-slate-700 prose-headings:text-slate-900 prose-strong:text-slate-800">
                <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

                <p>
                    CalculatorBear.com ("us", "we", or "our") operates the CalculatorBear.com website (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
                </p>

                <h3>Information Collection and Use</h3>
                <p>
                    We do not collect any personally identifiable information from our users. All calculations are performed within your browser and are not stored on our servers.
                </p>

                <h3>Log Data & Cookies</h3>
                <p>
                    We may use third-party services such as Google Analytics to collect, monitor and analyze traffic to our site. These services may use cookies to collect information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                </p>
                <p>
                    Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to your website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet. Users may opt out of personalized advertising by visiting Ads Settings.
                </p>

                <h3>Changes to This Privacy Policy</h3>
                <p>
                    We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
                </p>

                <h3>Contact Us</h3>
                <p>
                    If you have any questions about this Privacy Policy, please contact us by email: contact@calculatorbear.com.
                </p>
            </div>
        </div>
    </div>
  );
};

export default PrivacyPolicyPage;