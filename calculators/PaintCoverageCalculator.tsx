

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

export const PaintCoverageCalculator: React.FC = () => {
    const [totalArea, setTotalArea] = useState('400'); // sq ft
    const [coats, setCoats] = useState('2');
    const [coveragePerGallon, setCoveragePerGallon] = useState('350');

    const paintNeeded = useMemo(() => {
        const area = parseFloat(totalArea);
        const numCoats = parseInt(coats);
        const coverage = parseFloat(coveragePerGallon);

        if (isNaN(area) || isNaN(numCoats) || isNaN(coverage) || area <= 0 || numCoats <= 0 || coverage <= 0) {
            return 0;
        }

        const totalCoverageNeeded = area * numCoats;
        return totalCoverageNeeded / coverage;
    }, [totalArea, coats, coveragePerGallon]);

    return (
        <div className="space-y-6">
            <div className="p-6 rounded-lg bg-brand-light-gray text-center">
                <p className="text-slate-500 text-lg">Paint Needed</p>
                <p className="text-5xl font-extrabold text-slate-900 tracking-tight">
                    {paintNeeded > 0 ? paintNeeded.toFixed(2) : '—'}
                </p>
                <p className="text-slate-500 text-md">gallons</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-slate-200">
                <InputField label="Total Area to Paint" value={totalArea} onChange={e => setTotalArea(e.target.value)} unit="sq ft" />
                <InputField label="Number of Coats" value={coats} onChange={e => setCoats(e.target.value)} unit="" />
                <InputField label="Paint Coverage" value={coveragePerGallon} onChange={e => setCoveragePerGallon(e.target.value)} unit="sq ft / gal" />
            </div>
        </div>
    );
};
