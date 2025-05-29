
import React from 'react';

interface IconProps {
  className?: string;
}

export const AppSportIcon: React.FC<IconProps> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 100 100" 
    className={className}
    fill="currentColor" // Use currentColor to inherit color from className
  >
    {/* Background Squircle (Optional, simple version, no gradient) */}
    {/* <rect x="5" y="5" width="90" height="90" rx="20" ry="20" fill="#f0f0f0" /> */}

    {/* Running Figure */}
    <circle cx="50" cy="25" r="8" /> {/* Head */}
    <path d="M50 33 L50 55 L40 70 L35 65" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" /> {/* Torso and one leg */}
    <path d="M50 55 L60 70 L65 65" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" /> {/* Other leg */}
    <path d="M50 40 L35 35 L30 40" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" /> {/* Arm 1 */}
    <path d="M50 40 L65 45 L70 40" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" /> {/* Arm 2 */}

    {/* Ball (e.g., soccer ball like shape) */}
    <circle cx="75" cy="60" r="10" />
    {/* Simplified pentagon/hexagon pattern for ball */}
    <polygon points="75,52 79,55 77,60 73,60 71,55" fill="white" stroke="currentColor" strokeWidth="0.5"/>
    <polygon points="75,68 79,65 77,60 73,60 71,65" fill="white" stroke="currentColor" strokeWidth="0.5"/>


    {/* Text "SPORT" */}
    <text 
      x="50" 
      y="90" 
      fontFamily="Vazirmatn, Arial, sans-serif" 
      fontSize="18" 
      fontWeight="bold" 
      textAnchor="middle"
      fill="currentColor" // Ensures text color matches the rest of the icon
    >
      SPORT
    </text>
  </svg>
);