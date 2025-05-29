
import React from 'react';

interface IconProps {
  className?: string;
}

export const StrengthIcon: React.FC<IconProps> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    className={className}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.061 4.939A8.92 8.92 0 0112 4.5c1.928 0 3.723.634 5.166 1.72.03.022.057.046.084.071M3 12c0 .85.105 1.674.301 2.458M6.75 19.5A8.938 8.938 0 014.5 12.879"/>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 4.5l1.875 1.875M19.5 19.5l-1.875-1.875"/>
  </svg>
);
