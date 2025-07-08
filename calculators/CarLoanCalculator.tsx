

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

export const CarLoanCalculator: React.FC = () => {
    const [carPrice, setCarPrice] = useState('35000');
    const [downPayment, setDownPayment] = useState('5000');
    const [interestRate, setInterestRate] = useState('7.5');
    const [loanTerm, setLoanTerm] = useState('5');

    const result = useMemo(() => {
        const principal = parseFloat(carPrice) - (parseFloat(downPayment) || 0);
        const annualRate = parseFloat(interestRate);
        const years = parseInt(loanTerm);

        if (isNaN(principal) || isNaN(annualRate) || isNaN(years) || principal <= 0 || annualRate < 0 || years <= 0) {
            return { monthlyPayment: 0, totalPayment: 0, totalInterest: 0 };
        }

        const monthlyRate = annualRate / 100 / 12;
        const numberOfPayments = years * 12;
        
        if (monthlyRate === 0) {
            const monthlyPayment = principal / numberOfPayments;
            return { monthlyPayment, totalPayment: principal, totalInterest: 0 };
        }

        const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
        const totalPayment = monthlyPayment * numberOfPayments;
        const totalInterest = totalPayment - principal;

        return {
            monthlyPayment,
            totalPayment: totalPayment + (parseFloat(downPayment) || 0),
            totalInterest,
        };
    }, [carPrice, downPayment, interestRate, loanTerm]);

    const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

    return (
        <div className="space-y-6">
            <div className="p-6 rounded-lg bg-brand-light-gray">
                <p className="text-slate-500 text-lg text-center">Estimated Monthly Payment</p>
                <p className="text-5xl font-extrabold text-slate-900 tracking-tight text-center">{formatCurrency(result.monthlyPayment)}</p>
                <div className="mt-4 pt-4 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
                     <div>
                        <p className="text-sm text-slate-500">Total Cost of Car</p>
                        <p className="font-bold text-lg text-slate-800">{formatCurrency(result.totalPayment)}</p>
                    </div>
                    <div>
                        <p className="text-sm text-slate-500">Total Interest Paid</p>
                        <p className="font-bold text-lg text-red-600">{formatCurrency(result.totalInterest)}</p>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-200">
                <InputField label="Car Price" id="carPrice" value={carPrice} onChange={e => setCarPrice(e.target.value)} unit="$" />
                <InputField label="Down Payment (optional)" id="downPayment" value={downPayment} onChange={e => setDownPayment(e.target.value)} unit="$" />
                <InputField label="Interest Rate" id="interestRate" value={interestRate} onChange={e => setInterestRate(e.target.value)} unit="%" />
                <InputField label="Loan Term" id="loanTerm" value={loanTerm} onChange={e => setLoanTerm(e.target.value)} unit="years" />
            </div>
        </div>
    );
};