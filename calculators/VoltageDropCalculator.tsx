import React, { useState, useMemo } from 'react';

const InputField = ({ label, value, onChange, unit }) => (
    <div>
        <label className="block text-sm font-medium text-slate-700">{label}</label>
        <div className="mt-1 relative rounded-md">
            <input type="number" value={value} onChange={onChange} className="w-full p-3 bg-brand-light-gray border-transparent focus:ring-2 focus:ring-slate-400 focus:outline-none rounded-md pr-12" placeholder="0" />
            {unit && <div className="pointer-events-none absolute inset-y-0 right-0 pr-3 flex items-center"><span className="text-gray-500 sm:text-sm">{unit}</span></div>}
        </div>
    </div>
);

// Circular Mils for AWG sizes. Simplified table.
const wireSizeCM = {
    '14': 4110, '12': 6530, '10': 10380, '8': 16510, '6': 26240, '4': 41740, '2': 66360,
};
const K_VAL = { copper: 12.9, aluminum: 21.2 };

export const VoltageDropCalculator: React.FC = () => {
    const [material, setMaterial] = useState('copper');
    const [wireSize, setWireSize] = useState('12');
    const [voltage, setVoltage] = useState('120');
    const [current, setCurrent] = useState('15');
    const [distance, setDistance] = useState('100');

    const result = useMemo(() => {
        const V = parseFloat(voltage);
        const I = parseFloat(current);
        const L = parseFloat(distance);
        const CM = wireSizeCM[wireSize];
        const K = K_VAL[material];

        if (isNaN(V) || isNaN(I) || isNaN(L) || !CM || !K || V === 0) return { drop: 0, percent: 0 };
        
        // Voltage Drop = 2 * K * I * L / CM
        const drop = (2 * K * I * L) / CM;
        const percent = (drop / V) * 100;
        
        return { drop, percent };
    }, [material, wireSize, voltage, current, distance]);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-brand-light-gray text-center">
                    <p className="text-slate-500 text-lg">Voltage Drop</p>
                    <p className="text-4xl font-extrabold text-slate-900">{result.drop.toFixed(2)} V</p>
                </div>
                 <div className="p-4 rounded-lg bg-brand-light-gray text-center">
                    <p className="text-slate-500 text-lg">Drop Percentage</p>
                    <p className={`text-4xl font-extrabold ${result.percent > 3 ? 'text-red-600' : 'text-slate-900'}`}>{result.percent.toFixed(2)}%</p>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-6 border-t border-slate-200">
                <InputField label="Source Voltage" value={voltage} onChange={e => setVoltage(e.target.value)} unit="V" />
                <InputField label="Current" value={current} onChange={e => setCurrent(e.target.value)} unit="A" />
                <InputField label="One-way Distance" value={distance} onChange={e => setDistance(e.target.value)} unit="ft" />
                
                <div>
                    <label className="block text-sm font-medium text-slate-700">Wire Material</label>
                    <select value={material} onChange={e => setMaterial(e.target.value)} className="mt-1 w-full p-3 bg-brand-light-gray border-transparent focus:ring-2 focus:ring-slate-400 focus:outline-none rounded-md">
                        <option value="copper">Copper</option>
                        <option value="aluminum">Aluminum</option>
                    </select>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700">Wire Size (AWG)</label>
                    <select value={wireSize} onChange={e => setWireSize(e.target.value)} className="mt-1 w-full p-3 bg-brand-light-gray border-transparent focus:ring-2 focus:ring-slate-400 focus:outline-none rounded-md">
                        {Object.keys(wireSizeCM).map(size => <option key={size} value={size}>{size} AWG</option>)}
                    </select>
                </div>
            </div>
        </div>
    );
};