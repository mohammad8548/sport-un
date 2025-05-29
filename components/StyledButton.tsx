
import React from 'react';
import { THEME_COLORS } from '../constants';

interface StyledButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'light';
  fullWidth?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export const StyledButton: React.FC<StyledButtonProps> = ({ children, variant = 'primary', fullWidth = false, size = 'medium', className, ...props }) => {
  let baseStyle = `font-semibold rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white transition-all duration-150 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed`;

  if (fullWidth) {
    baseStyle += ' w-full';
  }

  switch (size) {
    case 'small':
      baseStyle += ' px-4 py-2 text-sm';
      break;
    case 'medium':
      baseStyle += ' px-6 py-2.5'; // Adjusted padding for softer look
      break;
    case 'large':
      baseStyle += ' px-8 py-3 text-lg';
      break;
  }

  switch (variant) {
    case 'primary': // Teal
      baseStyle += ` bg-${THEME_COLORS.primary} text-white hover:bg-${THEME_COLORS.secondary} focus:ring-${THEME_COLORS.primary}`;
      break;
    case 'secondary': // Example: A darker gray or another accent if defined
      baseStyle += ` bg-slate-600 text-white hover:bg-slate-700 focus:ring-slate-600`;
      break;
    case 'ghost':
      baseStyle += ` bg-transparent text-${THEME_COLORS.primary} hover:bg-teal-50 focus:ring-${THEME_COLORS.primary} border border-${THEME_COLORS.primary}`;
      break;
    case 'light': // For light background buttons with primary text color
      baseStyle += ` bg-teal-50 text-${THEME_COLORS.primary} hover:bg-teal-100 focus:ring-${THEME_COLORS.primary} border border-transparent`;
      break;
    case 'danger':
      baseStyle += ` bg-${THEME_COLORS.error} text-white hover:bg-red-600 focus:ring-${THEME_COLORS.error}`;
      break;
  }

  return (
    <button className={`${baseStyle} ${className || ''}`} {...props}>
      {children}
    </button>
  );
};