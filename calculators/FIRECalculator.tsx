

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
                className={`w-full py-3 bg-brand-light-gray border-transparent focus:ring-2 focus:ring-slate-400 focus:outline-none rounded-md ${unit === '$' ? 'pl-7' : 'pl-4'} ${unit && unit !== '$' ? 'pr-12' : 'pr-4'}`}
                placeholder="0"
            />
             {unit && unit !== '$' && <div className="pointer-events-none absolute inset-y-0 right-0 pr-3 flex items-center"><span className="text-gray-500 sm:text-sm">{unit}</span></div>}
        </div>
    </div>
);

export const FIRECalculator: React.FC = () => {
    const [annualIncome, setAnnualIncome] = useState('80000');
    const [annualExpenses, setAnnualExpenses] = useState('40000');
    const [currentSavings, setCurrentSavings] = useState('100000');
    const [annualReturn, setAnnualReturn] = useState('7');

    const result = useMemo(() => {
        const p_annualExpenses = parseFloat(annualExpenses);
        const p_annualIncome = parseFloat(annualIncome);
        const pv = parseFloat(currentSavings);
        const r = parseFloat(annualReturn) / 100;
        
        if (isNaN(p_annualExpenses) || isNaN(p_annualIncome) || isNaN(pv) || isNaN(r) || p_annualExpenses <= 0) {
            return { fireNumber: 0, yearsToFire: Infinity };
        }
        
        const fireNumber = p_annualExpenses * 25;
        const pmt = p_annualIncome - p_annualExpenses; // Annual savings

        if (pmt <= 0) {
            return { fireNumber, yearsToFire: Infinity };
        }
        
        if (r === 0) {
            const years = (fireNumber - pv) / pmt;
            return { fireNumber, yearsToFire: years > 0 ? years : 0 };
        }

        // Using NPER formula logic: NPER(rate, pmt, pv, fv)
        const fv = -fireNumber;
        const rate = r;
        
        // Years = log((pmt - fv*rate) / (pmt + pv*rate)) / log(1+rate)
        const yearsToFire = Math.log((pmt - fv * rate) / (pmt + pv * rate)) / Math.log(1 + rate);

        return { fireNumber, yearsToFire: yearsToFire > 0 ? yearsToFire : 0 };

    }, [annualIncome, annualExpenses, currentSavings, annualReturn]);

    const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

    return (
        <div className="space-y-6">
            <div className="p-6 rounded-lg bg-brand-light-gray grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-center">
                    <p className="text-slate-500 text-lg">Your FIRE Number</p>
                    <p className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">{formatCurrency(result.fireNumber)}</p>
                </div>
                <div className="text-center">
                    <p className="text-slate-500 text-lg">Years to FIRE</p>
                    <p className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                        {isFinite(result.yearsToFire) ? result.yearsToFire.toFixed(1) : '∞'}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-200">
                <InputField label="Annual Income (After Tax)" id="annualIncome" value={annualIncome} onChange={e => setAnnualIncome(e.target.value)} unit="$" />
                <InputField label="Annual Expenses" id="annualExpenses" value={annualExpenses} onChange={e => setAnnualExpenses(e.target.value)} unit="$" />
                <InputField label="Current Savings / Investments" id="currentSavings" value={currentSavings} onChange={e => setCurrentSavings(e.target.value)} unit="$" />
                <InputField label="Expected Annual Return" id="annualReturn" value={annualReturn} onChange={e => setAnnualReturn(e.target.value)} unit="%" />
            </div>
        </div>
    );
};