
import React from 'react';
import { StyledButton } from './StyledButton';
import { APP_NAME, THEME_COLORS } from '../constants';

interface SuccessScreenProps {
  onRestart: () => void;
  title?: string;
  message?: string;
  buttonText?: string;
}

export const SuccessScreen: React.FC<SuccessScreenProps> = ({ 
  onRestart,
  title = "عملیات موفقیت‌آمیز بود!",
  message = "اطلاعات شما با موفقیت ثبت و ارسال شد. از همکاری شما سپاسگزاریم.",
  buttonText = `شروع مجدد ${APP_NAME}`
}) => {
  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-6 text-center bg-white`}>
      <svg className={`w-20 h-20 text-${THEME_COLORS.success} mb-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h1 className={`text-3xl font-bold text-${THEME_COLORS.textPrimary} mb-4`}>{title}</h1>
      <p className={`text-lg text-${THEME_COLORS.textSecondary} mb-10 max-w-md`}>
        {message}
      </p>
      <div className="w-full max-w-xs">
        <StyledButton onClick={onRestart} fullWidth variant="primary" size="large">
          {buttonText}
        </StyledButton>
      </div>
    </div>
  );
};