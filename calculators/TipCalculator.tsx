

import React, { useState, useMemo } from 'react';

const InputField = ({ label, value, onChange, unit }) => (
    <div>
        <label className="block text-sm font-medium text-slate-700">{label}</label>
        <div className="mt-1 relative rounded-md">
            {unit === '$' && <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center"><span className="text-gray-500 sm:text-sm">$</span></div>}
            <input type="number" value={value} onChange={onChange} className={`w-full p-3 bg-brand-light-gray border-transparent focus:ring-2 focus:ring-slate-400 focus:outline-none rounded-md ${unit === '$' ? 'pl-7' : 'pl-4'} ${unit && unit !== '$' ? 'pr-12' : 'pr-4'}`} placeholder="0" />
             {unit && unit !== '$' && <div className="pointer-events-none absolute inset-y-0 right-0 pr-3 flex items-center"><span className="text-gray-500 sm:text-sm">{unit}</span></div>}
        </div>
    </div>
);

export const TipCalculator: React.FC = () => {
    const [bill, setBill] = useState('50');
    const [tipPercent, setTipPercent] = useState('18');
    const [people, setPeople] = useState('1');

    const result = useMemo(() => {
        const p_bill = parseFloat(bill);
        const p_tip = parseFloat(tipPercent) / 100;
        const p_people = parseInt(people);
        
        if (isNaN(p_bill) || isNaN(p_tip) || isNaN(p_people) || p_bill < 0 || p_tip < 0 || p_people <= 0) {
            return { tipAmount: 0, total: 0, perPerson: 0 };
        }
        
        const tipAmount = p_bill * p_tip;
        const total = p_bill + tipAmount;
        const perPerson = total / p_people;
        
        return { tipAmount, total, perPerson };
    }, [bill, tipPercent, people]);

    const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

    return (
        <div className="space-y-6">
            <div className="p-6 rounded-lg bg-brand-light-gray text-center">
                <p className="text-slate-500 text-lg">Amount Per Person</p>
                <p className="text-5xl font-extrabold text-slate-900">{formatCurrency(result.perPerson)}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                <div className="p-4 rounded-lg bg-slate-100">
                    <p className="text-sm text-slate-500">Tip Amount</p>
                    <p className="font-bold text-lg">{formatCurrency(result.tipAmount)}</p>
                </div>
                 <div className="p-4 rounded-lg bg-slate-100">
                    <p className="text-sm text-slate-500">Total Bill</p>
                    <p className="font-bold text-lg">{formatCurrency(result.total)}</p>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-slate-200">
                <InputField label="Bill Amount" value={bill} onChange={e => setBill(e.target.value)} unit="$" />
                <InputField label="Tip Percentage" value={tipPercent} onChange={e => setTipPercent(e.target.value)} unit="%" />
                <InputField label="Number of People" value={people} onChange={e => setPeople(e.target.value)} unit="" />
            </div>
        </div>
    );
};
