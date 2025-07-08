
import React, { useState, useMemo } from 'react';

const InputField = ({ label, id, value, onChange, type = 'number', unit }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-slate-700">{label}</label>
        <div className="mt-1 relative rounded-md">
            {unit === '$' && <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center"><span className="text-gray-500 sm:text-sm">$</span></div>}
            <input
                type={type}
                id={id}
                value={value}
                onChange={onChange}
                className={`w-full py-3 bg-brand-light-gray border-transparent focus:ring-2 focus:ring-slate-400 focus:outline-none rounded-md ${unit === '$' ? 'pl-7' : 'pl-4'} ${unit && unit !== '$' ? 'pr-12' : 'pr-4'}`}
                placeholder="0"
            />
            {unit && unit !== '$' && <div className="pointer-events-none absolute inset-y-0 right-0 pr-3 flex items-center"><span className="text-gray-500 sm:text-sm">{unit}</span></div>}
        </div>
    </div>
);

export const RetirementSavingsCalculator: React.FC = () => {
    const [currentAge, setCurrentAge] = useState('30');
    const [retirementAge, setRetirementAge] = useState('65');
    const [currentSavings, setCurrentSavings] = useState('50000');
    const [monthlyContribution, setMonthlyContribution] = useState('500');
    const [annualRate, setAnnualRate] = useState('7');

    const result = useMemo(() => {
        const p_currentAge = parseInt(currentAge);
        const p_retirementAge = parseInt(retirementAge);
        const pv = parseFloat(currentSavings);
        const pmt = parseFloat(monthlyContribution);
        const r = parseFloat(annualRate) / 100;

        if (isNaN(p_currentAge) || isNaN(p_retirementAge) || isNaN(pv) || isNaN(pmt) || isNaN(r) || p_retirementAge <= p_currentAge) {
            return { projectedSavings: 0, totalContribution: 0, totalInterest: 0 };
        }

        const yearsToRetire = p_retirementAge - p_currentAge;
        const n = 12;
        const t = yearsToRetire;
        const ratePerPeriod = r / n;
        const numberOfPeriods = n * t;

        const fvOfPV = pv * Math.pow(1 + ratePerPeriod, numberOfPeriods);
        const fvOfPMT = pmt * ((Math.pow(1 + ratePerPeriod, numberOfPeriods) - 1) / ratePerPeriod);
        
        const projectedSavings = fvOfPV + fvOfPMT;
        const totalContribution = pv + (pmt * numberOfPeriods);
        const totalInterest = projectedSavings - totalContribution;

        return { projectedSavings, totalContribution, totalInterest };
    }, [currentAge, retirementAge, currentSavings, monthlyContribution, annualRate]);

    const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

    return (
        <div className="space-y-6">
            <div className="p-6 rounded-lg bg-brand-light-gray">
                <p className="text-slate-500 text-lg text-center">Projected Savings at Retirement</p>
                <p className="text-5xl font-extrabold text-slate-900 tracking-tight text-center">{formatCurrency(result.projectedSavings)}</p>
                <div className="mt-4 pt-4 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
                    <div>
                        <p className="text-sm text-slate-500">Total Contributions</p>
                        <p className="font-bold text-lg text-slate-800">{formatCurrency(result.totalContribution)}</p>
                    </div>
                    <div>
                        <p className="text-sm text-slate-500">Total Interest Earned</p>
                        <p className="font-bold text-lg text-slate-800">{formatCurrency(result.totalInterest)}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-200">
                <InputField label="Current Age" id="currentAge" value={currentAge} onChange={e => setCurrentAge(e.target.value)} unit="years" />
                <InputField label="Retirement Age" id="retirementAge" value={retirementAge} onChange={e => setRetirementAge(e.target.value)} unit="years" />
                <InputField label="Current Retirement Savings" id="currentSavings" value={currentSavings} onChange={e => setCurrentSavings(e.target.value)} unit="$" />
                <InputField label="Monthly Contribution" id="monthlyContribution" value={monthlyContribution} onChange={e => setMonthlyContribution(e.target.value)} unit="$" />
                <InputField label="Annual Rate of Return" id="annualRate" value={annualRate} onChange={e => setAnnualRate(e.target.value)} unit="%" />
            </div>
        </div>
    );
};