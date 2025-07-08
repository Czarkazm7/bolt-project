
import React from 'react';
import { ToolsIcon } from '../components/icons';

export const PlaceholderCalculator: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center p-8 bg-slate-50 rounded-lg min-h-[200px]">
            <ToolsIcon className="h-12 w-12 text-slate-400 mb-4" />
            <h3 className="text-xl font-bold text-slate-700">Calculator Coming Soon!</h3>
            <p className="text-slate-500 mt-2">Our team is hard at work building this tool. Check back later!</p>
        </div>
    );
};