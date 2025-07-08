
import React, { useState, useEffect, useRef } from 'react';
import { CalculatorIcon, XIcon, MinimizeIcon, MaximizeIcon } from './icons';
import { StandardScientificCalculator } from '../calculators/StandardScientificCalculator';

const FloatingStandardCalculatorWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [position, setPosition] = useState({ x: window.innerWidth - 420 - 32, y: window.innerHeight - 700 - 32});
    const ref = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const offset = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseUp = () => {
            isDragging.current = false;
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (isDragging.current && ref.current) {
                e.preventDefault();
                setPosition({
                    x: e.clientX - offset.current.x,
                    y: e.clientY - offset.current.y,
                });
            }
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (ref.current) {
            isDragging.current = true;
            offset.current = {
                x: e.clientX - ref.current.getBoundingClientRect().left,
                y: e.clientY - ref.current.getBoundingClientRect().top,
            };
        }
    };
    
    const toggleOpen = () => setIsOpen(!isOpen);
    const minimize = () => setIsMinimized(true);
    const maximize = () => setIsMinimized(false);
    const close = () => {
        setIsOpen(false);
        setIsMinimized(false);
    };

    if (!isOpen) {
        return (
            <button
                onClick={toggleOpen}
                className="fixed bottom-28 right-8 bg-brand-primary text-white p-4 rounded-full shadow-lg hover:bg-brand-primary-hover transition-all duration-300 transform hover:scale-110 z-50"
                aria-label="Open Standard Calculator"
            >
                <CalculatorIcon className="h-7 w-7" />
            </button>
        );
    }
    
    if (isMinimized) {
        return (
            <div className="fixed bottom-0 right-8 bg-white/80 backdrop-blur-lg rounded-t-lg shadow-2xl z-[99] flex items-center justify-between px-4 py-2 w-72">
                <p className="font-bold text-slate-700">Calculator</p>
                <div className="flex items-center gap-2">
                    <button onClick={maximize} className="text-slate-500 hover:text-slate-800 p-1"><MaximizeIcon className="h-5 w-5"/></button>
                    <button onClick={close} className="text-slate-500 hover:text-slate-800 p-1"><XIcon className="h-5 w-5"/></button>
                </div>
            </div>
        )
    }

    return (
        <div 
            ref={ref}
            style={{ top: `${position.y}px`, left: `${position.x}px` }}
            className="fixed bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl z-[99] w-[420px] overflow-hidden"
        >
            <div 
                className="flex justify-between items-center p-3 border-b border-slate-200 cursor-move"
                onMouseDown={handleMouseDown}
            >
                <h2 className="font-bold text-slate-700 pl-2">Calculator</h2>
                <div className="flex items-center gap-2">
                    <button onClick={minimize} className="text-slate-500 hover:text-slate-800 p-1"><MinimizeIcon className="h-5 w-5"/></button>
                    <button onClick={close} className="text-slate-500 hover:text-slate-800 p-1"><XIcon className="h-5 w-5"/></button>
                </div>
            </div>
            <div className="p-2">
                <StandardScientificCalculator />
            </div>
        </div>
    );
};

export default FloatingStandardCalculatorWidget;