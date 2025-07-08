

import React, { useState, useMemo } from 'react';

const InputField = ({ label, id, value, onChange, unit }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-slate-700">{label}</label>
        <div className="mt-1 relative rounded-md">
            {unit === '$' && <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center"><span className="text-gray-500 sm:text-sm">$</span></div>}
            <input
                type="number"
                id={id}
                value={value}
                onChange={onChange}
                className={`w-full py-3 bg-brand-light-gray border-transparent focus:ring-2 focus:ring-slate-400 focus:outline-none rounded-md ${unit === '$' ? 'pl-7' : 'pl-4'}`}
                placeholder="0"
            />
        </div>
    </div>
);

export const CryptoDCACalculator: React.FC = () => {
    const [investmentAmount, setInvestmentAmount] = useState('100');
    const [pricesStr, setPricesStr] = useState('40000, 42000, 38000, 45000, 50000');

    const result = useMemo(() => {
        const regularInvestment = parseFloat(investmentAmount);
        const prices = pricesStr.split(',').map(p => parseFloat(p.trim())).filter(p => !isNaN(p) && p > 0);

        if (isNaN(regularInvestment) || regularInvestment <= 0 || prices.length === 0) {
            return { totalInvested: 0, totalTokens: 0, averageCost: 0, numberOfInvestments: 0 };
        }

        const numberOfInvestments = prices.length;
        const totalInvested = regularInvestment * numberOfInvestments;
        const totalTokens = prices.reduce((acc, price) => acc + (regularInvestment / price), 0);
        const averageCost = totalInvested / totalTokens;

        return {
            totalInvested,
            totalTokens,
            averageCost,
            numberOfInvestments,
        };

    }, [investmentAmount, pricesStr]);
    
    const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

    return (
        <div className="space-y-6">
            <div className="p-6 rounded-lg bg-brand-light-gray">
                <p className="text-slate-500 text-lg text-center">Average Cost Per Token</p>
                <p className="text-5xl font-extrabold text-slate-900 tracking-tight text-center">{formatCurrency(result.averageCost)}</p>
                <div className="mt-4 pt-4 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                    <div>
                        <p className="text-sm text-slate-500">Total Invested</p>
                        <p className="font-bold text-lg text-slate-800">{formatCurrency(result.totalInvested)}</p>
                    </div>
                    <div>
                        <p className="text-sm text-slate-500">Total Tokens Bought</p>
                        <p className="font-bold text-lg text-slate-800">{result.totalTokens.toFixed(6)}</p>
                    </div>
                     <div>
                        <p className="text-sm text-slate-500">Investments Made</p>
                        <p className="font-bold text-lg text-slate-800">{result.numberOfInvestments}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 pt-6 border-t border-slate-200">
                <InputField label="Investment Amount per Period" id="investmentAmount" value={investmentAmount} onChange={e => setInvestmentAmount(e.target.value)} unit="$" />
                <div>
                    <label htmlFor="prices" className="block text-sm font-medium text-slate-700">Asset Prices at Each Interval</label>
                    <input
                        type="text"
                        id="prices"
                        value={pricesStr}
                        onChange={e => setPricesStr(e.target.value)}
                        className="mt-1 w-full p-3 bg-brand-light-gray border-transparent focus:ring-2 focus:ring-slate-400 focus:outline-none rounded-md"
                        placeholder="e.g., 40000, 42000, 38000"
                    />
                    <p className="text-xs text-slate-500 mt-1">Enter prices separated by commas.</p>
                </div>
            </div>
        </div>
    );
};