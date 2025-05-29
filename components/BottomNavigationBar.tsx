
import React from 'react';
import { StyledButton } from './StyledButton';
import { THEME_COLORS } from '../constants';

interface BottomNavigationBarProps {
  onPrevious: () => void;
  onNext: () => void;
  isFirstScreen: boolean; // True if it's the very first screen of a sequence (e.g. initial info, or first main form screen)
  isLastScreen: boolean;  // True if it's the last screen of a sequence
  previousButtonDisabled?: boolean; // Explicitly disable previous
  nextButtonText?: string;
}

export const BottomNavigationBar: React.FC<BottomNavigationBarProps> = ({ 
  onPrevious, 
  onNext, 
  isFirstScreen, 
  isLastScreen,
  previousButtonDisabled,
  nextButtonText = 'بعدی' 
}) => {
  const showPreviousButton = !isFirstScreen;

  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-${THEME_COLORS.cardBackground} p-4 border-t border-${THEME_COLORS.borderLight} shadow-[0_-2px_15px_rgba(0,0,0,0.05)] z-50`}>
      <div className="max-w-md mx-auto flex justify-between items-center space-x-3 space-x-reverse">
        {showPreviousButton ? (
          <StyledButton 
            onClick={onPrevious} 
            disabled={previousButtonDisabled}
            variant="ghost"
            className="flex-1"
          >
            قبلی
          </StyledButton>
        ) : (
          <div className="flex-1"></div> // Placeholder to maintain layout
        )}
        <StyledButton 
          onClick={onNext} 
          variant={isLastScreen ? 'primary' : 'primary'} // Consistently primary (teal)
          className="flex-1"
        >
          {nextButtonText}
        </StyledButton>
      </div>
    </div>
  );
};