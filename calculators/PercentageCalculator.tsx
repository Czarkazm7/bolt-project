

import React, { useState, useMemo } from 'react';

const InputField = ({ value, onChange }) => (
    <input type="number" value={value} onChange={onChange} className="w-full p-3 bg-brand-light-gray border-transparent focus:ring-2 focus:ring-slate-400 focus:outline-none rounded-md" placeholder="0" />
);

export const PercentageCalculator: React.FC = () => {
    const [valA, setValA] = useState('15');
    const [valB, setValB] = useState('100');
    
    const result1 = useMemo(() => (parseFloat(valA) / 100) * parseFloat(valB), [valA, valB]);
    const result2 = useMemo(() => (parseFloat(valA) / parseFloat(valB)) * 100, [valA, valB]);
    const result3 = useMemo(() => ((parseFloat(valB) - parseFloat(valA)) / parseFloat(valA)) * 100, [valA, valB]);
    
    const displayResult = (res) => isNaN(res) || !isFinite(res) ? "—" : res.toLocaleString(undefined, {maximumFractionDigits: 4});
    
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
                <InputField value={valA} onChange={e => setValA(e.target.value)} />
                <InputField value={valB} onChange={e => setValB(e.target.value)} />
            </div>

            <div className="space-y-3 pt-6 border-t border-slate-200">
                <div className="p-4 bg-brand-light-gray rounded-lg flex items-center justify-between">
                    <p className="text-slate-600">What is {valA || 'X'}% of {valB || 'Y'}?</p>
                    <p className="text-xl font-bold text-slate-900">{displayResult(result1)}</p>
                </div>
                <div className="p-4 bg-brand-light-gray rounded-lg flex items-center justify-between">
                    <p className="text-slate-600">{valA || 'X'} is what percent of {valB || 'Y'}?</p>
                    <p className="text-xl font-bold text-slate-900">{displayResult(result2)}%</p>
                </div>
                 <div className="p-4 bg-brand-light-gray rounded-lg flex items-center justify-between">
                    <p className="text-slate-600">% change from {valA || 'X'} to {valB || 'Y'}?</p>
                    <p className="text-xl font-bold text-slate-900">{displayResult(result3)}%</p>
                </div>
            </div>
        </div>
    );
};
