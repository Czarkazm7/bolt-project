
import React from 'react';
import { Link } from 'react-router-dom';
import type { ICalculator } from '../types';

interface CalculatorCardProps {
  calculator: Omit<ICalculator, 'component' | 'explanation'>;
}

const CalculatorCard: React.FC<CalculatorCardProps> = ({ calculator }) => {
  const { id, title, description, Icon } = calculator;

  return (
    <Link to={`/calculator/${id}`} className="group block h-full">
      <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full border border-slate-100 flex flex-col items-start">
        <div className="bg-brand-light-gray p-3 rounded-lg mb-4">
            <Icon className="h-8 w-8 text-brand-primary" />
        </div>
        <h3 className="text-lg font-bold text-brand-dark mb-2">{title}</h3>
        <p className="text-brand-muted flex-grow text-sm">{description}</p>
      </div>
    </Link>
  );
};

export default CalculatorCard;