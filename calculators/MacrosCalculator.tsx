
import React, { useState, useMemo } from 'react';

type DietPlan = 'balanced' | 'low-carb' | 'high-protein';

const diets = {
    'balanced': { protein: 0.30, carbs: 0.40, fat: 0.30 },
    'low-carb': { protein: 0.40, carbs: 0.20, fat: 0.40 },
    'high-protein': { protein: 0.50, carbs: 0.25, fat: 0.25 }
};

export const MacrosCalculator: React.FC = () => {
    const [calories, setCalories] = useState('2000');
    const [plan, setPlan] = useState<DietPlan>('balanced');

    const macros = useMemo(() => {
        const cals = parseFloat(calories);
        if (isNaN(cals) || cals <= 0) {
            return { protein: 0, carbs: 0, fat: 0 };
        }
        
        const dietPlan = diets[plan];
        const protein = (cals * dietPlan.protein) / 4; // 4 cals per gram
        const carbs = (cals * dietPlan.carbs) / 4; // 4 cals per gram
        const fat = (cals * dietPlan.fat) / 9; // 9 cals per gram

        return { protein, carbs, fat };
    }, [calories, plan]);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-4 rounded-lg bg-slate-100">
                    <p className="text-lg font-bold text-slate-800">Protein</p>
                    <p className="text-3xl font-extrabold text-slate-900">{Math.round(macros.protein)}g</p>
                </div>
                <div className="p-4 rounded-lg bg-slate-100">
                    <p className="text-lg font-bold text-slate-800">Carbs</p>
                    <p className="text-3xl font-extrabold text-slate-900">{Math.round(macros.carbs)}g</p>
                </div>
                <div className="p-4 rounded-lg bg-slate-100">
                    <p className="text-lg font-bold text-slate-800">Fat</p>
                    <p className="text-3xl font-extrabold text-slate-900">{Math.round(macros.fat)}g</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-slate-200">
                <div>
                    <label htmlFor="calories" className="block text-sm font-medium text-slate-700">Daily Calorie Goal</label>
                    <input
                        type="number"
                        id="calories"
                        value={calories}
                        onChange={e => setCalories(e.target.value)}
                        className="mt-1 w-full p-3 bg-brand-light-gray border-transparent focus:ring-2 focus:ring-slate-400 focus:outline-none rounded-md"
                        placeholder="2000"
                    />
                </div>
                 <div>
                    <label htmlFor="plan" className="block text-sm font-medium text-slate-700">Diet Plan</label>
                    <select id="plan" value={plan} onChange={e => setPlan(e.target.value as DietPlan)} className="mt-1 w-full p-3 bg-brand-light-gray border-transparent focus:ring-2 focus:ring-slate-400 focus:outline-none rounded-md">
                        <option value="balanced">Balanced Diet</option>
                        <option value="low-carb">Low-Carb Diet</option>
                        <option value="high-protein">High-Protein Diet</option>
                    </select>
                </div>
            </div>
        </div>
    );
};