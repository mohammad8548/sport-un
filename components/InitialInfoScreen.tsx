
import React from 'react';
import { QuestionScreen } from './QuestionScreen';
import { Answer, Question } from '../types';
import { initialInfoQuestions } from '../constants';

interface InitialInfoScreenProps {
  questions: Question[];
  initialData: Answer;
  onSubmit: (answers: Answer) => void;
}

export const InitialInfoScreen: React.FC<InitialInfoScreenProps> = ({ questions, initialData, onSubmit }) => {
  // The InitialInfoScreen will have only one "screen" or step.
  // So, currentScreenIndex is 0, and totalScreens is 1.
  // The questions are passed directly.
  
  // For the initial info, there's no "previous" action.
  const handlePrevious = () => {
    // No operation for the first screen.
    console.log("No previous screen from initial info.");
  };

  return (
    <QuestionScreen
      currentScreenIndex={0} // Always the first (and only) screen for initial info
      totalScreens={1}        // Only one step for initial info collection
      questionsConfig={[questions]} // The questions for this single screen
      formData={initialData}
      onNext={onSubmit}      // "Next" on this screen means submitting the initial info
      onPrevious={handlePrevious} // No-op
      onSubmit={onSubmit}    // onSubmit is the same as onNext here
      screenType="initial"
    />
  );
};
