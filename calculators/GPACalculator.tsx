import React, { useState, useMemo } from 'react';
import { XIcon } from '../components/icons';

const gradePoints = { 'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7, 'C+': 2.3, 'C': 2.0, 'C-': 1.7, 'D+': 1.3, 'D': 1.0, 'F': 0.0 };

export const GPACalculator: React.FC = () => {
    const [courses, setCourses] = useState([
        { name: 'Biology 101', credits: '3', grade: 'A' },
        { name: 'History 205', credits: '3', grade: 'B+' },
        { name: 'Math 300', credits: '4', grade: 'A-' },
    ]);

    const handleCourseChange = (index, field, value) => {
        const newCourses = [...courses];
        newCourses[index][field] = value;
        setCourses(newCourses);
    };
    
    const addCourse = () => {
        setCourses([...courses, { name: '', credits: '3', grade: 'A' }]);
    };
    
    const removeCourse = (index) => {
        const newCourses = courses.filter((_, i) => i !== index);
        setCourses(newCourses);
    };

    const gpa = useMemo(() => {
        let totalPoints = 0;
        let totalCredits = 0;
        courses.forEach(course => {
            const credits = parseFloat(course.credits);
            const points = gradePoints[course.grade];
            if (!isNaN(credits) && points !== undefined && credits > 0) {
                totalPoints += credits * points;
                totalCredits += credits;
            }
        });
        return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';
    }, [courses]);

    return (
        <div className="space-y-6">
            <div className="p-6 rounded-lg bg-brand-light-gray text-center">
                <p className="text-slate-500 text-lg">Your GPA</p>
                <p className="text-5xl font-extrabold text-slate-900">{gpa}</p>
            </div>
            
            <div className="space-y-3 pt-6 border-t border-slate-200">
                <div className="hidden md:grid grid-cols-12 gap-4 text-sm font-bold text-slate-600 px-3">
                    <div className="col-span-6">Course Name (Optional)</div>
                    <div className="col-span-2">Credits</div>
                    <div className="col-span-3">Grade</div>
                </div>
                {courses.map((course, index) => (
                    <div key={index} className="grid grid-cols-12 gap-2 items-center">
                        <input type="text" placeholder="e.g., Biology 101" value={course.name} onChange={e => handleCourseChange(index, 'name', e.target.value)} className="col-span-12 md:col-span-6 w-full p-2 bg-brand-light-gray border-transparent focus:ring-2 focus:ring-slate-400 focus:outline-none rounded-md" />
                        <input type="number" value={course.credits} onChange={e => handleCourseChange(index, 'credits', e.target.value)} className="col-span-5 md:col-span-2 w-full p-2 bg-brand-light-gray border-transparent focus:ring-2 focus:ring-slate-400 focus:outline-none rounded-md" />
                        <select value={course.grade} onChange={e => handleCourseChange(index, 'grade', e.target.value)} className="col-span-5 md:col-span-3 w-full p-2 bg-brand-light-gray border-transparent focus:ring-2 focus:ring-slate-400 focus:outline-none rounded-md">
                            {Object.keys(gradePoints).map(g => <option key={g} value={g}>{g}</option>)}
                        </select>
                        <button onClick={() => removeCourse(index)} className="col-span-2 md:col-span-1 text-slate-400 hover:text-slate-600 transition-colors flex justify-center">
                            <XIcon className="h-5 w-5" />
                        </button>
                    </div>
                ))}
            </div>
            <button onClick={addCourse} className="w-full py-2 px-4 bg-slate-100 text-slate-700 rounded-md font-semibold hover:bg-slate-200 transition-colors">
                + Add Course
            </button>
        </div>
    );
};