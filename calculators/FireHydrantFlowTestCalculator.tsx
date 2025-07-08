

import React, { useState, useMemo } from 'react';

const InputField = ({ label, id, value, onChange, unit }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-slate-700">{label}</label>
        <div className="mt-1 relative rounded-md">
            <input type="number" id={id} value={value} onChange={onChange} className="w-full p-3 bg-brand-light-gray border-transparent focus:ring-2 focus:ring-slate-400 focus:outline-none rounded-md pr-12" placeholder="0" />
            <div className="pointer-events-none absolute inset-y-0 right-0 pr-3 flex items-center"><span className="text-gray-500 sm:text-sm">{unit}</span></div>
        </div>
    </div>
);

export const FireHydrantFlowTestCalculator: React.FC = () => {
    const [pitotPressure, setPitotPressure] = useState('65');
    const [nozzleDiameter, setNozzleDiameter] = useState('2.5');
    const [coefficient, setCoefficient] = useState('0.9');

    const flowRate = useMemo(() => {
        const p = parseFloat(pitotPressure);
        const d = parseFloat(nozzleDiameter);
        const c = parseFloat(coefficient);
        if (isNaN(p) || isNaN(d) || isNaN(c) || p <= 0 || d <= 0 || c <= 0) return 0;

        // Flow (Q) = 29.84 * c * d^2 * sqrt(p)
        return 29.84 * c * Math.pow(d, 2) * Math.sqrt(p);
    }, [pitotPressure, nozzleDiameter, coefficient]);

    return (
        <div className="space-y-6">
            <div className="p-6 rounded-lg bg-brand-light-gray text-center">
                <p className="text-slate-500 text-lg">Calculated Flow Rate</p>
                <p className="text-5xl font-extrabold text-slate-900 tracking-tight">
                    {flowRate > 0 ? Math.round(flowRate).toLocaleString() : '—'}
                </p>
                <p className="text-slate-500 text-md">GPM (Gallons Per Minute)</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-slate-200">
                <InputField label="Pitot Pressure" id="pitotPressure" value={pitotPressure} onChange={e => setPitotPressure(e.target.value)} unit="psi" />
                <InputField label="Nozzle Diameter" id="nozzleDiameter" value={nozzleDiameter} onChange={e => setNozzleDiameter(e.target.value)} unit="in" />
                <InputField label="Discharge Coefficient (c)" id="coefficient" value={coefficient} onChange={e => setCoefficient(e.target.value)} unit="" />
            </div>
        </div>
    );
};
