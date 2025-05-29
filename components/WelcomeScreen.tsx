import React from 'react';
import { StyledButton } from './StyledButton';
import { APP_NAME, THEME_COLORS } from '../constants';
// Removed MeasurementIcon import, UserIcon is also not needed if using <img>

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-slate-50 via-${THEME_COLORS.background} to-sky-100`}>
      {/* Use an img tag for the new app icon */}
      <img 
        src="/assets/icons/icon-192x192.png" 
        alt={`${APP_NAME} icon`} 
        className="w-24 h-24 mb-6 rounded-lg shadow-md" // Added rounded-lg and shadow for better appearance
      />
      <h1 className={`text-4xl font-bold text-${THEME_COLORS.textPrimary} mb-4`}>{APP_NAME}</h1>
      <p className={`text-lg text-${THEME_COLORS.textSecondary} mb-12 max-w-md`}>
        به پلتفرم شناسایی استعدادهای ورزشی خوش آمدید. با پاسخ به چند سوال، به ما در کشف پتانسیل شما کمک کنید.
      </p>
      <div className="w-full max-w-xs">
        <StyledButton onClick={onStart} fullWidth variant="primary" size="large">
          شروع ارزیابی
        </StyledButton>
      </div>
      <p className={`mt-12 text-sm text-slate-400`}>قدرت گرفته از تکنولوژی پیشرفته</p>
    </div>
  );
};