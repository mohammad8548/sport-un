
export enum QuestionCategory {
  PHYSICAL_MEASUREMENTS = 'PHYSICAL_MEASUREMENTS',
  SLEEP_RECOVERY = 'SLEEP_RECOVERY',
  NUTRITION_HABITS = 'NUTRITION_HABITS',
  STRENGTH = 'STRENGTH',
  FLEXIBILITY = 'FLEXIBILITY',
  GENERAL_INFO = 'GENERAL_INFO', // For Name, Age
}

export interface Question {
  id: string;
  text: string;
  description?: string; 
  category: QuestionCategory;
  type: 'number' | 'text' | 'select' | 'email' | 'tel'; // Added email/tel for potential use
  options?: string[];
  placeholder?: string;
  unit?: string;
  validation?: {
    required?: boolean;
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: string; // regex pattern for text inputs
  };
}

export interface Answer {
  [questionId: string]: string | number;
}

export interface UserData {
  answers: Answer;
  completed?: boolean;
}

export enum AppScreen {
  WELCOME = 'WELCOME', // New initial welcome screen
  INITIAL_INFO = 'INITIAL_INFO',
  FORM = 'FORM',
  SUBMITTING = 'SUBMITTING',
  SUCCESS_SUBMISSION = 'SUCCESS_SUBMISSION',
}
