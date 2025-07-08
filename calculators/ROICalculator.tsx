
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

export const ROICalculator: React.FC = () => {
    const [initialInvestment, setInitialInvestment] = useState('10000');
    const [finalValue, setFinalValue] = useState('15000');

    const result = useMemo(() => {
        const initial = parseFloat(initialInvestment);
        const final = parseFloat(finalValue);

        if (isNaN(initial) || isNaN(final) || initial === 0) {
            return { roi: 0, netProfit: 0 };
        }

        const netProfit = final - initial;
        const roi = (netProfit / initial) * 100;

        return { roi, netProfit };
    }, [initialInvestment, finalValue]);
    
    const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

    return (
        <div className="space-y-6">
            <div className="p-6 rounded-lg bg-brand-light-gray">
                <p className="text-slate-500 text-lg text-center">Return on Investment (ROI)</p>
                <p className="text-5xl font-extrabold text-slate-900 tracking-tight text-center">
                    {result.roi.toFixed(2)}%
                </p>
                <div className="mt-4 pt-4 border-t border-slate-200 text-center">
                    <p className="text-sm text-slate-500">Net Profit</p>
                    <p className={`font-bold text-lg ${result.netProfit >= 0 ? 'text-slate-800' : 'text-red-600'}`}>
                        {formatCurrency(result.netProfit)}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-200">
                <InputField label="Initial Investment" id="initialInvestment" value={initialInvestment} onChange={e => setInitialInvestment(e.target.value)} unit="$" />
                <InputField label="Final Value of Investment" id="finalValue" value={finalValue} onChange={e => setFinalValue(e.target.value)} unit="$" />
            </div>
        </div>
    );
};