

import React, { useState, useMemo } from 'react';

export const DateCalculator: React.FC = () => {
    const [mode, setMode] = useState('duration');
    // Duration state
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [endDate, setEndDate] = useState(new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0]);
    // Add/Subtract state
    const [fromDate, setFromDate] = useState(new Date().toISOString().split('T')[0]);
    const [days, setDays] = useState('30');
    const [addSubtract, setAddSubtract] = useState('add');

    const duration = useMemo(() => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        if (isNaN(start.getTime()) || isNaN(end.getTime())) return null;
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return `${diffDays.toLocaleString()} days`;
    }, [startDate, endDate]);

    const newDate = useMemo(() => {
        const from = new Date(fromDate);
        const numDays = parseInt(days, 10);
        if(isNaN(from.getTime()) || isNaN(numDays)) return null;

        const resultDate = new Date(from);
        const dayModifier = addSubtract === 'add' ? numDays : -numDays;
        resultDate.setDate(resultDate.getDate() + dayModifier);
        return resultDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    }, [fromDate, days, addSubtract]);

    return (
        <div className="space-y-6">
            <div className="flex bg-slate-100 p-1 rounded-full">
                <button onClick={() => setMode('duration')} className={`w-1/2 py-2 text-sm font-semibold rounded-full transition-colors ${mode === 'duration' ? 'bg-white shadow text-slate-800' : 'text-slate-500'}`}>Date Difference</button>
                <button onClick={() => setMode('add-subtract')} className={`w-1/2 py-2 text-sm font-semibold rounded-full transition-colors ${mode === 'add-subtract' ? 'bg-white shadow text-slate-800' : 'text-slate-500'}`}>Add/Subtract Days</button>
            </div>
            
            {mode === 'duration' && (
                <div className="space-y-4 pt-4 border-t border-slate-200">
                    <div className="p-6 rounded-lg bg-brand-light-gray text-center">
                        <p className="text-slate-500 text-lg">Duration Between Dates</p>
                        <p className="text-4xl font-extrabold text-slate-900">{duration || '—'}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium">Start Date</label>
                            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="mt-1 w-full p-3 bg-brand-light-gray border-transparent focus:ring-2 focus:ring-slate-400 focus:outline-none rounded-md" />
                        </div>
                         <div>
                            <label className="block text-sm font-medium">End Date</label>
                            <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="mt-1 w-full p-3 bg-brand-light-gray border-transparent focus:ring-2 focus:ring-slate-400 focus:outline-none rounded-md" />
                        </div>
                    </div>
                </div>
            )}
            
            {mode === 'add-subtract' && (
                 <div className="space-y-4 pt-4 border-t border-slate-200">
                    <div className="p-6 rounded-lg bg-brand-light-gray text-center">
                        <p className="text-slate-500 text-lg">Resulting Date</p>
                        <p className="text-4xl font-extrabold text-slate-900">{newDate || '—'}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div>
                            <label className="block text-sm font-medium">From Date</label>
                            <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} className="mt-1 w-full p-3 bg-brand-light-gray border-transparent focus:ring-2 focus:ring-slate-400 focus:outline-none rounded-md" />
                        </div>
                        <div>
                             <label className="block text-sm font-medium">Days</label>
                             <div className="flex">
                                <button onClick={() => setAddSubtract('subtract')} className={`px-4 py-3 rounded-l-md ${addSubtract === 'subtract' ? 'bg-slate-800 text-white' : 'bg-slate-200'}`}>-</button>
                                <input type="number" value={days} onChange={e => setDays(e.target.value)} className="w-full p-3 bg-brand-light-gray border-y-transparent border-x-0 focus:ring-2 focus:ring-slate-400 focus:outline-none text-center" />
                                <button onClick={() => setAddSubtract('add')} className={`px-4 py-3 rounded-r-md ${addSubtract === 'add' ? 'bg-slate-800 text-white' : 'bg-slate-200'}`}>+</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
