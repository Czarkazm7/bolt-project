
import React, { useState, useMemo } from 'react';

type UnitSystem = 'metric' | 'imperial';

const BMICategoryBar = ({ bmi }) => {
    if (!bmi || bmi <= 0) return null;

    const getPosition = (val) => {
        if (val < 15) return 0;
        if (val > 40) return 100;
        return ((val - 15) / 25) * 100;
    }

    const position = getPosition(bmi);

    return (
        <div className="w-full px-2 mt-4">
            <div className="relative h-2 rounded-full flex">
                <div className="h-2 rounded-l-full bg-indigo-200" style={{width: '20%'}}></div>
                <div className="h-2 bg-teal-300" style={{width: '30%'}}></div>
                <div className="h-2 bg-amber-200" style={{width: '20%'}}></div>
                <div className="h-2 rounded-r-full bg-rose-300" style={{width: '30%'}}></div>
                <div className="absolute top-1/2" style={{ left: `${position}%`, transform: 'translateX(-50%)' }}>
                    <div className="h-4 w-4 bg-white rounded-full shadow border-2 border-slate-500 -mt-2"></div>
                </div>
            </div>
            <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>15</span>
                <span>20</span>
                <span>25</span>
                <span>30</span>
                <span>35</span>
                <span>40</span>
            </div>
        </div>
    );
};


export const BMICalculator: React.FC = () => {
    const [unit, setUnit] = useState<UnitSystem>('imperial');
    const [height, setHeight] = useState({ feet: '5', inches: '10', cm: '178' });
    const [weight, setWeight] = useState({ lbs: '160', kg: '72' });

    const bmiResult = useMemo(() => {
        const hInCm = unit === 'metric' ? parseFloat(height.cm) : (parseFloat(height.feet) * 12 + parseFloat(height.inches)) * 2.54;
        const wInKg = unit === 'metric' ? parseFloat(weight.kg) : parseFloat(weight.lbs) * 0.453592;

        if (isNaN(hInCm) || isNaN(wInKg) || hInCm <= 0 || wInKg <= 0) {
            return { bmi: 0, category: 'N/A' };
        }

        const bmi = wInKg / ((hInCm / 100) * (hInCm / 100));
        
        let category: string;
        if (bmi < 18.5) category = 'Underweight';
        else if (bmi < 25) category = 'Normal weight';
        else if (bmi < 30) category = 'Overweight';
        else category = 'Obesity';

        return { bmi: parseFloat(bmi.toFixed(1)), category };
    }, [unit, height, weight]);

    const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHeight({ ...height, [e.target.name]: e.target.value });
    };

    const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWeight({ ...weight, [e.target.name]: e.target.value });
    };

    return (
        <div className="space-y-6">
            <div className="text-center bg-brand-light-gray p-6 rounded-lg">
                <p className="text-brand-muted text-lg">Your BMI</p>
                <p className="text-5xl font-extrabold text-brand-dark tracking-tight">{bmiResult.bmi > 0 ? bmiResult.bmi : '—'}</p>
                <p className="text-xl font-medium text-brand-dark mt-1">{bmiResult.bmi > 0 ? bmiResult.category : ''}</p>
                <BMICategoryBar bmi={bmiResult.bmi} />
            </div>
            
            <div className="space-y-4">
                <div className="flex justify-center bg-brand-light-gray p-1 rounded-full">
                    <button onClick={() => setUnit('imperial')} className={`w-1/2 py-2 text-sm font-semibold rounded-full transition-colors ${unit === 'imperial' ? 'bg-brand-primary text-white shadow' : 'text-brand-muted'}`}>Imperial</button>
                    <button onClick={() => setUnit('metric')} className={`w-1/2 py-2 text-sm font-semibold rounded-full transition-colors ${unit === 'metric' ? 'bg-brand-primary text-white shadow' : 'text-brand-muted'}`}>Metric</button>
                </div>

                <div>
                    <label className="block text-sm font-medium text-brand-dark">Height</label>
                    {unit === 'imperial' ? (
                        <div className="mt-1 grid grid-cols-2 gap-4">
                            <input type="number" name="feet" value={height.feet} onChange={handleHeightChange} className="w-full p-3 bg-brand-light-gray border-transparent focus:ring-2 focus:ring-brand-primary focus:outline-none rounded-md" placeholder="ft" />
                            <input type="number" name="inches" value={height.inches} onChange={handleHeightChange} className="w-full p-3 bg-brand-light-gray border-transparent focus:ring-2 focus:ring-brand-primary focus:outline-none rounded-md" placeholder="in" />
                        </div>
                    ) : (
                        <input type="number" name="cm" value={height.cm} onChange={handleHeightChange} className="mt-1 w-full p-3 bg-brand-light-gray border-transparent focus:ring-2 focus:ring-brand-primary focus:outline-none rounded-md" placeholder="cm" />
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-brand-dark">Weight</label>
                    {unit === 'imperial' ? (
                        <input type="number" name="lbs" value={weight.lbs} onChange={handleWeightChange} className="mt-1 w-full p-3 bg-brand-light-gray border-transparent focus:ring-2 focus:ring-brand-primary focus:outline-none rounded-md" placeholder="lbs" />
                    ) : (
                        <input type="number" name="kg" value={weight.kg} onChange={handleWeightChange} className="mt-1 w-full p-3 bg-brand-light-gray border-transparent focus:ring-2 focus:ring-brand-primary focus:outline-none rounded-md" placeholder="kg" />
                    )}
                </div>
            </div>
        </div>
    );
};