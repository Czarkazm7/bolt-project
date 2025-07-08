
import React from 'react';

// Feature Icons
export const AnalysisIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
        <defs>
            <radialGradient id="analysisGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" style={{ stopColor: '#f9a8d4', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#c084fc', stopOpacity: 1 }} />
            </radialGradient>
        </defs>
        <circle cx="50" cy="25" r="12" fill="url(#analysisGradient)" opacity="0.9" />
        <path d="M50 37 V 55" stroke="#d8b4fe" strokeWidth="3" />
        <circle cx="25" cy="75" r="9" fill="url(#analysisGradient)" opacity="0.9" />
        <path d="M50 60 C 40 60, 30 65, 25 75" stroke="#d8b4fe" strokeWidth="3" fill="none" />
        <circle cx="50" cy="75" r="9" fill="url(#analysisGradient)" opacity="0.9" />
        <path d="M50 60 V 75" stroke="#d8b4fe" strokeWidth="3" fill="none" />
        <circle cx="75" cy="75" r="9" fill="url(#analysisGradient)" opacity="0.9" />
        <path d="M50 60 C 60 60, 70 65, 75 75" stroke="#d8b4fe" strokeWidth="3" fill="none" />
    </svg>
);

export const SpeedIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
        <defs>
            <linearGradient id="speedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#93c5fd' }} />
                <stop offset="100%" style={{ stopColor: '#60a5fa' }} />
            </linearGradient>
        </defs>
        <path d="M20 30 Q 30 10, 50 30 T 80 30" stroke="url(#speedGradient)" strokeWidth="12" fill="none" strokeLinecap="round" />
        <path d="M20 70 Q 30 90, 50 70 T 80 70" stroke="url(#speedGradient)" strokeWidth="12" fill="none" strokeLinecap="round" opacity="0.6" />
    </svg>
);

export const TrustIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
        <defs>
            <linearGradient id="trustGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#86efac' }} />
                <stop offset="100%" style={{ stopColor: '#34d399' }} />
            </linearGradient>
        </defs>
        <rect x="30" y="20" width="40" height="40" rx="10" fill="url(#trustGradient)" />
        <rect x="35" y="28" width="30" height="4" rx="2" fill="white" opacity="0.7" />
        <rect x="35" y="38" width="30" height="4" rx="2" fill="white" opacity="0.7" />
        <rect x="35" y="48" width="20" height="4" rx="2" fill="white" opacity="0.7" />
        <rect x="30" y="65" width="40" height="15" rx="5" fill="#e5e7eb" />
        <circle cx="40" cy="85" r="8" fill="url(#trustGradient)" />
        <circle cx="60" cy="85" r="8" fill="url(#trustGradient)" />
    </svg>
);

export const LibraryIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
        <defs>
            <linearGradient id="libraryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#fcd34d' }} />
                <stop offset="100%" style={{ stopColor: '#fbbf24' }} />
            </linearGradient>
            <symbol id="hexagon" viewBox="0 0 20 23">
                <path d="M10 0 L20 5.77 V17.23 L10 23 L0 17.23 V5.77 Z" />
            </symbol>
        </defs>
        <use href="#hexagon" x="40" y="5" width="20" height="23" fill="url(#libraryGradient)" opacity="0.9" />
        <use href="#hexagon" x="20" y="28" width="20" height="23" fill="url(#libraryGradient)" opacity="0.9" />
        <use href="#hexagon" x="60" y="28" width="20" height="23" fill="url(#libraryGradient)" opacity="0.9" />
        <use href="#hexagon" x="40" y="51" width="20" height="23" fill="url(#libraryGradient)" opacity="0.9" />
        <use href="#hexagon" x="20" y="74" width="20" height="23" fill="url(#libraryGradient)" opacity="0.9" />
        <use href="#hexagon" x="60" y="74" width="20" height="23" fill="url(#libraryGradient)" opacity="0.9" />
        <path d="M50 28 L30 39" stroke="#fde68a" strokeWidth="2" />
        <path d="M50 28 L70 39" stroke="#fde68a" strokeWidth="2" />
        <path d="M30 49 L50 62" stroke="#fde68a" strokeWidth="2" />
        <path d="M70 49 L50 62" stroke="#fde68a" strokeWidth="2" />
        <path d="M30 85 L50 72" stroke="#fde68a" strokeWidth="2" />
        <path d="M70 85 L50 72" stroke="#fde68a" strokeWidth="2" />
    </svg>
);

export const SparklesIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.572L16.5 21.75l-.398-1.178a3.375 3.375 0 00-2.456-2.456L12.5 18l1.178-.398a3.375 3.375 0 002.456-2.456L16.5 14.25l.398 1.178a3.375 3.375 0 002.456 2.456L20.5 18l-1.178.398a3.375 3.375 0 00-2.456 2.456z" />
    </svg>
);


