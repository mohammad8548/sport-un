import React from 'react';
import { Answer, Question, QuestionCategory } from '../types';
import { MAIN_FORM_QUESTIONS_CONFIG as QUESTIONS_CONFIG, THEME_COLORS, getIconForCategory, APP_NAME } from '../constants';
import { StyledButton } from './StyledButton';

interface SummaryScreenProps {
  answers: Answer;
  onEdit: () => void;
  onReset: () => void;
}

export const SummaryScreen: React.FC<SummaryScreenProps> = ({ answers, onEdit, onReset }) => {
  const allQuestions: Question[] = QUESTIONS_CONFIG.flat();

  return (
    <div className={`min-h-screen flex flex-col items-center p-4 md:p-8 bg-${THEME_COLORS.background}`}>
      <div className={`w-full max-w-2xl bg-${THEME_COLORS.cardBackground} p-6 md:p-8 rounded-xl shadow-xl border border-${THEME_COLORS.borderLight}`}>
        <div className="flex flex-col items-center text-center mb-8">
          {getIconForCategory(allQuestions[0]?.category || QuestionCategory.PHYSICAL_MEASUREMENTS)}
          <h1 className={`text-3xl font-bold text-${THEME_COLORS.textPrimary} my-4`}>خلاصه پاسخ‌ها</h1>
          <p className={`text-${THEME_COLORS.textSecondary}`}>مروری بر اطلاعاتی که وارد کرده‌اید. می‌توانید بازگردید و ویرایش کنید یا فرم را مجدداً شروع کنید.</p>
        </div>

        <div className="space-y-3">
          {allQuestions.map(question => {
            const answer = answers[question.id];
            const displayAnswer = answer !== undefined && String(answer).trim() !== '' ? String(answer) + (question.unit ? ` ${question.unit}` : '') : 'پاسخ داده نشده';
            return (
              <div key={question.id} className={`p-4 bg-slate-50 rounded-lg shadow-sm flex justify-between items-center border border-${THEME_COLORS.borderLight}`}>
                <span className={`text-${THEME_COLORS.textSecondary} font-medium`}>{question.text}</span>
                <span className={`text-${THEME_COLORS.textPrimary} font-semibold text-left`}>
                  {displayAnswer}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 sm:space-x-reverse">
          <StyledButton onClick={onEdit} variant="primary">
            ویرایش پاسخ‌ها
          </StyledButton>
          <StyledButton onClick={onReset} variant="ghost">
            شروع مجدد ({APP_NAME})
          </StyledButton>
        </div>
      </div>
    </div>
  );
};