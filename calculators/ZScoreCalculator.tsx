
import React, { useState, useMemo } from 'react';

const InputField = ({ label, id, value, onChange, placeholder = "0" }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-brand-dark">{label}</label>
        <div className="mt-1 relative rounded-md">
            <input
                type="number"
                id={id}
                value={value}
                onChange={onChange}
                className="w-full pl-4 pr-4 py-3 bg-brand-light-gray border-transparent focus:ring-2 focus:ring-brand-primary focus:outline-none rounded-md"
                placeholder={placeholder}
            />
        </div>
    </div>
);

export const ZScoreCalculator: React.FC = () => {
    const [rawScore, setRawScore] = useState('80');
    const [mean, setMean] = useState('70');
    const [stdDev, setStdDev] = useState('5');

    const zScore = useMemo(() => {
        const x = parseFloat(rawScore);
        const mu = parseFloat(mean);
        const sigma = parseFloat(stdDev);

        if (isNaN(x) || isNaN(mu) || isNaN(sigma) || sigma === 0) {
            return '—';
        }

        const score = (x - mu) / sigma;
        return score.toFixed(4);
    }, [rawScore, mean, stdDev]);

    return (
        <div className="space-y-6">
            <div className="p-6 rounded-lg bg-brand-light-gray text-center">
                <p className="text-brand-muted text-lg">Z-Score</p>
                <p className="text-5xl font-extrabold text-brand-dark tracking-tight">
                    {zScore}
                </p>
                <p className="text-brand-muted text-md mt-1">
                    {zScore !== '—' ? `${zScore} standard deviations from the mean` : ''}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-200">
                <InputField 
                    label="Raw Score (X)" 
                    id="rawScore" 
                    value={rawScore} 
                    onChange={(e) => setRawScore(e.target.value)} 
                />
                <InputField 
                    label="Population Mean (μ)" 
                    id="mean" 
                    value={mean} 
                    onChange={(e) => setMean(e.target.value)}
                />
                <InputField 
                    label="Population Standard Deviation (σ)" 
                    id="stdDev" 
                    value={stdDev} 
                    onChange={(e) => setStdDev(e.target.value)}
                />
            </div>
        </div>
    );
};
