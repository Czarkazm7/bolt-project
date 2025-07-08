

import React, { useState, useMemo } from 'react';

type Gender = 'male' | 'female';

const InputField = ({ label, id, value, onChange, unit }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-slate-700">{label}</label>
        <div className="mt-1 relative rounded-md">
            <input type="number" id={id} value={value} onChange={onChange} className="w-full p-3 bg-brand-light-gray border-transparent focus:ring-2 focus:ring-slate-400 focus:outline-none rounded-md pr-12" placeholder="0" />
            <div className="pointer-events-none absolute inset-y-0 right-0 pr-3 flex items-center"><span className="text-gray-500 sm:text-sm">{unit}</span></div>
        </div>
    </div>
);

export const BMRCalculator: React.FC = () => {
    const [age, setAge] = useState('30');
    const [gender, setGender] = useState<Gender>('male');
    const [height, setHeight] = useState('180'); // cm
    const [weight, setWeight] = useState('80'); // kg

    const bmr = useMemo(() => {
        const p_weight = parseFloat(weight);
        const p_height = parseFloat(height);
        const p_age = parseInt(age);
        if (isNaN(p_weight) || isNaN(p_height) || isNaN(p_age) || p_weight <= 0 || p_height <= 0 || p_age <= 0) return 0;
        
        // Mifflin-St Jeor Equation
        if (gender === 'male') {
            return 10 * p_weight + 6.25 * p_height - 5 * p_age + 5;
        } else {
            return 10 * p_weight + 6.25 * p_height - 5 * p_age - 161;
        }
    }, [age, gender, height, weight]);

    return (
        <div className="space-y-6">
            <div className="p-6 rounded-lg bg-brand-light-gray text-center">
                 <p className="text-slate-500 text-lg">Basal Metabolic Rate (BMR)</p>
                <p className="text-5xl font-extrabold text-slate-900 tracking-tight">
                    {bmr > 0 ? Math.round(bmr).toLocaleString() : '—'}
                </p>
                 <p className="text-slate-500 text-md">calories/day</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-slate-200">
                <InputField label="Age" id="age" value={age} onChange={e => setAge(e.target.value)} unit="years" />
                 <div>
                    <label className="block text-sm font-medium text-slate-700">Gender</label>
                    <div className="mt-1 flex bg-slate-100 p-1 rounded-full w-full">
                        <button onClick={() => setGender('male')} className={`w-1/2 py-2 text-sm font-semibold rounded-full transition-colors ${gender === 'male' ? 'bg-white shadow text-slate-800' : 'text-slate-500'}`}>Male</button>
                        <button onClick={() => setGender('female')} className={`w-1/2 py-2 text-sm font-semibold rounded-full transition-colors ${gender === 'female' ? 'bg-white shadow text-slate-800' : 'text-slate-500'}`}>Female</button>
                    </div>
                </div>
                <InputField label="Height" id="height" value={height} onChange={e => setHeight(e.target.value)} unit="cm" />
                <InputField label="Weight" id="weight" value={weight} onChange={e => setWeight(e.target.value)} unit="kg" />
            </div>
            <p className="text-xs text-slate-500 text-center">Using Mifflin-St Jeor Equation. Please provide height in cm and weight in kg.</p>
        </div>
    );
};