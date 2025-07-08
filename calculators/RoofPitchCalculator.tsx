

import React, { useState, useMemo } from 'react';

const InputField = ({ label, value, onChange, unit }) => (
    <div>
        <label className="block text-sm font-medium text-slate-700">{label}</label>
        <div className="mt-1 relative rounded-md">
            <input type="number" value={value} onChange={onChange} className="w-full p-3 bg-brand-light-gray border-transparent focus:ring-2 focus:ring-slate-400 focus:outline-none rounded-md pr-12" placeholder="0" />
            <div className="pointer-events-none absolute inset-y-0 right-0 pr-3 flex items-center"><span className="text-gray-500 sm:text-sm">{unit}</span></div>
        </div>
    </div>
);

export const RoofPitchCalculator: React.FC = () => {
    const [rise, setRise] = useState('6');
    const [run, setRun] = useState('12');

    const result = useMemo(() => {
        const p_rise = parseFloat(rise);
        const p_run = parseFloat(run);
        if (isNaN(p_rise) || isNaN(p_run) || p_run === 0) {
            return { pitch: 'N/A', angle: 0 };
        }
        
        const angle = Math.atan(p_rise / p_run) * (180 / Math.PI);
        
        return { pitch: `${p_rise}:${p_run}`, angle };

    }, [rise, run]);
    
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-brand-light-gray text-center">
                    <p className="text-slate-500 text-lg">Roof Pitch</p>
                    <p className="text-4xl font-extrabold text-slate-900">{result.pitch}</p>
                </div>
                 <div className="p-4 rounded-lg bg-brand-light-gray text-center">
                    <p className="text-slate-500 text-lg">Angle</p>
                    <p className="text-4xl font-extrabold text-slate-900">{result.angle.toFixed(2)}°</p>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-slate-200">
                <InputField label="Rise" value={rise} onChange={e => setRise(e.target.value)} unit="inches" />
                <InputField label="Run" value={run} onChange={e => setRun(e.target.value)} unit="inches" />
            </div>
        </div>
    );
};
