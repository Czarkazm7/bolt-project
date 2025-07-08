import React, { useState } from 'react';
import { SparklesIcon, XIcon, CalculatorIcon } from './icons';

const FloatingCalculatorWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [result, setResult] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const toggleWidget = () => {
        setIsOpen(!isOpen);
        if (isOpen) {
            // Reset state on close
            setQuery('');
            setResult(null);
            setError(null);
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setIsLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await fetch('/.netlify/functions/ai-calculator', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'The server returned an error.');
            }

            const data = await response.json();
            setResult(data.result);
        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : 'An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={toggleWidget}
                className="fixed bottom-8 right-8 bg-brand-primary text-white p-4 rounded-full shadow-lg hover:bg-brand-primary-hover transition-all duration-300 transform hover:scale-110 z-50"
                aria-label="Open AI Calculator"
            >
                <SparklesIcon className="h-7 w-7" />
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-[99] flex items-center justify-center p-4" onClick={toggleWidget}>
                    <div 
                        className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto p-6 transform transition-all duration-300 scale-100"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center gap-2">
                                <CalculatorIcon className="h-6 w-6 text-slate-500"/>
                                <h2 className="text-xl font-bold text-brand-dark">Quick AI Calc</h2>
                            </div>
                            <button onClick={toggleWidget} className="text-slate-400 hover:text-slate-600">
                                <XIcon className="h-6 w-6" />
                            </button>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="e.g., 15% of 300, or $500/month for 2 years"
                                className="w-full p-3 bg-brand-light-gray border-transparent focus:ring-2 focus:ring-brand-primary focus:outline-none rounded-md text-lg"
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-brand-primary text-white rounded-md font-semibold hover:bg-brand-primary-hover transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed"
                                disabled={isLoading || !query.trim()}
                            >
                                {isLoading ? 'Calculating...' : 'Calculate'}
                            </button>
                        </form>

                        {(result || error || isLoading) && (
                            <div className="mt-6 pt-6 border-t border-slate-200">
                                {isLoading && <div className="text-center text-brand-muted">Thinking...</div>}
                                {error && <div className="p-4 bg-red-100 text-red-700 rounded-md text-center">{error}</div>}
                                {result && (
                                    <div className="p-4 bg-brand-light-gray rounded-lg text-center">
                                        <p className="text-brand-muted text-sm">Result</p>
                                        <p className="text-3xl font-bold text-brand-dark break-words">{result}</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default FloatingCalculatorWidget;