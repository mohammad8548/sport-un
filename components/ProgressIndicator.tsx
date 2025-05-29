
import React from 'react';
import { THEME_COLORS } from '../constants';

interface ProgressIndicatorProps {
  currentStep: number; // 0-indexed
  totalSteps: number;
  isInitialStep?: boolean; // To optionally hide or change text for initial info screen
  screenType?: 'initial' | 'main';
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ currentStep, totalSteps, screenType = 'main' }) => {
  if (totalSteps <= 0) return null;

  const displayText = screenType === 'initial' 
    ? `تکمیل اطلاعات اولیه`
    : `گام ${currentStep + 1} از ${totalSteps}`;

  return (
    <div className={`w-full text-center py-3 mb-6`}>
      <p className={`text-sm font-medium text-${THEME_COLORS.textSecondary}`}>
        {displayText}
      </p>
      <div className={`w-full bg-${THEME_COLORS.borderLight} rounded-full h-1.5 mt-2`}>
        <div
          className={`bg-${THEME_COLORS.primary} h-1.5 rounded-full transition-all duration-300 ease-out`}
          style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};