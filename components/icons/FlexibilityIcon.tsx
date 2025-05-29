
import React from 'react';

interface IconProps {
  className?: string;
}

export const FlexibilityIcon: React.FC<IconProps> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    className={className}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L1.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.25 12L17 14.188l-1.25-2.188a2.25 2.25 0 00-1.652-1.652L12 9.75l2.188-1.25a2.25 2.25 0 001.652-1.652L17 4.75l1.25 2.188a2.25 2.25 0 001.652 1.652L22.25 9.75l-2.188 1.25a2.25 2.25 0 00-1.652 1.652z" />
  </svg>
);
