
import React from 'react';
import { Link } from 'react-router-dom';
import type { ICalculator, CalculatorCategory, IBlogPost } from './types';

// Icons
import { 
    HouseIcon, ScaleIcon, ChartPieIcon, LoanIcon, RetirementIcon, CryptoIcon, 
    FireIcon, CreditCardIcon, CarIcon, InflationIcon, CurrencyIcon, BodyFatIcon, 
    CalorieIcon, MacrosIcon, BMRIcon, WaterIcon, PregnancyIcon, ToolsIcon, 
    BusinessIcon, EducationIcon, TipIcon, VoltageDropIcon, PaintIcon,
    RoofPitchIcon, ConcreteIcon, FireHydrantIcon, SalesTaxIcon, TimeCardIcon,
    PercentageIcon, GPAIcon, UnitConverterIcon, DateCalcIcon, BreakEvenIcon, ROIIcon,
    ZScoreIcon
} from './components/icons';

// Calculator Components
import { MortgageCalculator } from './calculators/MortgageCalculator';
import { BMICalculator } from './calculators/BMICalculator';
import { CompoundInterestCalculator } from './calculators/InvestmentCalculator';
import { LoanRepaymentCalculator } from './calculators/LoanRepaymentCalculator';
import { RetirementSavingsCalculator } from './calculators/RetirementSavingsCalculator';
import { CryptoDCACalculator } from './calculators/CryptoDCACalculator';
import { FIRECalculator } from './calculators/FIRECalculator';
import { CreditCardPayoffCalculator } from './calculators/CreditCardPayoffCalculator';
import { ROICalculator } from './calculators/ROICalculator';
import { CarLoanCalculator } from './calculators/CarLoanCalculator';
import { InflationCalculator } from './calculators/InflationCalculator';
import { CurrencyConverter } from './calculators/CurrencyConverter';
import { BodyFatCalculator } from './calculators/BodyFatCalculator';
import { CalorieIntakeCalculator } from './calculators/CalorieIntakeCalculator';
import { MacrosCalculator } from './calculators/MacrosCalculator';
import { BMRCalculator } from './calculators/BMRCalculator';
import { WaterIntakeCalculator } from './calculators/WaterIntakeCalculator';
import { PregnancyDueDateCalculator } from './calculators/PregnancyDueDateCalculator';
import { FireHydrantFlowTestCalculator } from './calculators/FireHydrantFlowTestCalculator';
import { ConcreteVolumeCalculator } from './calculators/ConcreteVolumeCalculator';
import { PaintCoverageCalculator } from './calculators/PaintCoverageCalculator';
import { RoofPitchCalculator } from './calculators/RoofPitchCalculator';
import { VoltageDropCalculator } from './calculators/VoltageDropCalculator';
import { HourlyRateCalculator } from './calculators/HourlyRateCalculator';
import { ProfitMarginCalculator } from './calculators/ProfitMarginCalculator';
import { SalesTaxCalculator } from './calculators/SalesTaxCalculator';
import { BreakEvenCalculator } from './calculators/BreakEvenCalculator';
import { TimeCardCalculator } from './calculators/TimeCardCalculator';
import { PercentageCalculator } from './calculators/PercentageCalculator';
import { GPACalculator } from './calculators/GPACalculator';
import { UnitConverter } from './calculators/UnitConverter';
import { DateCalculator } from './calculators/DateCalculator';
import { TipCalculator } from './calculators/TipCalculator';
import { ZScoreCalculator } from './calculators/ZScoreCalculator';


export const SUPER_ADMIN_EMAIL = 'acostajohn.qe@gmail.com';

export const CALCULATOR_CATEGORIES: CalculatorCategory[] = [
    'Finance',
    'Health & Fitness',
    'Education & Everyday',
    'Business & Productivity',
    'Engineering & Construction',
];

