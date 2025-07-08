

import React, { useState, useMemo } from 'react';

const InputField = ({ label, value, onChange, type }) => (
    <div>
        <label className="block text-sm font-medium text-slate-700">{label}</label>
        <input type={type} value={value} onChange={onChange} className="mt-1 w-full p-3 bg-brand-light-gray border-transparent focus:ring-2 focus:ring-slate-400 focus:outline-none rounded-md" />
    </div>
);

export const TimeCardCalculator: React.FC = () => {
    const [startTime, setStartTime] = useState('09:00');
    const [endTime, setEndTime] = useState('17:00');
    const [breakMinutes, setBreakMinutes] = useState('30');

    const totalHours = useMemo(() => {
        const start = new Date(`1970-01-01T${startTime}:00`);
        const end = new Date(`1970-01-01T${endTime}:00`);
        const breakMins = parseInt(breakMinutes) || 0;

        if (isNaN(start.getTime()) || isNaN(end.getTime()) || end < start) {
            return { decimal: 0, hhmm: '00:00' };
        }
        
        let diffMs = end.getTime() - start.getTime();
        let diffMins = diffMs / (1000 * 60);
        
        const totalWorkMins = diffMins - breakMins;
        if (totalWorkMins < 0) return { decimal: 0, hhmm: '00:00' };

        const hours = Math.floor(totalWorkMins / 60);
        const minutes = Math.round(totalWorkMins % 60);
        
        return {
            decimal: totalWorkMins / 60,
            hhmm: `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
        };
    }, [startTime, endTime, breakMinutes]);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-brand-light-gray text-center">
                    <p className="text-slate-500 text-lg">Total Hours (HH:MM)</p>
                    <p className="text-4xl font-extrabold text-slate-900">{totalHours.hhmm}</p>
                </div>
                 <div className="p-4 rounded-lg bg-brand-light-gray text-center">
                    <p className="text-slate-500 text-lg">Total Hours (Decimal)</p>
                    <p className="text-4xl font-extrabold text-slate-900">{totalHours.decimal.toFixed(2)}</p>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-slate-200">
                <InputField label="Start Time" value={startTime} onChange={e => setStartTime(e.target.value)} type="time" />
                <InputField label="End Time" value={endTime} onChange={e => setEndTime(e.target.value)} type="time" />
                <div>
                    <label className="block text-sm font-medium text-slate-700">Break (minutes)</label>
                    <input type="number" value={breakMinutes} onChange={e => setBreakMinutes(e.target.value)} className="mt-1 w-full p-3 bg-brand-light-gray border-transparent focus:ring-2 focus:ring-slate-400 focus:outline-none rounded-md" />
                </div>
            </div>
        </div>
    );
};
