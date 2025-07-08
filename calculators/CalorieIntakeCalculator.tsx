

import React, { useState, useMemo } from 'react';

type Gender = 'male' | 'female';

const activityLevels = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9
};

const InputField = ({ label, id, value, onChange, unit }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-slate-700">{label}</label>
        <div className="mt-1 relative rounded-md">
            <input type="number" id={id} value={value} onChange={onChange} className="w-full p-3 bg-brand-light-gray border-transparent focus:ring-2 focus:ring-slate-400 focus:outline-none rounded-md pr-12" placeholder="0" />
            <div className="pointer-events-none absolute inset-y-0 right-0 pr-3 flex items-center"><span className="text-gray-500 sm:text-sm">{unit}</span></div>
        </div>
    </div>
);

export const CalorieIntakeCalculator: React.FC = () => {
    const [age, setAge] = useState('30');
    const [gender, setGender] = useState<Gender>('male');
    const [height, setHeight] = useState('180'); // cm
    const [weight, setWeight] = useState('80'); // kg
    const [activity, setActivity] = useState('light');

    const bmr = useMemo(() => {
        const p_weight = parseFloat(weight);
        const p_height = parseFloat(height);
        const p_age = parseInt(age);
        if (isNaN(p_weight) || isNaN(p_height) || isNaN(p_age)) return 0;
        
        if (gender === 'male') {
            return 10 * p_weight + 6.25 * p_height - 5 * p_age + 5;
        } else {
            return 10 * p_weight + 6.25 * p_height - 5 * p_age - 161;
        }
    }, [age, gender, height, weight]);

    const maintenanceCalories = useMemo(() => {
        return bmr * activityLevels[activity];
    }, [bmr, activity]);

    return (
        <div className="space-y-6">
            <div className="p-6 rounded-lg bg-brand-light-gray text-center">
                 <p className="text-slate-500 text-lg">Maintenance Calories</p>
                <p className="text-5xl font-extrabold text-slate-900 tracking-tight">
                    {maintenanceCalories > 0 ? Math.round(maintenanceCalories).toLocaleString() : '—'}
                </p>
                 <p className="text-slate-500 text-md">calories/day</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                 <div>
                    <p className="font-bold text-slate-800">{Math.round(maintenanceCalories * 0.8).toLocaleString()}</p>
                    <p className="text-sm text-slate-500">Mild Weight Loss</p>
                </div>
                <div>
                    <p className="font-bold text-slate-800">{Math.round(maintenanceCalories * 0.6).toLocaleString()}</p>
                    <p className="text-sm text-slate-500">Weight Loss</p>
                </div>
                <div>
                    <p className="font-bold text-slate-800">{Math.round(maintenanceCalories * 1.1).toLocaleString()}</p>
                    <p className="text-sm text-slate-500">Mild Weight Gain</p>
                </div>
                 <div>
                    <p className="font-bold text-slate-800">{Math.round(maintenanceCalories * 1.2).toLocaleString()}</p>
                    <p className="text-sm text-slate-500">Weight Gain</p>
                </div>
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
                <div className="md:col-span-2">
                    <label htmlFor="activity" className="block text-sm font-medium text-slate-700">Activity Level</label>
                    <select id="activity" value={activity} onChange={e => setActivity(e.target.value)} className="mt-1 w-full p-3 bg-brand-light-gray border-transparent focus:ring-2 focus:ring-slate-400 focus:outline-none rounded-md">
                        <option value="sedentary">Sedentary: little or no exercise</option>
                        <option value="light">Light: exercise 1-3 times/week</option>
                        <option value="moderate">Moderate: exercise 4-5 times/week</option>
                        <option value="active">Active: daily exercise or intense exercise 3-4 times/week</option>
                        <option value="veryActive">Very Active: intense exercise 6-7 times/week</option>
                    </select>
                </div>
            </div>
            <p className="text-xs text-slate-500 text-center">Using Mifflin-St Jeor Equation. Please provide height in cm and weight in kg.</p>
        </div>
    );
};