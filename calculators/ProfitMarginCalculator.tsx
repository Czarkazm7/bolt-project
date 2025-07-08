

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

export const ProfitMarginCalculator: React.FC = () => {
    const [revenue, setRevenue] = useState('500000');
    const [cogs, setCogs] = useState('300000');

    const result = useMemo(() => {
        const p_revenue = parseFloat(revenue);
        const p_cogs = parseFloat(cogs);

        if (isNaN(p_revenue) || isNaN(p_cogs) || p_revenue === 0) {
            return { grossProfit: 0, margin: 0 };
        }
        
        const grossProfit = p_revenue - p_cogs;
        const margin = (grossProfit / p_revenue) * 100;
        
        return { grossProfit, margin };
    }, [revenue, cogs]);

    const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

    return (
        <div className="space-y-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-brand-light-gray text-center">
                    <p className="text-slate-500 text-lg">Gross Profit Margin</p>
                    <p className="text-4xl font-extrabold text-slate-900">{result.margin.toFixed(2)}%</p>
                </div>
                 <div className="p-4 rounded-lg bg-brand-light-gray text-center">
                    <p className="text-slate-500 text-lg">Gross Profit</p>
                    <p className="text-4xl font-extrabold text-slate-900">{formatCurrency(result.grossProfit)}</p>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-slate-200">
                <InputField label="Revenue" value={revenue} onChange={e => setRevenue(e.target.value)} unit="$" />
                <InputField label="Cost of Goods Sold (COGS)" value={cogs} onChange={e => setCogs(e.target.value)} unit="$" />
            </div>
        </div>
    );
};
