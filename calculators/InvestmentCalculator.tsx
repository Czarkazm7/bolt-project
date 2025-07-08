
import React, { useState, useMemo } from 'react';

const InputField = ({ label, id, value, onChange, type = 'number', unit, min = 0 }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-brand-dark">{label}</label>
        <div className="mt-1 relative rounded-md">
            {unit === '$' && <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center"><span className="text-gray-500 sm:text-sm">$</span></div>}
            <input
                type={type}
                id={id}
                value={value}
                onChange={onChange}
                className="w-full pl-7 pr-12 py-3 bg-brand-light-gray border-transparent focus:ring-2 focus:ring-brand-primary focus:outline-none rounded-md"
                placeholder="0.00"
                min={min}
            />
            {unit && unit !== '$' && <div className="pointer-events-none absolute inset-y-0 right-0 pr-3 flex items-center"><span className="text-gray-500 sm:text-sm">{unit}</span></div>}
        </div>
    </div>
);

export const CompoundInterestCalculator: React.FC = () => {
    const [initialInvestment, setInitialInvestment] = useState('10000');
    const [monthlyContribution, setMonthlyContribution] = useState('500');
    const [years, setYears] = useState('10');
    const [annualRate, setAnnualRate] = useState('8');

    const result = useMemo(() => {
        const P = parseFloat(initialInvestment) || 0;
        const PMT = parseFloat(monthlyContribution) || 0;
        const t = parseInt(years) || 0;
        const r = parseFloat(annualRate) / 100 || 0;

        if (t <= 0) {
            return { futureValue: P, totalInvested: P, totalInterest: 0 };
        }
        
        const n = 12; // Compounded monthly
        const nt = n * t;
        
        // Future value of initial investment
        const fvOfP = P * Math.pow(1 + r/n, nt);
        
        // Future value of a series (monthly contributions)
        const fvOfPmt = PMT * ((Math.pow(1 + r/n, nt) - 1) / (r/n));

        const futureValue = fvOfP + fvOfPmt;
        const totalInvested = P + (PMT * nt);
        const totalInterest = futureValue - totalInvested;

        return {
            futureValue: futureValue > 0 ? futureValue : 0,
            totalInvested: totalInvested > 0 ? totalInvested : 0,
            totalInterest: totalInterest > 0 ? totalInterest : 0
        };
    }, [initialInvestment, monthlyContribution, years, annualRate]);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    };

    return (
        <div className="space-y-6">
            <div className="text-center p-6 bg-brand-light-gray rounded-lg">
                <p className="text-brand-muted text-lg">Projected Future Value</p>
                <p className="text-5xl font-extrabold text-brand-dark tracking-tight">{formatCurrency(result.futureValue)}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div>
                    <p className="text-sm font-medium text-brand-muted">Total Invested</p>
                    <p className="text-lg font-bold text-brand-dark">{formatCurrency(result.totalInvested)}</p>
                </div>
                <div>
                    <p className="text-sm font-medium text-brand-muted">Total Interest</p>
                    <p className="text-lg font-bold text-brand-dark">{formatCurrency(result.totalInterest)}</p>
                </div>
                <div>
                    <p className="text-sm font-medium text-brand-muted">End Balance</p>
                    <p className="text-lg font-bold text-brand-dark">{formatCurrency(result.futureValue)}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-200">
                <InputField label="Initial Investment" id="initialInvestment" value={initialInvestment} onChange={(e) => setInitialInvestment(e.target.value)} unit="$" />
                <InputField label="Monthly Contribution" id="monthlyContribution" value={monthlyContribution} onChange={(e) => setMonthlyContribution(e.target.value)} unit="$" />
                <InputField label="Length of Time" id="years" value={years} onChange={(e) => setYears(e.target.value)} unit="years" />
                <InputField label="Estimated Annual Rate" id="annualRate" value={annualRate} onChange={(e) => setAnnualRate(e.target.value)} unit="%" />
            </div>
        </div>
    );
};