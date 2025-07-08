

import React, { useState, useMemo } from 'react';

const units = {
  length: {
    meter: 1,
    kilometer: 1000,
    centimeter: 0.01,
    millimeter: 0.001,
    inch: 0.0254,
    foot: 0.3048,
    yard: 0.9144,
    mile: 1609.34,
  },
  mass: {
    gram: 1,
    kilogram: 1000,
    milligram: 0.001,
    pound: 453.592,
    ounce: 28.3495,
  },
  volume: {
    liter: 1,
    milliliter: 0.001,
    'cubic-meter': 1000,
    'gallon-us': 3.78541,
    'quart-us': 0.946353,
    'pint-us': 0.473176,
    'cup-us': 0.24,
  },
};

export const UnitConverter: React.FC = () => {
  const [type, setType] = useState('length');
  const [fromUnit, setFromUnit] = useState('meter');
  const [toUnit, setToUnit] = useState('foot');
  const [value, setValue] = useState('1');

  const availableUnits = units[type];

  const result = useMemo(() => {
    const fromFactor = availableUnits[fromUnit];
    const toFactor = availableUnits[toUnit];
    const val = parseFloat(value);
    if (!fromFactor || !toFactor || isNaN(val)) return '—';
    const valueInBase = val * fromFactor;
    const convertedValue = valueInBase / toFactor;
    return convertedValue.toLocaleString(undefined, { maximumFractionDigits: 6 });
  }, [type, fromUnit, toUnit, value, availableUnits]);

  const handleTypeChange = (newType) => {
    setType(newType);
    const newUnitKeys = Object.keys(units[newType]);
    setFromUnit(newUnitKeys[0]);
    setToUnit(newUnitKeys[1] || newUnitKeys[0]);
  };

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-lg bg-brand-light-gray text-center">
        <p className="text-slate-500 text-lg">{value} {fromUnit} is</p>
        <p className="text-5xl font-extrabold text-slate-900 tracking-tight">{result}</p>
        <p className="text-slate-500 text-lg">{toUnit}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-slate-200">
        <div className="md:col-span-3">
          <label className="block text-sm font-medium">Type</label>
          <select onChange={(e) => handleTypeChange(e.target.value)} value={type} className="mt-1 w-full p-3 bg-brand-light-gray border-transparent focus:ring-2 focus:ring-slate-400 focus:outline-none rounded-md">
            {Object.keys(units).map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Value</label>
          <input type="number" value={value} onChange={e => setValue(e.target.value)} className="mt-1 w-full p-3 bg-brand-light-gray border-transparent focus:ring-2 focus:ring-slate-400 focus:outline-none rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium">From</label>
          <select value={fromUnit} onChange={e => setFromUnit(e.target.value)} className="mt-1 w-full p-3 bg-brand-light-gray border-transparent focus:ring-2 focus:ring-slate-400 focus:outline-none rounded-md">
            {Object.keys(availableUnits).map(u => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">To</label>
          <select value={toUnit} onChange={e => setToUnit(e.target.value)} className="mt-1 w-full p-3 bg-brand-light-gray border-transparent focus:ring-2 focus:ring-slate-400 focus:outline-none rounded-md">
            {Object.keys(availableUnits).map(u => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
};
