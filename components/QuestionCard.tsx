
import React from 'react';
import { Question } from '../types';
import { THEME_COLORS } from '../constants';

interface QuestionContentProps {
  question: Question;
  value: string | number | undefined;
  onChange: (value: string | number) => void;
  error?: string;
}

// This component is now named QuestionContent and renders the inner parts of a question.
// The outer card shell and icon are handled by QuestionScreen.
export const QuestionContent: React.FC<QuestionContentProps> = ({ question, value, onChange, error }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onChange(question.type === 'number' && e.target.value !== '' ? parseFloat(e.target.value) : e.target.value);
  };

  return (
    <div className="w-full mb-6 last:mb-0"> {/* Add margin bottom to separate questions within the card */}
      <h2 className={`text-xl font-semibold text-center mb-2 text-${THEME_COLORS.textPrimary}`}>{question.text}</h2>
      {question.description && (
        <p className={`text-sm text-center text-${THEME_COLORS.textSecondary} mb-4`}>{question.description}</p>
      )}
      
      {question.type === 'select' ? (
        <select
          id={question.id}
          value={value === undefined ? '' : String(value)}
          onChange={handleInputChange}
          className={`w-full p-3 bg-${THEME_COLORS.inputBackground} border border-${THEME_COLORS.borderDefault} rounded-lg text-${THEME_COLORS.textPrimary} focus:ring-2 focus:ring-${THEME_COLORS.primary} focus:border-transparent outline-none placeholder-${THEME_COLORS.textSecondary}`}
          aria-label={question.text}
        >
          <option value="" disabled>{question.placeholder || 'انتخاب کنید...'}</option>
          {question.options?.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      ) : (
        <div className="relative">
          <input
            id={question.id}
            type={question.type === 'number' ? 'number' : 'text'}
            value={value === undefined ? '' : String(value)}
            onChange={handleInputChange}
            placeholder={question.placeholder}
            className={`w-full p-3 bg-${THEME_COLORS.inputBackground} border border-${THEME_COLORS.borderDefault} rounded-lg text-${THEME_COLORS.textPrimary} focus:ring-2 focus:ring-${THEME_COLORS.primary} focus:border-transparent outline-none placeholder-${THEME_COLORS.textSecondary} ${question.unit ? 'pl-16 sm:pl-20' : ''}`} 
            min={question.validation?.min}
            max={question.validation?.max}
            required={question.validation?.required}
            pattern={question.validation?.pattern}
            step={question.type === 'number' ? 'any' : undefined}
            aria-label={question.text}
          />
          {question.unit && (
            <span className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-${THEME_COLORS.textSecondary} pointer-events-none`}>
              {question.unit}
            </span>
          )}
        </div>
      )}
      {error && <p className="text-red-500 text-sm mt-2 text-right">{error}</p>}
    </div>
  );
};