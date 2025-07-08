import React from 'react';

export type CalculatorCategory = 
  | 'Finance'
  | 'Health & Fitness'
  | 'Engineering & Construction'
  | 'Business & Productivity'
  | 'Education & Everyday';

export interface ICalculator {
  id: string;
  title: string;
  description: string;
  explanation: React.ReactNode; // Can include JSX for better formatting
  category: CalculatorCategory;
  component: React.ComponentType;
  Icon: React.ComponentType<{ className?: string }>;
  faq?: { q: string; a: string }[];
}

export interface IBlogPost {
  id: string;
  title:string;
  summary: string;
  date: string;
  author: string;
  content: React.ReactNode | string;
  relatedCalculatorId?: string;
}