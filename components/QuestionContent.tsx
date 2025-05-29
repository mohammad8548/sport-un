
import React from 'react';
import { Question } from '../types';
import { THEME_COLORS } from '../constants';

interface QuestionContentProps {
  question: Question;
  value: string | number | undefined;
  onChange: (value: string | number) => void;
  error?: string;
}

export const QuestionContent: React.FC<QuestionContentProps> = ({ question, value, onChange, error }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onChange(question.type === 'number' && e.target.value !== '' ? parseFloat(e.target.value) : e.target.value);
  };

  const inputBaseClasses = `w-full p-3.5 bg-${THEME_COLORS.inputBackground} border border-${THEME_COLORS.borderDefault} rounded-xl text-${THEME_COLORS.textPrimary} focus:ring-2 focus:ring-${THEME_COLORS.primary} focus:border-transparent outline-none placeholder-${THEME_COLORS.textSecondary} transition-colors`;

  return (
    <div className="w-full mb-6 last:mb-0">
      <label htmlFor={question.id} className="block">
        <h2 className={`text-lg font-semibold text-center mb-1 text-${THEME_COLORS.textPrimary}`}>{question.text}</h2>
        {question.description && (
          <p className={`text-xs text-center text-${THEME_COLORS.textSecondary} mb-3`}>{question.description}</p>
        )}
      </label>
      
      {question.type === 'select' ? (
        <select
          id={question.id}
          value={value === undefined ? '' : String(value)}
          onChange={handleInputChange}
          className={`${inputBaseClasses} appearance-none`} // appearance-none for custom arrow if needed
          aria-label={question.text}
          required={question.validation?.required}
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
            type={question.type === 'number' ? 'number' : question.type} // support email, tel
            value={value === undefined ? '' : String(value)}
            onChange={handleInputChange}
            placeholder={question.placeholder}
            className={`${inputBaseClasses} ${question.unit ? 'pl-16 sm:pl-20' : ''}`}
            min={question.validation?.min}
            max={question.validation?.max}
            minLength={question.validation?.minLength}
            maxLength={question.validation?.maxLength}
            required={question.validation?.required}
            pattern={question.validation?.pattern}
            step={question.type === 'number' ? 'any' : undefined}
            aria-label={question.text}
          />
          {question.unit && (
            <span className={`absolute left-4 top-1/2 transform -translate-y-1/2 text-sm text-${THEME_COLORS.textSecondary} pointer-events-none`}>
              {question.unit}
            </span>
          )}
        </div>
      )}
      {error && <p className={`text-${THEME_COLORS.error} text-xs mt-1.5 text-right`}>{error}</p>}
    </div>
  );
};