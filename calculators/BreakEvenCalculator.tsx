

import React, { useState, useMemo } from 'react';

const InputField = ({ label, value, onChange, unit }) => (
    <div>
        <label className="block text-sm font-medium text-slate-700">{label}</label>
        <div className="mt-1 relative rounded-md">
            {unit === '$' && <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center"><span className="text-gray-500 sm:text-sm">$</span></div>}
            <input type="number" value={value} onChange={onChange} className={`w-full p-3 bg-brand-light-gray border-transparent focus:ring-2 focus:ring-slate-400 focus:outline-none rounded-md ${unit === '$' ? 'pl-7' : ''}`} placeholder="0" />
        </div>
    </div>
);

export const BreakEvenCalculator: React.FC = () => {
    const [fixedCosts, setFixedCosts] = useState('10000');
    const [variableCost, setVariableCost] = useState('20');
    const [pricePerUnit, setPricePerUnit] = useState('50');

    const result = useMemo(() => {
        const fc = parseFloat(fixedCosts);
        const vc = parseFloat(variableCost);
        const ppu = parseFloat(pricePerUnit);

        if (isNaN(fc) || isNaN(vc) || isNaN(ppu) || ppu <= vc) {
            return { units: 0, revenue: 0 };
        }
        
        const units = fc / (ppu - vc);
        const revenue = units * ppu;
        
        return { units, revenue };
    }, [fixedCosts, variableCost, pricePerUnit]);

    const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-brand-light-gray text-center">
                    <p className="text-slate-500 text-lg">Break-Even Units</p>
                    <p className="text-4xl font-extrabold text-slate-900">{Math.ceil(result.units).toLocaleString()}</p>
                </div>
                 <div className="p-4 rounded-lg bg-brand-light-gray text-center">
                    <p className="text-slate-500 text-lg">Break-Even Revenue</p>
                    <p className="text-4xl font-extrabold text-slate-900">{formatCurrency(result.revenue)}</p>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-slate-200">
                <InputField label="Total Fixed Costs" value={fixedCosts} onChange={e => setFixedCosts(e.target.value)} unit="$" />
                <InputField label="Variable Cost Per Unit" value={variableCost} onChange={e => setVariableCost(e.target.value)} unit="$" />
                <InputField label="Sale Price Per Unit" value={pricePerUnit} onChange={e => setPricePerUnit(e.target.value)} unit="$" />
            </div>
        </div>
    );
};
