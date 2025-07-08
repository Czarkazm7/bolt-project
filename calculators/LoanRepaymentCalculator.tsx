
import React, { useState, useMemo } from 'react';

const InputField = ({ label, id, value, onChange, type = 'number', unit, min = 0 }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-brand-dark">{label}</label>
        <div className="mt-1 relative rounded-md">
            {unit === '$' && <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center"><span className="text-gray-500 sm:text-sm">$</span></div>}
            <input
                type={type}
                id={id}
                value={value}
                onChange={onChange}
                className="w-full pl-7 pr-12 py-3 bg-brand-light-gray border-transparent focus:ring-2 focus:ring-brand-primary focus:outline-none rounded-md"
                placeholder="0.00"
                min={min}
            />
            {unit && unit !== '$' && <div className="pointer-events-none absolute inset-y-0 right-0 pr-3 flex items-center"><span className="text-gray-500 sm:text-sm">{unit}</span></div>}
        </div>
    </div>
);

export const LoanRepaymentCalculator: React.FC = () => {
    const [loanAmount, setLoanAmount] = useState('25000');
    const [interestRate, setInterestRate] = useState('7.5');
    const [loanTerm, setLoanTerm] = useState('5');

    const result = useMemo(() => {
        const principal = parseFloat(loanAmount);
        const annualRate = parseFloat(interestRate);
        const years = parseInt(loanTerm);

        if (isNaN(principal) || isNaN(annualRate) || isNaN(years) || principal <= 0 || annualRate < 0 || years <= 0) {
            return { monthlyPayment: 0, totalPayment: 0, totalInterest: 0 };
        }

        const monthlyRate = annualRate / 100 / 12;
        const numberOfPayments = years * 12;
        
        if(monthlyRate === 0) {
            const monthlyPayment = principal / numberOfPayments;
            return { monthlyPayment, totalPayment: principal, totalInterest: 0 };
        }

        const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
        const totalPayment = monthlyPayment * numberOfPayments;
        const totalInterest = totalPayment - principal;

        return {
            monthlyPayment: monthlyPayment > 0 ? monthlyPayment : 0,
            totalPayment: totalPayment > 0 ? totalPayment : 0,
            totalInterest: totalInterest > 0 ? totalInterest : 0
        };
    }, [loanAmount, interestRate, loanTerm]);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    };

    return (
        <div className="space-y-6">
            <div className="text-center bg-brand-light-gray p-6 rounded-lg">
                <p className="text-brand-muted text-lg">Monthly Payment</p>
                <p className="text-5xl font-extrabold text-brand-dark tracking-tight">{formatCurrency(result.monthlyPayment)}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
                <div>
                    <p className="text-sm font-medium text-brand-muted">Total Payment</p>
                    <p className="text-lg font-bold text-brand-dark">{formatCurrency(result.totalPayment)}</p>
                </div>
                <div>
                    <p className="text-sm font-medium text-brand-muted">Total Interest</p>
                    <p className="text-lg font-bold text-red-600">{formatCurrency(result.totalInterest)}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-200">
                <InputField label="Loan Amount" id="loanAmount" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} unit="$" />
                <InputField label="Interest Rate" id="interestRate" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} unit="%" />
                <InputField label="Loan Term" id="loanTerm" value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} unit="years" />
            </div>
        </div>
    );
};