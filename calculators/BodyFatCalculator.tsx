

import React, { useState, useMemo } from 'react';

type UnitSystem = 'metric' | 'imperial';
type Gender = 'male' | 'female';

const InputField = ({ label, id, value, onChange, unit }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-slate-700">{label}</label>
        <div className="mt-1 relative rounded-md">
            <input
                type="number"
                id={id}
                value={value}
                onChange={onChange}
                className="w-full p-3 bg-brand-light-gray border-transparent focus:ring-2 focus:ring-slate-400 focus:outline-none rounded-md pr-12"
                placeholder="0"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 pr-3 flex items-center"><span className="text-gray-500 sm:text-sm">{unit}</span></div>
        </div>
    </div>
);

export const BodyFatCalculator: React.FC = () => {
    const [unit, setUnit] = useState<UnitSystem>('imperial');
    const [gender, setGender] = useState<Gender>('male');
    const [height, setHeight] = useState('70'); // inches or cm
    const [waist, setWaist] = useState('35'); // inches or cm
    const [neck, setNeck] = useState('15'); // inches or cm
    const [hip, setHip] = useState('40'); // inches or cm, female only

    const convertToInches = (val: string) => unit === 'metric' ? parseFloat(val) / 2.54 : parseFloat(val);

    const bodyFat = useMemo(() => {
        const h = convertToInches(height);
        const w = convertToInches(waist);
        const n = convertToInches(neck);

        if (isNaN(h) || isNaN(w) || isNaN(n) || h <= 0 || w <= 0 || n <= 0) {
            return 0;
        }

        if (gender === 'male') {
            return 86.010 * Math.log10(w - n) - 70.041 * Math.log10(h) + 36.76;
        } else {
            const hipVal = convertToInches(hip);
            if (isNaN(hipVal) || hipVal <= 0) return 0;
            return 163.205 * Math.log10(w + hipVal - n) - 97.684 * Math.log10(h) - 78.387;
        }
    }, [unit, gender, height, waist, neck, hip]);

    return (
        <div className="space-y-6">
            <div className="p-6 rounded-lg bg-brand-light-gray text-center">
                 <p className="text-slate-500 text-lg">Estimated Body Fat</p>
                <p className="text-5xl font-extrabold text-slate-900 tracking-tight">
                    {bodyFat > 0 ? bodyFat.toFixed(1) : '—'}%
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-slate-200">
                <div className="flex bg-slate-100 p-1 rounded-full">
                    <button onClick={() => setGender('male')} className={`w-1/2 py-2 text-sm font-semibold rounded-full transition-colors ${gender === 'male' ? 'bg-white shadow text-slate-800' : 'text-slate-500'}`}>Male</button>
                    <button onClick={() => setGender('female')} className={`w-1/2 py-2 text-sm font-semibold rounded-full transition-colors ${gender === 'female' ? 'bg-white shadow text-slate-800' : 'text-slate-500'}`}>Female</button>
                </div>
                <div className="flex bg-slate-100 p-1 rounded-full">
                    <button onClick={() => setUnit('imperial')} className={`w-1/2 py-2 text-sm font-semibold rounded-full transition-colors ${unit === 'imperial' ? 'bg-white shadow text-slate-800' : 'text-slate-500'}`}>Imperial</button>
                    <button onClick={() => setUnit('metric')} className={`w-1/2 py-2 text-sm font-semibold rounded-full transition-colors ${unit === 'metric' ? 'bg-white shadow text-slate-800' : 'text-slate-500'}`}>Metric</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField label="Height" id="height" value={height} onChange={e => setHeight(e.target.value)} unit={unit === 'imperial' ? 'in' : 'cm'} />
                <InputField label="Waist" id="waist" value={waist} onChange={e => setWaist(e.target.value)} unit={unit === 'imperial' ? 'in' : 'cm'} />
                <InputField label="Neck" id="neck" value={neck} onChange={e => setNeck(e.target.value)} unit={unit === 'imperial' ? 'in' : 'cm'} />
                {gender === 'female' && (
                    <InputField label="Hip" id="hip" value={hip} onChange={e => setHip(e.target.value)} unit={unit === 'imperial' ? 'in' : 'cm'} />
                )}
            </div>
        </div>
    );
};