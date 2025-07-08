

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

export const SalesTaxCalculator: React.FC = () => {
    const [amount, setAmount] = useState('100');
    const [taxRate, setTaxRate] = useState('8.5');
    const [operation, setOperation] = useState('add');

    const result = useMemo(() => {
        const p_amount = parseFloat(amount);
        const p_taxRate = parseFloat(taxRate) / 100;
        
        if (isNaN(p_amount) || isNaN(p_taxRate)) return { finalAmount: 0, taxAmount: 0 };
        
        let finalAmount, taxAmount;
        if (operation === 'add') {
            taxAmount = p_amount * p_taxRate;
            finalAmount = p_amount + taxAmount;
        } else { // subtract
            finalAmount = p_amount / (1 + p_taxRate);
            taxAmount = p_amount - finalAmount;
        }
        
        return { finalAmount, taxAmount };
    }, [amount, taxRate, operation]);

    const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

    return (
        <div className="space-y-6">
            <div className="p-6 rounded-lg bg-brand-light-gray text-center">
                <p className="text-slate-500 text-lg">
                    {operation === 'add' ? 'Total Amount' : 'Price Before Tax'}
                </p>
                <p className="text-5xl font-extrabold text-slate-900 tracking-tight">
                    {formatCurrency(operation === 'add' ? result.finalAmount : result.finalAmount)}
                </p>
                <div className="mt-4 pt-4 border-t border-slate-200 text-center">
                    <p className="text-sm text-slate-500">Tax Amount</p>
                    <p className="font-bold text-lg text-slate-800">
                         {formatCurrency(result.taxAmount)}
                    </p>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-slate-200">
                <InputField label={operation === 'add' ? 'Price Before Tax' : 'Total Price'} value={amount} onChange={e => setAmount(e.target.value)} unit="$" />
                <InputField label="Tax Rate" value={taxRate} onChange={e => setTaxRate(e.target.value)} unit="%" />
            </div>

            <div className="flex justify-center bg-slate-100 p-1 rounded-full">
                <button onClick={() => setOperation('add')} className={`w-1/2 py-2 text-sm font-semibold rounded-full transition-colors ${operation === 'add' ? 'bg-white shadow text-slate-800' : 'text-slate-500'}`}>Add Tax</button>
                <button onClick={() => setOperation('subtract')} className={`w-1/2 py-2 text-sm font-semibold rounded-full transition-colors ${operation === 'subtract' ? 'bg-white shadow text-slate-800' : 'text-slate-500'}`}>Subtract Tax</button>
            </div>
        </div>
    );
};
