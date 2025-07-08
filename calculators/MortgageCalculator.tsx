
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

export const MortgageCalculator: React.FC = () => {
    const [loanAmount, setLoanAmount] = useState('300000');
    const [interestRate, setInterestRate] = useState('6.5');
    const [loanTerm, setLoanTerm] = useState('30');
    const [propertyTaxes, setPropertyTaxes] = useState('4000');
    const [homeInsurance, setHomeInsurance] = useState('1500');

    const result = useMemo(() => {
        const principal = parseFloat(loanAmount);
        const annualRate = parseFloat(interestRate);
        const years = parseInt(loanTerm);
        const annualTaxes = parseFloat(propertyTaxes) || 0;
        const annualInsurance = parseFloat(homeInsurance) || 0;

        if (isNaN(principal) || isNaN(annualRate) || isNaN(years) || principal <= 0 || annualRate <= 0 || years <= 0) {
            return { total: 0, principalAndInterest: 0, taxes: 0, insurance: 0 };
        }

        const monthlyRate = annualRate / 100 / 12;
        const numberOfPayments = years * 12;
        
        const pAndI = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
        const monthlyTaxes = annualTaxes / 12;
        const monthlyInsurance = annualInsurance / 12;
        const total = pAndI + monthlyTaxes + monthlyInsurance;

        return {
            total: total > 0 ? total : 0,
            principalAndInterest: pAndI > 0 ? pAndI : 0,
            taxes: monthlyTaxes > 0 ? monthlyTaxes : 0,
            insurance: monthlyInsurance > 0 ? monthlyInsurance : 0
        };
    }, [loanAmount, interestRate, loanTerm, propertyTaxes, homeInsurance]);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    };

    return (
        <div className="space-y-6">
            <div className="p-6 rounded-lg bg-brand-light-gray">
                <p className="text-brand-muted text-lg text-center">Estimated Monthly Payment</p>
                <p className="text-5xl font-extrabold text-brand-dark tracking-tight text-center">{formatCurrency(result.total)}</p>
                
                <div className="mt-4 pt-4 border-t border-slate-200 space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-brand-muted">Principal & Interest</span>
                        <span className="font-semibold text-brand-dark">{formatCurrency(result.principalAndInterest)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-brand-muted">Property Taxes</span>
                        <span className="font-semibold text-brand-dark">{formatCurrency(result.taxes)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-brand-muted">Home Insurance</span>
                        <span className="font-semibold text-brand-dark">{formatCurrency(result.insurance)}</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Home Price" id="loanAmount" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} unit="$" />
                <InputField label="Interest Rate" id="interestRate" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} unit="%" />
                <InputField label="Loan Term" id="loanTerm" value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} unit="years" />
                <InputField label="Annual Property Taxes (optional)" id="propertyTaxes" value={propertyTaxes} onChange={(e) => setPropertyTaxes(e.target.value)} unit="$" />
                <InputField label="Annual Home Insurance (optional)" id="homeInsurance" value={homeInsurance} onChange={(e) => setHomeInsurance(e.target.value)} unit="$" />
            </div>
        </div>
    );
};