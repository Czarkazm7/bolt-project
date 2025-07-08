

import React, { useState, useMemo } from 'react';

type UnitSystem = 'metric' | 'imperial';

const InputField = ({ label, id, value, onChange, unit }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-slate-700">{label}</label>
        <div className="mt-1 relative rounded-md">
            <input type="number" id={id} value={value} onChange={onChange} className="w-full p-3 bg-brand-light-gray border-transparent focus:ring-2 focus:ring-slate-400 focus:outline-none rounded-md pr-12" placeholder="0" />
            <div className="pointer-events-none absolute inset-y-0 right-0 pr-3 flex items-center"><span className="text-gray-500 sm:text-sm">{unit}</span></div>
        </div>
    </div>
);

export const WaterIntakeCalculator: React.FC = () => {
    const [unit, setUnit] = useState<UnitSystem>('imperial');
    const [weight, setWeight] = useState('160'); // lbs or kg
    const [activity, setActivity] = useState('30'); // minutes

    const recommendedIntake = useMemo(() => {
        const p_weight = parseFloat(weight);
        const p_activity = parseFloat(activity);
        if (isNaN(p_weight) || isNaN(p_activity) || p_weight <= 0) return 0;
        
        const weightInLbs = unit === 'metric' ? p_weight * 2.20462 : p_weight;
        
        let baseIntake = weightInLbs * (2 / 3); // in ounces
        let activityIntake = (p_activity / 30) * 12; // 12 oz for every 30 mins
        
        const totalOunces = baseIntake + activityIntake;
        
        if (unit === 'metric') {
            return totalOunces * 29.5735; // convert oz to ml
        }
        return totalOunces;
    }, [unit, weight, activity]);

    return (
        <div className="space-y-6">
            <div className="p-6 rounded-lg bg-brand-light-gray text-center">
                 <p className="text-slate-500 text-lg">Recommended Daily Water Intake</p>
                <p className="text-5xl font-extrabold text-slate-900 tracking-tight">
                    {recommendedIntake > 0 ? Math.round(recommendedIntake).toLocaleString() : '—'}
                </p>
                 <p className="text-slate-500 text-md">{unit === 'imperial' ? 'ounces/day' : 'ml/day'}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-slate-200">
                <div className="flex bg-slate-100 p-1 rounded-full md:col-span-2">
                    <button onClick={() => setUnit('imperial')} className={`w-1/2 py-2 text-sm font-semibold rounded-full transition-colors ${unit === 'imperial' ? 'bg-white shadow text-slate-800' : 'text-slate-500'}`}>Imperial</button>
                    <button onClick={() => setUnit('metric')} className={`w-1/2 py-2 text-sm font-semibold rounded-full transition-colors ${unit === 'metric' ? 'bg-white shadow text-slate-800' : 'text-slate-500'}`}>Metric</button>
                </div>
                <InputField label="Weight" id="weight" value={weight} onChange={e => setWeight(e.target.value)} unit={unit === 'imperial' ? 'lbs' : 'kg'} />
                <InputField label="Daily Activity / Exercise" id="activity" value={activity} onChange={e => setActivity(e.target.value)} unit="minutes" />
            </div>
        </div>
    );
};