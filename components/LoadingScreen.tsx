
import React from 'react';
import { THEME_COLORS } from '../constants';

interface LoadingScreenProps {
  message?: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ message = "لطفاً صبر کنید..." }) => {
  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-6 text-center bg-white`}>
      <svg className={`animate-spin h-12 w-12 text-${THEME_COLORS.primary} mb-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <h1 className={`text-2xl font-semibold text-${THEME_COLORS.textPrimary} mb-4`}>{message}</h1>
      <p className={`text-md text-${THEME_COLORS.textSecondary}`}>از شکیبایی شما سپاسگزاریم.</p>
    </div>
  );
};