export const CALCULATORS: ICalculator[] = [
  // Finance
  {
    id: 'mortgage-calculator',
    title: 'Mortgage Calculator',
    description: 'Estimate monthly mortgage payments with taxes and insurance.',
    explanation: React.createElement('p', null, `Our Mortgage Calculator helps you estimate your monthly payment for a new home, including principal, interest, property taxes, and homeowners insurance. By adjusting variables like the home price, down payment, interest rate, and loan term, you can see how each factor impacts your monthly cost and the total amount you'll pay over the life of the loan. This is a crucial first step in the home-buying process.`),
    category: 'Finance',
    component: MortgageCalculator,
    Icon: HouseIcon,
    faq: [
      {
        q: 'What is PITI?',
        a: 'PITI stands for Principal, Interest, Taxes, and Insurance. These are the four main components that make up a typical monthly mortgage payment. Our calculator helps you estimate all of them to give you a complete picture of your monthly housing cost.'
      },
      {
        q: 'How does my down payment affect my mortgage?',
        a: 'A larger down payment reduces the total amount you need to borrow (the principal). This results in a lower monthly payment and less total interest paid over the life of the loan. It can also help you avoid Private Mortgage Insurance (PMI).'
      },
      {
        q: 'Why are property taxes and home insurance included?',
        a: 'While not part of the loan itself, most lenders collect funds for property taxes and homeowners insurance in an escrow account and pay them on your behalf. Including them in the calculation gives you a much more accurate estimate of your total monthly housing cost.'
      }
    ]
  },
  {
    id: 'loan-repayment-calculator',
    title: 'Loan Repayment Calculator',
    description: 'Calculate payments for personal loans, auto loans, and more.',
    explanation: React.createElement('p', null, `This versatile tool helps you understand the repayment details for any fixed-rate loan, such as a car loan or personal loan. Enter the loan amount, interest rate, and term to find your monthly payment and see a breakdown of total principal and interest paid. It empowers you to compare loan offers and plan your budget effectively.`),
    category: 'Finance',
    component: LoanRepaymentCalculator,
    Icon: LoanIcon,
  },
  {
    id: 'compound-interest-calculator',
    title: 'Compound Interest Calculator',
    description: 'Project the future growth of your investments over time.',
    explanation: React.createElement('p', null, `See how your investments can grow with the power of compound interest. This calculator helps you visualize the future value of your initial investment, plus any regular contributions you make. It's a powerful tool for retirement planning, savings goals, and understanding the long-term benefits of consistent investing.`),
    category: 'Finance',
    component: CompoundInterestCalculator,
    Icon: ChartPieIcon,
  },
  { 
    id: 'retirement-savings-calculator', 
    title: 'Retirement Savings', 
    description: 'Plan your path to a comfortable retirement.', 
    category: 'Finance', 
    component: RetirementSavingsCalculator, 
    Icon: RetirementIcon, 
    explanation: React.createElement('p', null, 'This calculator helps you determine if your retirement savings are on track. Enter your current financial details and retirement goals to see a projection of your savings growth and how much you can expect to have when you retire.')
  },
  { 
    id: 'crypto-dca-calculator', 
    title: 'Crypto DCA Calculator', 
    description: 'Simulate your dollar-cost averaging crypto strategy.', 
    category: 'Finance', 
    component: CryptoDCACalculator, 
    Icon: CryptoIcon, 
    explanation: React.createElement('p', null, 'Dollar-Cost Averaging (DCA) involves investing a fixed amount of money at regular intervals. This calculator helps you see how a DCA strategy would perform by calculating the average cost of your tokens based on a series of historical or hypothetical prices.')
  },
  { 
    id: 'fire-calculator', 
    title: 'FIRE Calculator', 
    description: 'Calculate your number for Financial Independence, Retire Early.', 
    category: 'Finance', 
    component: FIRECalculator, 
    Icon: FireIcon, 
    explanation: React.createElement('p', null, 'The Financial Independence, Retire Early (FIRE) movement is about accumulating enough assets to live off the investment income. This calculator helps you find your "FIRE number" (typically 25x your annual expenses) and estimates how many years it will take to reach it.')
  },
  { 
    id: 'credit-card-payoff-calculator', 
    title: 'Credit Card Payoff', 
    description: 'Find the fastest way to pay off credit card debt.', 
    category: 'Finance', 
    component: CreditCardPayoffCalculator, 
    Icon: CreditCardIcon, 
    explanation: React.createElement('p', null, 'High-interest credit card debt can be a significant burden. Use this calculator to create a payoff plan. By inputting your balance, APR, and desired monthly payment, you can see how long it will take to become debt-free and how much you\'ll pay in total interest.')
  },
  { 
    id: 'investment-return-calculator', 
    title: 'Investment Return (ROI)', 
    description: 'Calculate the return on investment for any asset.', 
    category: 'Finance', 
    component: ROICalculator, 
    Icon: ROIIcon, 
    explanation: React.createElement('p', null, 'Return on Investment (ROI) is a simple but powerful metric to evaluate the profitability of an investment. It measures the gain or loss generated on an investment relative to the amount of money invested. This calculator gives you the ROI percentage and the net profit.')
  },
  { 
    id: 'car-loan-calculator', 
    title: 'Car Loan Calculator', 
    description: 'Estimate monthly payments for your new or used car.', 
    category: 'Finance', 
    component: CarLoanCalculator, 
    Icon: CarIcon, 
    explanation: React.createElement('p', null, 'Before you head to the dealership, use this calculator to estimate your monthly car payment. Input the vehicle price, your down payment, the interest rate (APR), and the loan term to understand your potential costs and budget accordingly.')
  },
  { 
    id: 'inflation-calculator', 
    title: 'Inflation Calculator', 
    description: 'See how inflation affects the purchasing power of money.', 
    category: 'Finance', 
    component: InflationCalculator, 
    Icon: InflationIcon, 
    explanation: React.createElement('p', null, 'Inflation erodes the value of money over time. This calculator uses historical Consumer Price Index (CPI) data to show you what a certain amount of money from a past year would be worth today, or vice-versa. It helps you understand the real growth of your investments and wages.')
  },
  { 
    id: 'currency-converter', 
    title: 'Currency Converter', 
    description: 'Perform conversions with the latest exchange rates.', 
    category: 'Finance', 
    component: CurrencyConverter, 
    Icon: CurrencyIcon, 
    explanation: React.createElement('p', null, 'Whether you are traveling, shopping online, or investing internationally, this tool helps you convert between currencies. For accuracy, please provide the current exchange rate, as rates fluctuate constantly.')
  },

  // Health & Fitness
  {
    id: 'bmi-calculator',
    title: 'BMI Calculator',
    description: 'Calculate your Body Mass Index to assess your weight status.',
    explanation: React.createElement('p', null, `The Body Mass Index (BMI) is a measure that uses your height and weight to work out if your weight is healthy. Enter your details to find out your BMI and see which category you fall into, from underweight to obesity. While not a perfect diagnostic tool, it's a widely used and helpful starting point for assessing weight-related health risk.`),
    category: 'Health & Fitness',
    component: BMICalculator,
    Icon: ScaleIcon,
  },
  { 
    id: 'body-fat-calculator', 
    title: 'Body Fat Percentage', 
    description: 'Estimate your body fat using the U.S. Navy method.', 
    category: 'Health & Fitness', 
    component: BodyFatCalculator, 
    Icon: BodyFatIcon, 
    explanation: React.createElement('p', null, 'Go beyond the scale with this body fat calculator. Using the U.S. Navy method, it estimates your body fat percentage based on your height and circumference measurements (neck, waist, and hips for women). It provides a more complete picture of your body composition than BMI alone.')
  },
  { 
    id: 'calorie-intake-calculator', 
    title: 'Calorie Intake Calculator', 
    description: 'Calculate your daily calorie needs for weight goals.', 
    category: 'Health & Fitness', 
    component: CalorieIntakeCalculator, 
    Icon: CalorieIcon, 
    explanation: React.createElement('p', null, 'This calculator uses the Mifflin-St Jeor equation, one of the most accurate methods for estimating your Basal Metabolic Rate (BMR). It then factors in your activity level to determine your total daily calorie needs for maintaining, losing, or gaining weight.')
  },
  { 
    id: 'macros-calculator', 
    title: 'Macros Calculator', 
    description: 'Determine your optimal macronutrient intake.', 
    category: 'Health & Fitness', 
    component: MacrosCalculator, 
    Icon: MacrosIcon, 
    explanation: React.createElement('p', null, 'Macronutrients—protein, carbohydrates, and fat—are the building blocks of your diet. This tool helps you break down your daily calorie goal into grams of each macro based on popular diet plans like balanced, low-carb, or high-protein, helping you tailor your nutrition to your specific fitness goals.')
  },
  { 
    id: 'bmr-calculator', 
    title: 'BMR Calculator', 
    description: 'Find your Basal Metabolic Rate.', 
    category: 'Health & Fitness', 
    component: BMRCalculator, 
    Icon: BMRIcon, 
    explanation: React.createElement('p', null, 'Your Basal Metabolic Rate (BMR) is the number of calories your body needs to perform basic, life-sustaining functions at rest. Knowing your BMR is the first step in determining your total daily calorie needs. This calculator uses the Mifflin-St Jeor equation for an accurate estimate.')
  },
  { 
    id: 'water-intake-calculator', 
    title: 'Water Intake Calculator', 
    description: 'Estimate your daily hydration needs.', 
    category: 'Health & Fitness', 
    component: WaterIntakeCalculator, 
    Icon: WaterIcon, 
    explanation: React.createElement('p', null, 'Proper hydration is crucial for health and performance. This calculator provides a recommendation for daily water intake based on your body weight and accounts for additional water needed due to physical activity.')
  },
  { 
    id: 'pregnancy-due-date-calculator', 
    title: 'Pregnancy Due Date', 
    description: 'Estimate your baby\'s due date.', 
    category: 'Health & Fitness', 
    component: PregnancyDueDateCalculator, 
    Icon: PregnancyIcon, 
    explanation: React.createElement('p', null, 'Estimate your baby\'s arrival with this due date calculator. It uses Naegele\'s rule, a standard method for calculating the estimated due date (EDD) based on the first day of your last menstrual period (LMP).')
  },

  // Engineering & Construction
  { 
    id: 'fire-hydrant-flow-test-calculator', 
    title: 'Fire Hydrant Flow Test', 
    description: 'Calculate hydrant flow rates for fire safety.', 
    category: 'Engineering & Construction', 
    component: FireHydrantFlowTestCalculator, 
    Icon: FireHydrantIcon, 
    explanation: React.createElement('p', null, 'Used by firefighters and engineers, this calculator determines the flow rate of a fire hydrant in Gallons Per Minute (GPM). It uses a standard formula based on the pitot pressure reading, nozzle diameter, and discharge coefficient.')
  },
  { 
    id: 'concrete-volume-calculator', 
    title: 'Concrete Volume Calculator', 
    description: 'Estimate the concrete needed for a slab or footing.', 
    category: 'Engineering & Construction', 
    component: ConcreteVolumeCalculator, 
    Icon: ConcreteIcon, 
    explanation: React.createElement('p', null, 'Whether you\'re pouring a slab, footing, or column, ordering the right amount of concrete is critical. This calculator helps you estimate the required volume in cubic yards based on the dimensions of your project, preventing costly shortages or overages.')
  },
  { 
    id: 'paint-coverage-calculator', 
    title: 'Paint Coverage Calculator', 
    description: 'Estimate how much paint you need for your project.', 
    category: 'Engineering & Construction', 
    component: PaintCoverageCalculator, 
    Icon: PaintIcon, 
    explanation: React.createElement('p', null, 'Avoid buying too much or too little paint. This calculator helps you determine the number of gallons needed for your project based on the total area to be painted, the number of coats, and the coverage rating of your paint.')
  },
  { 
    id: 'roof-pitch-calculator', 
    title: 'Roof Pitch Calculator', 
    description: 'Calculate the pitch, angle, and slope of a roof.', 
    category: 'Engineering & Construction', 
    component: RoofPitchCalculator, 
    Icon: RoofPitchIcon, 
    explanation: React.createElement('p', null, 'The pitch of a roof is its vertical rise for every 12 inches of horizontal run. This tool calculates the roof pitch (e.g., 6:12) and the corresponding angle in degrees, essential information for roofing projects and architectural planning.')
  },
  { 
    id: 'voltage-drop-calculator', 
    title: 'Voltage Drop Calculator', 
    description: 'Determine voltage drop across an electrical circuit.', 
    category: 'Engineering & Construction', 
    component: VoltageDropCalculator, 
    Icon: VoltageDropIcon, 
    explanation: React.createElement('p', null, 'Voltage drop can cause poor performance or damage to electrical equipment. This calculator helps electricians determine the voltage drop and percentage drop in a circuit based on wire material, size (AWG), distance, and current, ensuring the installation is safe and efficient.')
  },

  // Business & Productivity
  { 
    id: 'hourly-rate-calculator', 
    title: 'Hourly Rate Calculator', 
    description: 'Determine your hourly rate from a desired salary.', 
    category: 'Business & Productivity', 
    component: HourlyRateCalculator, 
    Icon: BusinessIcon, 
    explanation: React.createElement('p', null, 'For freelancers and consultants, setting the right hourly rate is crucial. This calculator helps you determine what to charge per hour to meet your desired annual salary, factoring in your billable hours per week and working weeks per year.')
  },
  { 
    id: 'profit-margin-calculator', 
    title: 'Profit Margin Calculator', 
    description: 'Calculate the profit margin for your business.', 
    category: 'Business & Productivity', 
    component: ProfitMarginCalculator, 
    Icon: ChartPieIcon, 
    explanation: React.createElement('p', null, 'Profit margin is a key indicator of a company\'s financial health. This calculator computes the gross profit and gross profit margin percentage based on your total revenue and cost of goods sold (COGS).')
  },
  { 
    id: 'sales-tax-calculator', 
    title: 'Sales Tax Calculator', 
    description: 'Quickly add or subtract sales tax from a price.', 
    category: 'Business & Productivity', 
    component: SalesTaxCalculator, 
    Icon: SalesTaxIcon, 
    explanation: React.createElement('p', null, 'A simple tool for consumers and small business owners. Quickly calculate the final price of a product including sales tax, or work backwards to find the pre-tax price from a total amount.')
  },
  { 
    id: 'break-even-calculator', 
    title: 'Break-Even Point Calculator', 
    description: 'Find the point where revenue equals costs.', 
    category: 'Business & Productivity', 
    component: BreakEvenCalculator, 
    Icon: BreakEvenIcon, 
    explanation: React.createElement('p', null, 'The break-even point is the level of sales at which a company covers all its costs. This calculator helps you find the number of units you need to sell to break even, based on your fixed costs, variable costs per unit, and sale price per unit.')
  },
  { 
    id: 'roi-calculator', 
    title: 'ROI Calculator', 
    description: 'Calculate the Return on Investment for a project.', 
    category: 'Business & Productivity', 
    component: ROICalculator, 
    Icon: ROIIcon, 
    explanation: React.createElement('p', null, 'Return on Investment (ROI) is a simple but powerful metric to evaluate the profitability of an investment. It measures the gain or loss generated on an investment relative to the amount of money invested. This calculator gives you the ROI percentage and the net profit.')
  },
  { 
    id: 'time-card-calculator', 
    title: 'Time Card Calculator', 
    description: 'Calculate hours worked from time-in and time-out.', 
    category: 'Business & Productivity', 
    component: TimeCardCalculator, 
    Icon: TimeCardIcon, 
    explanation: React.createElement('p', null, 'Easily calculate the total hours worked in a day. Enter your start time, end time, and any break time in minutes to get the total duration in both HH:MM format and decimal format, perfect for payroll and invoicing.')
  },
  
  // Education & Everyday
  { 
    id: 'percentage-calculator', 
    title: 'Percentage Calculator', 
    description: 'Perform various percentage calculations easily.', 
    category: 'Education & Everyday', 
    component: PercentageCalculator, 
    Icon: PercentageIcon, 
    explanation: React.createElement('p', null, 'A versatile tool for everyday math. This calculator handles three common percentage problems: finding a percentage of a number, figuring out what percentage one number is of another, and calculating the percentage change between two numbers.')
  },
  { 
    id: 'z-score-calculator', 
    title: 'Z-Score Calculator', 
    description: 'Find how many standard deviations a value is from the mean.', 
    category: 'Education & Everyday', 
    component: ZScoreCalculator, 
    Icon: ZScoreIcon, 
    explanation: React.createElement('p', null, 'The Z-Score Calculator measures how many standard deviations a data point is from the mean of a dataset. It is a crucial tool in statistics for standardizing values from different distributions, allowing you to compare them. Enter a raw score, the population mean, and the population standard deviation to find the Z-score.')
  },
  { 
    id: 'gpa-calculator', 
    title: 'GPA Calculator', 
    description: 'Calculate your Grade Point Average (GPA).', 
    category: 'Education & Everyday', 
    component: GPACalculator, 
    Icon: GPAIcon, 
    explanation: React.createElement('p', null, 'Calculate your semester or cumulative Grade Point Average (GPA). Add your courses, enter the number of credits and the letter grade for each, and the calculator will compute your GPA on a standard 4.0 scale.')
  },
  { 
    id: 'unit-converter', 
    title: 'Unit Converter', 
    description: 'Convert length, mass, volume, and more.', 
    category: 'Education & Everyday', 
    component: UnitConverter, 
    Icon: UnitConverterIcon, 
    explanation: React.createElement('p', null, 'A handy converter for common units of measurement. Switch between length, mass, and volume to quickly convert values from one unit to another (e.g., feet to meters, pounds to kilograms, or gallons to liters).')
  },
  { 
    id: 'date-calculator', 
    title: 'Date Calculator', 
    description: 'Find the difference between two dates or add/subtract days.', 
    category: 'Education & Everyday', 
    component: DateCalculator, 
    Icon: DateCalcIcon, 
    explanation: React.createElement('p', null, 'This tool has two functions: it can calculate the total number of days between two dates, or it can add or subtract a specific number of days from a given date to find a new date. Perfect for project planning or tracking milestones.')
  },
  { 
    id: 'tip-calculator', 
    title: 'Tip Calculator', 
    description: 'Calculate the tip and split the bill with friends.', 
    category: 'Education & Everyday', 
    component: TipCalculator, 
    Icon: TipIcon, 
    explanation: React.createElement('p', null, 'Take the guesswork out of dining out. This calculator helps you quickly figure out the tip amount, the total bill, and how much each person owes when splitting the check with friends.')
  },
];

