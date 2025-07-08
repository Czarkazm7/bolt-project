

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

export const CreditCardPayoffCalculator: React.FC = () => {
    const [balance, setBalance] = useState('10000');
    const [apr, setApr] = useState('19.99');
    const [monthlyPayment, setMonthlyPayment] = useState('300');

    const result = useMemo(() => {
        const pv = parseFloat(balance);
        const rate = parseFloat(apr) / 100 / 12;
        const pmt = parseFloat(monthlyPayment);

        if (isNaN(pv) || isNaN(rate) || isNaN(pmt) || pv <= 0 || pmt <= 0) {
            return { monthsToPayoff: 0, totalInterest: 0, payoffDate: '' };
        }
        
        if (pmt <= pv * rate) {
            return { monthsToPayoff: Infinity, totalInterest: Infinity, payoffDate: 'Never at this rate' };
        }
        
        // NPER formula: N = -log(1 - (PV * r / PMT)) / log(1 + r)
        const monthsToPayoff = -Math.log(1 - (pv * rate / pmt)) / Math.log(1 + rate);
        const totalPaid = pmt * monthsToPayoff;
        const totalInterest = totalPaid - pv;
        
        const payoffDate = new Date();
        payoffDate.setMonth(payoffDate.getMonth() + Math.ceil(monthsToPayoff));

        return { 
            monthsToPayoff: Math.ceil(monthsToPayoff), 
            totalInterest, 
            payoffDate: payoffDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
        };
    }, [balance, apr, monthlyPayment]);

    const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

    return (
        <div className="space-y-6">
             <div className="p-6 rounded-lg bg-brand-light-gray">
                <p className="text-slate-500 text-lg text-center">Time to Pay Off</p>
                <p className="text-5xl font-extrabold text-slate-900 tracking-tight text-center">
                    {isFinite(result.monthsToPayoff) ? `${result.monthsToPayoff} months` : '∞'}
                </p>
                <p className="text-center text-slate-500 font-medium mt-1">{result.payoffDate}</p>
                <div className="mt-4 pt-4 border-t border-slate-200 text-center">
                    <p className="text-sm text-slate-500">Total Interest Paid</p>
                    <p className="font-bold text-lg text-red-600">
                         {isFinite(result.totalInterest) ? formatCurrency(result.totalInterest) : 'Not paying down principal'}
                    </p>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-200">
                <InputField label="Credit Card Balance" id="balance" value={balance} onChange={e => setBalance(e.target.value)} unit="$" />
                <InputField label="Annual Percentage Rate (APR)" id="apr" value={apr} onChange={e => setApr(e.target.value)} unit="%" />
                <InputField label="Monthly Payment" id="monthlyPayment" value={monthlyPayment} onChange={e => setMonthlyPayment(e.target.value)} unit="$" />
            </div>
        </div>
    );
};