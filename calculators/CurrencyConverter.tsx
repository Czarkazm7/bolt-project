

import React, { useState, useMemo } from 'react';

const InputField = ({ label, id, value, onChange, type = 'number', placeholder = "0.00" }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-slate-700">{label}</label>
        <div className="mt-1 relative rounded-md">
            <input
                type={type}
                id={id}
                value={value}
                onChange={onChange}
                className="w-full py-3 px-4 bg-brand-light-gray border-transparent focus:ring-2 focus:ring-slate-400 focus:outline-none rounded-md"
                placeholder={placeholder}
            />
        </div>
    </div>
);

export const CurrencyConverter: React.FC = () => {
    const [amount, setAmount] = useState('100');
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EUR');
    const [exchangeRate, setExchangeRate] = useState('0.93');

    const convertedAmount = useMemo(() => {
        const p_amount = parseFloat(amount);
        const p_rate = parseFloat(exchangeRate);
        if (isNaN(p_amount) || isNaN(p_rate)) {
            return 0;
        }
        return p_amount * p_rate;
    }, [amount, exchangeRate]);

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(e.target.value);
    };
    
    const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setExchangeRate(e.target.value);
    };

    return (
        <div className="space-y-6">
            <div className="p-6 rounded-lg bg-brand-light-gray">
                 <p className="text-slate-500 text-lg text-center">
                    {amount || 0} {fromCurrency} =
                </p>
                <p className="text-5xl font-extrabold text-slate-900 tracking-tight text-center">
                    {convertedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {toCurrency}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-slate-200">
                <InputField label="Amount" id="amount" value={amount} onChange={handleAmountChange} />
                <InputField label="From" id="from" type="text" value={fromCurrency} onChange={e => setFromCurrency(e.target.value.toUpperCase())} placeholder="USD" />
                <InputField label="To" id="to" type="text" value={toCurrency} onChange={e => setToCurrency(e.target.value.toUpperCase())} placeholder="EUR" />
                <InputField label="Exchange Rate" id="rate" value={exchangeRate} onChange={handleRateChange} placeholder="1 USD to EUR rate" />
            </div>
            <p className="text-xs text-slate-500 text-center">Note: Exchange rates change constantly. Please enter the current rate for an accurate conversion.</p>
        </div>
    );
};