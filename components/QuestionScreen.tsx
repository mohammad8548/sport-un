
import React, { useState, useEffect, useMemo } from 'react';
import { Question, Answer } from '../types';
import { QuestionContent } from './QuestionCard'; // Corrected import path
import { ProgressIndicator } from './ProgressIndicator';
import { BottomNavigationBar } from './BottomNavigationBar';
import { THEME_COLORS, getIconForCategory } from '../constants';

interface QuestionScreenProps {
  currentScreenIndex: number;
  totalScreens: number;
  questionsConfig: Question[][];
  formData: Answer;
  onNext: (currentAnswers: Answer) => void;
  onPrevious: () => void;
  onSubmit: (finalAnswers: Answer) => void;
  screenType?: 'initial' | 'main'; // To differentiate initial info from main form
}

export const QuestionScreen: React.FC<QuestionScreenProps> = ({ 
  currentScreenIndex, 
  totalScreens,
  questionsConfig,
  formData, 
  onNext, 
  onPrevious, 
  onSubmit,
  screenType = 'main',
}) => {
  const currentQuestions: Question[] = useMemo(() => questionsConfig[currentScreenIndex] || [], [currentScreenIndex, questionsConfig]);
  const [screenAnswers, setScreenAnswers] = useState<Answer>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const initialScreenAnswers: Answer = {};
    currentQuestions.forEach(q => {
      if (formData[q.id] !== undefined) {
        initialScreenAnswers[q.id] = formData[q.id];
      } else if (q.type === 'select' && q.options && q.options.length > 0 && !q.validation?.required) {
        // Pre-select first option for non-required selects if no data, or leave blank
        // initialScreenAnswers[q.id] = q.options[0]; 
      }
    });
    setScreenAnswers(initialScreenAnswers);
    setErrors({}); 
  }, [currentScreenIndex, currentQuestions, formData]);

  const handleAnswerChange = (questionId: string, value: string | number) => {
    setScreenAnswers(prev => ({ ...prev, [questionId]: value }));
    if (errors[questionId]) {
      setErrors(prev => ({ ...prev, [questionId]: '' }));
    }
  };

  const validateScreen = (): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;
    currentQuestions.forEach(q => {
      const value = screenAnswers[q.id];
      const stringValue = String(value === undefined ? '' : value).trim(); // Ensure value is string for trim

      if (q.validation?.required && (value === undefined || stringValue === '' || (q.type === 'select' && value === ''))) {
        newErrors[q.id] = 'این فیلد الزامی است.';
        isValid = false;
      } else if (value !== undefined && stringValue !== '') { 
        if (q.type === 'number') {
          const numValue = Number(value);
          if (isNaN(numValue)) {
            newErrors[q.id] = 'لطفاً یک عدد معتبر وارد کنید.';
            isValid = false;
          } else {
            if (q.validation?.min !== undefined && numValue < q.validation.min) {
              newErrors[q.id] = `مقدار باید حداقل ${q.validation.min} باشد.`;
              isValid = false;
            }
            if (q.validation?.max !== undefined && numValue > q.validation.max) {
              newErrors[q.id] = `مقدار باید حداکثر ${q.validation.max} باشد.`;
              isValid = false;
            }
          }
        }
        if (q.type === 'text' || q.type === 'email' || q.type === 'tel') {
            if (q.validation?.minLength !== undefined && stringValue.length < q.validation.minLength) {
              newErrors[q.id] = `حداقل ${q.validation.minLength} کاراکتر مورد نیاز است.`;
              isValid = false;
            }
            if (q.validation?.maxLength !== undefined && stringValue.length > q.validation.maxLength) {
              newErrors[q.id] = `حداکثر ${q.validation.maxLength} کاراکتر مجاز است.`;
              isValid = false;
            }
        }
        if (q.validation?.pattern && typeof value === 'string' && !new RegExp(q.validation.pattern).test(value)) {
          newErrors[q.id] = q.id === 'userEmail' ? 'فرمت ایمیل صحیح نمی‌باشد.' : 'فرمت ورودی صحیح نمی‌باشد.';
          isValid = false;
        }
      }
    });
    setErrors(newErrors);
    return isValid;
  };

  const handleNextAction = () => {
    if (validateScreen()) {
      if (currentScreenIndex < totalScreens - 1) {
        onNext(screenAnswers);
      } else {
        onSubmit(screenAnswers); // This is the final submit
      }
    }
  };
  
  const screenIcon = useMemo(() => {
    return getIconForCategory(currentQuestions[0]?.category);
  }, [currentQuestions]);

  // Determine if this is the very first screen in its sequence (initial or main form)
  const isEffectivelyFirstScreen = (screenType === 'initial' && currentScreenIndex === 0) || (screenType === 'main' && currentScreenIndex === 0);
  
  const nextButtonTextForScreen = screenType === 'initial' 
    ? "بعدی" 
    : (currentScreenIndex >= totalScreens - 1 ? "ارسال نهایی" : "بعدی");

  return (
    <div className={`min-h-screen flex flex-col items-center justify-start pt-6 md:pt-10 bg-slate-50 pb-28 px-4`}>
      <div className="w-full max-w-md"> 
        <ProgressIndicator currentStep={currentScreenIndex} totalSteps={totalScreens} screenType={screenType} />
        
        <div className={`bg-${THEME_COLORS.cardBackground} p-6 sm:p-8 rounded-2xl shadow-xl w-full border border-${THEME_COLORS.borderLight} flex flex-col items-center`}>
          {screenIcon}
          {currentQuestions.map((question, index) => (
            <React.Fragment key={question.id}>
              <QuestionContent
                question={question}
                value={screenAnswers[question.id]}
                onChange={(value) => handleAnswerChange(question.id, value)}
                error={errors[question.id]}
              />
              {currentQuestions.length > 1 && index === 0 && (
                <hr className={`w-3/4 border-t border-${THEME_COLORS.borderLight} my-5`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      <BottomNavigationBar
        onPrevious={onPrevious}
        onNext={handleNextAction} 
        isFirstScreen={isEffectivelyFirstScreen} // Use the refined logic
        isLastScreen={currentScreenIndex >= totalScreens - 1 && screenType === 'main'} // isLastScreen only true for main form's end
        previousButtonDisabled={isEffectivelyFirstScreen} 
        nextButtonText={nextButtonTextForScreen}
      />
    </div>
  );
};