// UI Icons
export const CalendarIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18" />
    </svg>
);
export const UserIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
);
export const ChevronRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
);

export const CalculatorIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 3h.008v.008H8.25v-.008zm0 3h.008v.008H8.25v-.008zm3-6h.008v.008H11.25v-.008zm0 3h.008v.008H11.25v-.008zm0 3h.008v.008H11.25v-.008zm3-6h.008v.008H14.25v-.008zm0 3h.008v.008H14.25v-.008zM4.5 3.75h15A2.25 2.25 0 0121.75 6v12a2.25 2.25 0 01-2.25 2.25h-15A2.25 2.25 0 012.25 18V6A2.25 2.25 0 014.5 3.75z" />
    </svg>
);

export const LockClosedIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 00-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    </svg>
);

export const HouseIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
);

export const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export const MinimizeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
    </svg>
);

export const MaximizeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m4.5 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
    </svg>
);

export const SearchIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
);

export const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v7.005A9.953 9.953 0 0022 12z" />
    </svg>
);

export const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

export const LinkedInIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
);


// Calculator Icons
export const ScaleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 20.25c1.623 0 2.99-1.352 3.25-3V9.75c0-1.657-1.343-3-3-3h-1.372c-.863 0-1.66.38-2.228 1.002L12 10.5M3.75 20.25c-1.623 0-2.99-1.352-3.25-3V9.75c0-1.657 1.343-3 3-3h1.372c.863 0 1.66.38 2.228 1.002L12 10.5" />
    </svg>
);
export const ChartPieIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
    </svg>
);
export const LoanIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.75A.75.75 0 013 4.5h.75m0 0h.75A.75.75 0 015.25 6v.75m0 0v-.75A.75.75 0 014.5 6h-.75m16.5 0h.75a.75.75 0 01.75.75v.75a.75.75 0 01-.75.75h-.75m0 0h-.75a.75.75 0 01-.75-.75v-.75c0-.414.336-.75.75-.75h.75m0 0h.75a.75.75 0 01.75.75v.75a.75.75 0 01-.75.75h-.75M12 12.75a3 3 0 100-6 3 3 0 000 6z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12.75c0 .414-.336.75-.75.75h-4.5a.75.75 0 01-.75-.75v-2.25c0-.414.336-.75.75-.75h4.5a.75.75 0 01.75.75v2.25z" />
  </svg>
);
export const RetirementIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 21.75c-4.82.75-9.25-2.25-9.25-6.75s4.43-7.5 9.25-6.75c.33.045.66.105.98.18l-1.06-4.86c-.22-.99.55-1.94 1.59-1.94h.28c1.04 0 1.81.95 1.59 1.94l-1.06 4.86c.32-.075.65-.135.98-.18 4.82-.75 9.25 2.25 9.25 6.75s-4.43 7.5-9.25 6.75c-.33-.045-.66-.105-.98-.18l1.06 4.86c.22.99-.55 1.94-1.59 1.94h-.28c-1.04 0-1.81-.95-1.59-1.94l1.06-4.86a6.9 6.9 0 01-.98.18z" />
  </svg>
);
export const CryptoIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-6h6m-6 4.5h6m-6-9h6" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5h7.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 16.5h7.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
  </svg>
);
export const FireIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.62a8.983 8.983 0 013.362-3.797A8.333 8.333 0 0112 5.875a8.25 8.25 0 013.362-.66zM12 5.875a8.25 8.25 0 00-3.362.66c-1.29.36-2.433 1.02-3.437 1.868m12.374.002c.865.063 1.69.248 2.47.514" />
  </svg>
);
export const CreditCardIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h6m3-5.25H21.75m-3-1.5H21.75M3 17.25a3 3 0 003 3h12a3 3 0 003-3v-8.25a3 3 0 00-3-3H6a3 3 0 00-3 3v8.25z" />
  </svg>
);
export const CarIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375c-1.026 0-1.945-.694-2.252-1.664l-1.226-4.896a1.875 1.875 0 01.39-1.836l2.427-2.923c.36-.436.936-.694 1.53-.694h9.3c.594 0 1.17.258 1.53.694l2.427 2.923c.24.29.35.66.39 1.037l-1.226 4.896c-.307.97-.985 1.664-1.996 1.664H8.25z" />
  </svg>
);
export const InflationIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
  </svg>
);
export const CurrencyIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-9h6m-6 6h6m3-10.5a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
export const BodyFatIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75c-2.071 0-4.045.69-5.63 1.866" />
  </svg>
);
export const CalorieIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.62a8.983 8.983 0 013.362-3.797A8.333 8.333 0 0112 5.875a8.25 8.25 0 013.362-.66zM12 5.875a8.25 8.25 0 00-3.362.66c-1.29.36-2.433 1.02-3.437 1.868m12.374.002c.865.063 1.69.248 2.47.514" />
    </svg>
);
export const MacrosIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 14.25h16.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.75h16.5" />
  </svg>
);
export const BMRIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h1.5l2.25-6L12 16.5l3.75-10.5L21 12h-1.5" />
  </svg>
);
export const WaterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18.75a2.25 2.25 0 104.5 0m-4.5 0V8.25c0-1.758 1.644-3.193 3.667-2.951 1.22.145 2.25.82 2.833 1.791" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 21a2.25 2.25 0 104.5 0m-4.5 0V8.25c0-1.758 1.644-3.193 3.667-2.951 1.22.145 2.25.82 2.833 1.791" />
  </svg>
);
export const PregnancyIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75c-2.485 0-4.5 2.015-4.5 4.5s2.015 4.5 4.5 4.5 4.5-2.015 4.5-4.5c0-.17-.01-.338-.028-.502M12 12.75c.168 0 .336-.01.502-.028" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75v-2.25" />
  </svg>
);
export const ToolsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.878-5.878m-3.535 0l-1.06-1.06-1.06 1.06-1.06-1.06a1.5 1.5 0 00-2.12 2.12l1.06 1.06-1.06 1.06 1.06 1.06 1.06-1.06 1.06 1.06 2.12-2.12z" />
  </svg>
);
export const BusinessIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.075c0 .621-.504 1.125-1.125 1.125H4.875c-.621 0-1.125-.504-1.125-1.125V14.15M12 14.15V18.25m6.375-10.375l-1.5-1.5m0 0l-1.5 1.5m1.5-1.5v4.5m-3-4.5l1.5 1.5m0 0l-1.5 1.5m-1.5-1.5v4.5m-3-4.5l1.5 1.5m0 0l-1.5 1.5m-1.5-1.5v4.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5v6.75h-16.5z" />
  </svg>
);
export const EducationIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0l-.07.042m15.622 0l.07.042m-15.692 0L12 5.84l7.846 4.307" />
  </svg>
);
export const TipIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 7.756a4.5 4.5 0 10-8.512 3.136C5.748 11.234 5.75 11.25 5.75 11.25s0 0 0 0l.02.001a18.35 18.35 0 006.49 1.139 18.35 18.35 0 006.49-1.14l.02-.001s0 0 0 0c0-.001 0-.016-.002-.02C18.298 9.28 16.58 7.756 14.25 7.756zM8.25 15.375h7.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.75a6.75 6.75 0 006.75-6.75v-1.5H5.25v1.5A6.75 6.75 0 0012 21.75z" />
  </svg>
);
export const FireHydrantIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5M15 15l5.25 5.25" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25v19.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12h19.5" />
  </svg>
);
export const ConcreteIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
  </svg>
);
export const PaintIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 9.75m-4.5-4.5L7.5 7.5M7.5 7.5L5.25 5.25M7.5 7.5l2.25 2.25" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 3.75a9 9 0 11-12.728 0 9 9 0 0112.728 0zM15 3.75v3.75m-6 0V3.75" />
  </svg>
);
export const RoofPitchIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.25l9-5.25 9 5.25v9.75H3V8.25z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.25v9.75h18V8.25" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18V9.75m-3 3.75h6" />
  </svg>
);
export const VoltageDropIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
  </svg>
);
export const SalesTaxIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-1.5h5.25m-5.25 0h5.25m-5.25 0H9m-9 3.75h21V3H3v15z" />
  </svg>
);
export const TimeCardIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
export const BreakEvenIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
  </svg>
);
export const ROIIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
  </svg>
);
export const PercentageIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v.75c0 .414.336.75.75.75h.75" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 15h.75a2.25 2.25 0 002.25-2.25v-.75a2.25 2.25 0 00-2.25-2.25h-.75" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.5l-6-9" />
  </svg>
);
export const GPAIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0l-.07.042m15.622 0l.07.042m-15.692 0L12 5.84l7.846 4.307" />
  </svg>
);
export const UnitConverterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
  </svg>
);
export const DateCalcIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18M9 12.75h6" />
    </svg>
);
export const ZScoreIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12c0-3.42 2.227-6.39 5.25-7.58A8.98 8.98 0 0112 4.125a8.98 8.98 0 013 1.295c3.023 1.19 5.25 4.16 5.25 7.58" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 19.5h16.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-7.5" />
    </svg>
);
