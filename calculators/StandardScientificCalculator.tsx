
import React, { useState, useCallback } from 'react';

type CalculatorMode = 'standard' | 'scientific';

const CalculatorButton = ({ onClick, children, className = '' }) => (
    <button
        onClick={onClick}
        className={`flex items-center justify-center h-14 sm:h-16 rounded-xl text-xl sm:text-2xl font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white transition-all duration-200 ${className}`}
    >
        {children}
    </button>
);

export const StandardScientificCalculator: React.FC = () => {
    const [mode, setMode] = useState<CalculatorMode>('standard');
    const [displayValue, setDisplayValue] = useState('0');
    const [firstOperand, setFirstOperand] = useState<number | null>(null);
    const [operator, setOperator] = useState<string | null>(null);
    const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

    const performCalculation = (first: number, second: number, op: string): number => {
        switch (op) {
            case '+': return first + second;
            case '-': return first - second;
            case '×': return first * second;
            case '÷': return first / second;
            case 'xʸ': return Math.pow(first, second);
            default: return second;
        }
    };

    const inputDigit = useCallback((digit: string) => {
        if (waitingForSecondOperand) {
            setDisplayValue(digit);
            setWaitingForSecondOperand(false);
        } else {
            setDisplayValue(displayValue === '0' ? digit : displayValue + digit);
        }
    }, [displayValue, waitingForSecondOperand]);

    const inputDecimal = useCallback(() => {
        if (waitingForSecondOperand) {
            setDisplayValue('0.');
            setWaitingForSecondOperand(false);
            return;
        }
        if (!displayValue.includes('.')) {
            setDisplayValue(displayValue + '.');
        }
    }, [displayValue, waitingForSecondOperand]);

    const clearAll = useCallback(() => {
        setDisplayValue('0');
        setFirstOperand(null);
        setOperator(null);
        setWaitingForSecondOperand(false);
    }, []);

    const toggleSign = useCallback(() => {
        setDisplayValue(String(parseFloat(displayValue) * -1));
    }, [displayValue]);

    const inputPercent = useCallback(() => {
        setDisplayValue(String(parseFloat(displayValue) / 100));
    }, [displayValue]);

    const handleOperator = useCallback((nextOperator: string) => {
        const inputValue = parseFloat(displayValue);

        if (operator && firstOperand !== null && !waitingForSecondOperand) {
            const result = performCalculation(firstOperand, inputValue, operator);
            setDisplayValue(String(parseFloat(result.toPrecision(15))));
            setFirstOperand(result);
        } else {
            setFirstOperand(inputValue);
        }
        
        setWaitingForSecondOperand(true);
        setOperator(nextOperator);
    }, [displayValue, operator, firstOperand, waitingForSecondOperand]);
    
    const handleEquals = useCallback(() => {
        const inputValue = parseFloat(displayValue);
        if (operator && firstOperand !== null) {
            const result = performCalculation(firstOperand, inputValue, operator);
            setDisplayValue(String(parseFloat(result.toPrecision(15))));
            setFirstOperand(null);
            setOperator(null);
            setWaitingForSecondOperand(true); // Ready for new calculation
        }
    }, [displayValue, operator, firstOperand]);
    
    const handleScientific = useCallback((func: string) => {
        const value = parseFloat(displayValue);
        let result: number;
        switch(func) {
            case '√': result = Math.sqrt(value); break;
            case 'x²': result = Math.pow(value, 2); break;
            case 'sin': result = Math.sin(value * Math.PI / 180); break; // degrees to radians
            case 'cos': result = Math.cos(value * Math.PI / 180); break;
            case 'tan': result = Math.tan(value * Math.PI / 180); break;
            case 'log': result = Math.log10(value); break;
            case 'ln': result = Math.log(value); break;
            case 'π': result = Math.PI; break;
            case 'e': result = Math.E; break;
            default: return;
        }
        if (isNaN(result) || !isFinite(result)) {
            setDisplayValue("Error");
        } else {
            setDisplayValue(String(parseFloat(result.toPrecision(15))));
        }
        setWaitingForSecondOperand(true);

    }, [displayValue]);

    const scientificButtons = [
        { label: 'sin', func: () => handleScientific('sin') },
        { label: 'cos', func: () => handleScientific('cos') },
        { label: 'tan', func: () => handleScientific('tan') },
        { label: '√', func: () => handleScientific('√') },
        { label: 'x²', func: () => handleScientific('x²') },
        { label: 'xʸ', func: () => handleOperator('xʸ') },
        { label: 'log', func: () => handleScientific('log') },
        { label: 'ln', func: () => handleScientific('ln') },
        { label: 'π', func: () => handleScientific('π') },
        { label: 'e', func: () => handleScientific('e') },
    ];

    return (
        <div className="bg-gray-800 text-white p-4 rounded-xl">
             <div className="flex justify-center bg-gray-700 p-1 rounded-full mb-4">
                <button onClick={() => setMode('standard')} className={`w-1/2 py-1.5 text-sm font-semibold rounded-full transition-colors ${mode === 'standard' ? 'bg-gray-500' : 'hover:bg-gray-600'}`}>Standard</button>
                <button onClick={() => setMode('scientific')} className={`w-1/2 py-1.5 text-sm font-semibold rounded-full transition-colors ${mode === 'scientific' ? 'bg-gray-500' : 'hover:bg-gray-600'}`}>Scientific</button>
            </div>
            
            <div className="bg-gray-900/50 rounded-lg px-4 py-2 mb-4 text-right">
                <p className="text-4xl sm:text-5xl font-light break-all">{displayValue}</p>
            </div>

            <div className="grid grid-cols-4 gap-2">
                <CalculatorButton onClick={clearAll} className="bg-gray-600 hover:bg-gray-500">AC</CalculatorButton>
                <CalculatorButton onClick={toggleSign} className="bg-gray-600 hover:bg-gray-500">+/-</CalculatorButton>
                <CalculatorButton onClick={inputPercent} className="bg-gray-600 hover:bg-gray-500">%</CalculatorButton>
                <CalculatorButton onClick={() => handleOperator('÷')} className="bg-brand-accent hover:bg-brand-accent-hover">÷</CalculatorButton>

                <CalculatorButton onClick={() => inputDigit('7')} className="bg-gray-500 hover:bg-gray-400">7</CalculatorButton>
                <CalculatorButton onClick={() => inputDigit('8')} className="bg-gray-500 hover:bg-gray-400">8</CalculatorButton>
                <CalculatorButton onClick={() => inputDigit('9')} className="bg-gray-500 hover:bg-gray-400">9</CalculatorButton>
                <CalculatorButton onClick={() => handleOperator('×')} className="bg-brand-accent hover:bg-brand-accent-hover">×</CalculatorButton>

                <CalculatorButton onClick={() => inputDigit('4')} className="bg-gray-500 hover:bg-gray-400">4</CalculatorButton>
                <CalculatorButton onClick={() => inputDigit('5')} className="bg-gray-500 hover:bg-gray-400">5</CalculatorButton>
                <CalculatorButton onClick={() => inputDigit('6')} className="bg-gray-500 hover:bg-gray-400">6</CalculatorButton>
                <CalculatorButton onClick={() => handleOperator('-')} className="bg-brand-accent hover:bg-brand-accent-hover">-</CalculatorButton>

                <CalculatorButton onClick={() => inputDigit('1')} className="bg-gray-500 hover:bg-gray-400">1</CalculatorButton>
                <CalculatorButton onClick={() => inputDigit('2')} className="bg-gray-500 hover:bg-gray-400">2</CalculatorButton>
                <CalculatorButton onClick={() => inputDigit('3')} className="bg-gray-500 hover:bg-gray-400">3</CalculatorButton>
                <CalculatorButton onClick={() => handleOperator('+')} className="bg-brand-accent hover:bg-brand-accent-hover">+</CalculatorButton>

                <CalculatorButton onClick={() => inputDigit('0')} className="col-span-2 bg-gray-500 hover:bg-gray-400">0</CalculatorButton>
                <CalculatorButton onClick={inputDecimal} className="bg-gray-500 hover:bg-gray-400">.</CalculatorButton>
                <CalculatorButton onClick={handleEquals} className="bg-brand-accent hover:bg-brand-accent-hover">=</CalculatorButton>
            </div>

            {mode === 'scientific' && (
                 <div className="grid grid-cols-5 gap-2 mt-2 pt-2 border-t border-gray-700">
                    {scientificButtons.map(btn => (
                        <CalculatorButton key={btn.label} onClick={btn.func} className="bg-gray-600 hover:bg-gray-500 text-lg sm:text-xl">
                            {btn.label}
                        </CalculatorButton>
                    ))}
                 </div>
            )}
        </div>
    );
};