export const BLOG_POSTS: IBlogPost[] = [
  {
    id: 'understanding-compound-interest',
    title: 'The Magic of Compound Interest: Grow Your Wealth Faster',
    summary: 'Discover how compound interest works and why Albert Einstein reportedly called it the "eighth wonder of the world." Learn how to make it work for you.',
    date: 'October 26, 2023',
    author: 'Jane Doe',
    relatedCalculatorId: 'compound-interest-calculator',
    content: React.createElement('div', null,
      React.createElement('p', null, 'Compound interest is the interest you earn on both your original money and the interest it has already earned. It\'s a powerful concept that can significantly boost your savings over time. This post will break down how it works.'),
      React.createElement('h4', null, 'How It Works'),
      React.createElement('p', null, 'Imagine you invest $1,000 at a 5% annual interest rate. After the first year, you\'ll have $1,050. In the second year, you\'ll earn 5% on $1,050, not just the original $1,000. This means you earn interest on your interest, causing your investment to grow at an accelerating rate.'),
      React.createElement('p', null, 'You can use our ', React.createElement(Link, { to: "/calculator/compound-interest-calculator", className: "text-slate-900 font-semibold" }, 'Compound Interest Calculator'), ' to see this effect for yourself.')
    )
  },
  {
    id: 'demystifying-bmi',
    title: 'What Is BMI and Is It an Accurate Measure of Health?',
    summary: 'Body Mass Index (BMI) is a common metric for assessing weight, but how useful is it really? We explore the pros and cons of using BMI to gauge your health.',
    date: 'October 22, 2023',
    author: 'John Smith',
    relatedCalculatorId: 'bmi-calculator',
    content: React.createElement('div', null,
      React.createElement('p', null, 'Body Mass Index (BMI) is a simple calculation using a person\'s height and weight. The formula is BMI = kg/m², where kg is a person\'s weight in kilograms and m² is their height in metres squared. A high BMI can indicate high body fatness.'),
      React.createElement('h4', null, 'Limitations of BMI'),
      React.createElement('p', null, 'While BMI can be a useful screening tool, it does not diagnose the body fatness or health of an individual. For example, muscular individuals may have a high BMI but low body fat. It\'s best used in conjunction with other measures like waist circumference.'),
      React.createElement('p', null, 'Check your own stats with our ', React.createElement(Link, { to: "/calculator/bmi-calculator", className: "text-slate-900 font-semibold" }, 'BMI Calculator'), '.')
    )
  },
  {
    id: 'mortgage-basics',
    title: 'Mortgage 101: Understanding Your Monthly Payment',
    summary: 'Buying a home is a huge step. We break down the components of a typical mortgage payment so you can budget with confidence.',
    date: 'October 15, 2023',
    author: 'Emily White',
    relatedCalculatorId: 'mortgage-calculator',
    content: React.createElement('div', null,
      React.createElement('p', null, 'Your monthly mortgage payment is often more than just the loan amount. It typically includes four parts, often abbreviated as PITI:'),
      React.createElement('ul', null, 
        React.createElement('li', null, React.createElement('strong', null, 'Principal:'), ' The amount you borrowed.'),
        React.createElement('li', null, React.createElement('strong', null, 'Interest:'), ' The cost of borrowing the money.'),
        React.createElement('li', null, React.createElement('strong', null, 'Taxes:'), ' Property taxes charged by your local government.'),
        React.createElement('li', null, React.createElement('strong', null, 'Insurance:'), ' Homeowner\'s insurance to protect against damage.')
      ),
      React.createElement('p', null, 'Our ', React.createElement(Link, { to: "/calculator/mortgage-calculator", className: "text-slate-900 font-semibold" }, 'Mortgage Calculator'), ' can help you estimate all these costs.')
    )
  },
];
