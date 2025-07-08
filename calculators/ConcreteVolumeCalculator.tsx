

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

export const ConcreteVolumeCalculator: React.FC = () => {
    const [shape, setShape] = useState('slab');
    const [length, setLength] = useState('20');
    const [width, setWidth] = useState('10');
    const [thickness, setThickness] = useState('4'); // inches for slab
    const [diameter, setDiameter] = useState('12'); // inches for column
    const [height, setHeight] = useState('8'); // feet for column

    const volume = useMemo(() => {
        let volCubicFeet = 0;
        const p_len = parseFloat(length);
        const p_wid = parseFloat(width);
        const p_thick = parseFloat(thickness);
        const p_diam = parseFloat(diameter);
        const p_height = parseFloat(height);

        if (shape === 'slab') {
            if (isNaN(p_len) || isNaN(p_wid) || isNaN(p_thick)) return 0;
            volCubicFeet = p_len * p_wid * (p_thick / 12);
        } else if (shape === 'column') {
             if (isNaN(p_diam) || isNaN(p_height)) return 0;
             const radius = p_diam / 12 / 2;
             volCubicFeet = Math.PI * Math.pow(radius, 2) * p_height;
        }

        return volCubicFeet / 27; // Convert to cubic yards
    }, [shape, length, width, thickness, diameter, height]);
    
    return (
        <div className="space-y-6">
            <div className="p-6 rounded-lg bg-brand-light-gray text-center">
                <p className="text-slate-500 text-lg">Concrete Needed</p>
                <p className="text-5xl font-extrabold text-slate-900 tracking-tight">
                    {volume > 0 ? volume.toFixed(2) : '—'}
                </p>
                <p className="text-slate-500 text-md">cubic yards</p>
            </div>

            <div className="pt-6 border-t border-slate-200 space-y-4">
                 <div className="flex bg-slate-100 p-1 rounded-full">
                    <button onClick={() => setShape('slab')} className={`w-1/2 py-2 text-sm font-semibold rounded-full transition-colors ${shape === 'slab' ? 'bg-white shadow text-slate-800' : 'text-slate-500'}`}>Slab / Footing</button>
                    <button onClick={() => setShape('column')} className={`w-1/2 py-2 text-sm font-semibold rounded-full transition-colors ${shape === 'column' ? 'bg-white shadow text-slate-800' : 'text-slate-500'}`}>Column / Cylinder</button>
                </div>

                {shape === 'slab' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <InputField label="Length" value={length} onChange={e => setLength(e.target.value)} unit="ft" />
                        <InputField label="Width" value={width} onChange={e => setWidth(e.target.value)} unit="ft" />
                        <InputField label="Thickness" value={thickness} onChange={e => setThickness(e.target.value)} unit="in" />
                    </div>
                )}
                 {shape === 'column' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField label="Diameter" value={diameter} onChange={e => setDiameter(e.target.value)} unit="in" />
                        <InputField label="Height" value={height} onChange={e => setHeight(e.target.value)} unit="ft" />
                    </div>
                )}
            </div>
        </div>
    );
};
