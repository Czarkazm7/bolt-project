

import React, { useState, useMemo } from 'react';

export const PregnancyDueDateCalculator: React.FC = () => {
    const [lmpDate, setLmpDate] = useState(new Date().toISOString().split('T')[0]);

    const dueDate = useMemo(() => {
        const date = new Date(lmpDate);
        if (isNaN(date.getTime())) return null;

        // Naegele's rule: Add 1 year, subtract 3 months, and add 7 days to the first day of the LMP.
        date.setDate(date.getDate() + 7);
        date.setMonth(date.getMonth() - 3);
        date.setFullYear(date.getFullYear() + 1);
        
        return date;
    }, [lmpDate]);

    return (
        <div className="space-y-6">
             <div className="p-6 rounded-lg bg-brand-light-gray text-center">
                 <p className="text-slate-500 text-lg">Estimated Due Date</p>
                <p className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                    {dueDate ? dueDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '—'}
                </p>
            </div>
            
            <div className="pt-6 border-t border-slate-200">
                <label htmlFor="lmpDate" className="block text-sm font-medium text-slate-700">First Day of Last Menstrual Period (LMP)</label>
                <input
                    type="date"
                    id="lmpDate"
                    value={lmpDate}
                    onChange={e => setLmpDate(e.target.value)}
                    className="mt-1 w-full p-3 bg-brand-light-gray border-transparent focus:ring-2 focus:ring-slate-400 focus:outline-none rounded-md"
                />
            </div>
        </div>
    );
};
