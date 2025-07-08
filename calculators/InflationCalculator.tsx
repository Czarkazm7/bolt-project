

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

// Simplified Annual Average CPI data for demonstration. A real app would use a more extensive and updated list.
const CPI_DATA = {
    2010: 218.056, 2011: 224.939, 2012: 229.594, 2013: 232.957, 2014: 236.736,
    2015: 237.017, 2016: 240.007, 2017: 245.120, 2018: 251.107, 2019: 255.657,
    2020: 258.811, 2021: 270.970, 2022: 292.655, 2023: 304.702,
};
const availableYears = Object.keys(CPI_DATA);

export const InflationCalculator: React.FC = () => {
    const [amount, setAmount] = useState('100');
    const [startYear, setStartYear] = useState('2010');
    const [endYear, setEndYear] = useState('2023');

    const result = useMemo(() => {
        const p_amount = parseFloat(amount);
        const cpiStart = CPI_DATA[startYear];
        const cpiEnd = CPI_DATA[endYear];

        if (isNaN(p_amount) || !cpiStart || !cpiEnd) {
            return { adjustedValue: 0, totalInflation: 0 };
        }
        
        const adjustedValue = p_amount * (cpiEnd / cpiStart);
        const totalInflation = ((cpiEnd - cpiStart) / cpiStart) * 100;

        return { adjustedValue, totalInflation };
    }, [amount, startYear, endYear]);

    const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

    return (
        <div className="space-y-6">
            <div className="p-6 rounded-lg bg-brand-light-gray">
                <p className="text-slate-500 text-lg text-center">
                    {formatCurrency(parseFloat(amount))} in {startYear} is worth
                </p>
                <p className="text-5xl font-extrabold text-slate-900 tracking-tight text-center">
                    {formatCurrency(result.adjustedValue)}
                </p>
                <p className="text-slate-500 text-lg text-center">in {endYear} dollars.</p>
                <div className="mt-4 pt-4 border-t border-slate-200 text-center">
                    <p className="text-sm text-slate-500">Total Inflation</p>
                    <p className="font-bold text-lg text-slate-800">{result.totalInflation.toFixed(2)}%</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-200">
                <InputField label="Amount" id="amount" value={amount} onChange={e => setAmount(e.target.value)} unit="$" />
                <div>
                    <label htmlFor="startYear" className="block text-sm font-medium text-slate-700">Start Year</label>
                    <select id="startYear" value={startYear} onChange={e => setStartYear(e.target.value)} className="mt-1 w-full p-3 bg-brand-light-gray border-transparent focus:ring-2 focus:ring-slate-400 focus:outline-none rounded-md">
                        {availableYears.map(year => <option key={year} value={year}>{year}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="endYear" className="block text-sm font-medium text-slate-700">End Year</label>
                    <select id="endYear" value={endYear} onChange={e => setEndYear(e.target.value)} className="mt-1 w-full p-3 bg-brand-light-gray border-transparent focus:ring-2 focus:ring-slate-400 focus:outline-none rounded-md">
                        {availableYears.map(year => <option key={year} value={year}>{year}</option>)}
                    </select>
                </div>
            </div>
        </div>
    );
};