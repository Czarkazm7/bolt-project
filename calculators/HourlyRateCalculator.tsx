

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

export const HourlyRateCalculator: React.FC = () => {
    const [salary, setSalary] = useState('100000');
    const [hoursPerWeek, setHoursPerWeek] = useState('35');
    const [weeksPerYear, setWeeksPerYear] = useState('48');

    const hourlyRate = useMemo(() => {
        const p_salary = parseFloat(salary);
        const p_hours = parseFloat(hoursPerWeek);
        const p_weeks = parseFloat(weeksPerYear);

        if (isNaN(p_salary) || isNaN(p_hours) || isNaN(p_weeks) || p_hours <= 0 || p_weeks <= 0) {
            return 0;
        }
        
        const totalHours = p_hours * p_weeks;
        return p_salary / totalHours;

    }, [salary, hoursPerWeek, weeksPerYear]);

    const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

    return (
        <div className="space-y-6">
            <div className="p-6 rounded-lg bg-brand-light-gray text-center">
                <p className="text-slate-500 text-lg">Required Hourly Rate</p>
                <p className="text-5xl font-extrabold text-slate-900 tracking-tight">
                    {hourlyRate > 0 ? formatCurrency(hourlyRate) : '—'}
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-slate-200">
                <InputField label="Desired Annual Salary" value={salary} onChange={e => setSalary(e.target.value)} unit="$" />
                <InputField label="Billable Hours per Week" value={hoursPerWeek} onChange={e => setHoursPerWeek(e.target.value)} unit="" />
                <InputField label="Working Weeks per Year" value={weeksPerYear} onChange={e => setWeeksPerYear(e.target.value)} unit="" />
            </div>
        </div>
    );
};
