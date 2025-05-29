
import React from 'react';
import { Question, QuestionCategory } from './types';
import { MeasurementIcon } from './components/icons/MeasurementIcon';
import { SleepIcon } from './components/icons/SleepIcon';
import { NutritionIcon } from './components/icons/NutritionIcon';
import { StrengthIcon } from './components/icons/StrengthIcon';
import { FlexibilityIcon } from './components/icons/FlexibilityIcon';
import { UserIcon } from './components/icons/UserIcon'; // For general info like name/age

export const APP_NAME = "استعداد ورزشی یاب";

export const THEME_COLORS = {
  primary: 'teal-500', // Turquoise/Greenish Blue
  secondary: 'teal-600', // Darker shade for hover or specific elements
  background: 'white',
  cardBackground: 'white',
  textPrimary: 'slate-700',
  textSecondary: 'slate-500',
  borderDefault: 'slate-300',
  borderLight: 'slate-200',
  inputBackground: 'slate-50', // Or 'white' if preferred with distinct border
  error: 'red-500',
  success: 'green-500',
  // Icon specific colors
  iconPrimary: 'teal-500',
  iconMuted: 'slate-400',
};

export const initialInfoQuestions: Question[] = [
  {
    id: 'userName',
    text: 'نام و نام خانوادگی',
    description: 'لطفاً نام کامل خود را وارد کنید.',
    category: QuestionCategory.GENERAL_INFO,
    type: 'text',
    placeholder: 'مثال: سارا احمدی',
    validation: { required: true, minLength: 3 },
  },
  {
    id: 'userAge',
    text: 'سن',
    description: 'سن خود را به سال وارد کنید.',
    category: QuestionCategory.GENERAL_INFO,
    type: 'number',
    placeholder: 'مثال: ۱۸',
    unit: 'سال',
    validation: { required: true, min: 5, max: 99 },
  },
];

const baseQuestions: Question[] = [
  { 
    id: 'height', 
    text: 'قد شما چند سانتی‌متر است؟', 
    description: 'قد خود را بدون کفش و به سانتی‌متر وارد کنید.',
    category: QuestionCategory.PHYSICAL_MEASUREMENTS, 
    type: 'number', 
    unit: 'سانتی‌متر', 
    placeholder: 'مثال: ۱۷۵', 
    validation: { required: true, min: 50, max: 250 } 
  },
  { 
    id: 'weight', 
    text: 'وزن شما چند کیلوگرم است؟', 
    description: 'وزن خود را با لباس سبک و به کیلوگرم وارد کنید.',
    category: QuestionCategory.PHYSICAL_MEASUREMENTS, 
    type: 'number', 
    unit: 'کیلوگرم', 
    placeholder: 'مثال: ۷۰', 
    validation: { required: true, min: 20, max: 300 } 
  },
  { 
    id: 'sleepHours', 
    text: 'معمولاً چند ساعت در شب می‌خوابید؟', 
    description: 'میانگین ساعات خواب شبانه خود در یک هفته اخیر را وارد کنید.',
    category: QuestionCategory.SLEEP_RECOVERY, 
    type: 'number', 
    unit: 'ساعت', 
    placeholder: 'مثال: ۸', 
    validation: { required: true, min: 1, max: 16 } 
  },
  { 
    id: 'dietType', 
    text: 'نوع رژیم غذایی غالب شما چیست؟', 
    description: 'رژیم غذایی که بیشتر اوقات دنبال می‌کنید را انتخاب کنید.',
    category: QuestionCategory.NUTRITION_HABITS, 
    type: 'select', 
    options: ['معمولی', 'گیاه‌خواری', 'وگان', 'کم کربوهیدرات', 'پر پروتئین', 'دیگر'], 
    validation: { required: true } 
  },
  { 
    id: 'pullUps', 
    text: 'حداکثر تعداد بارفیکس که می‌توانید انجام دهید؟', 
    description: 'تعداد بارفیکس صحیح و کامل که بدون توقف انجام می‌دهید.',
    category: QuestionCategory.STRENGTH, 
    type: 'number', 
    unit: 'تکرار', 
    placeholder: 'مثال: ۱۰', 
    validation: { required: true, min: 0, max: 100 } 
  },
  { 
    id: 'touchToes', 
    text: 'آیا می‌توانید نوک انگشتان پا را لمس کنید؟', 
    description: 'در حالت ایستاده با زانوهای صاف، میزان انعطاف‌پذیری خود را بسنجید.',
    category: QuestionCategory.FLEXIBILITY, 
    type: 'select', 
    options: ['بله، به راحتی', 'بله، با کمی تلاش', 'خیر، نمی‌توانم'], 
    validation: { required: true } 
  },
];

export const allQuestionsFlat: Question[] = [];
const desiredTotalQuestions = 40;
let questionCounter = 0;

for (let i = 0; i < desiredTotalQuestions; i++) {
  const baseQ = baseQuestions[i % baseQuestions.length];
  questionCounter++;
  allQuestionsFlat.push({
    ...baseQ,
    id: `${baseQ.id}_${Math.floor(i / baseQuestions.length) + 1}`, // Ensures unique ID
    text: `${baseQ.text} (سوال ${questionCounter})`, // Make text slightly unique for demo
    // You might want to make descriptions more unique in a real app
    description: `${baseQ.description} لطفاً با دقت پاسخ دهید.` 
  });
}


// This is for the main 40-question form
export const MAIN_FORM_QUESTIONS_CONFIG: Question[][] = [];
for (let i = 0; i < allQuestionsFlat.length; i += 2) {
  MAIN_FORM_QUESTIONS_CONFIG.push(allQuestionsFlat.slice(i, i + 2));
}

export const TOTAL_MAIN_FORM_SCREENS = MAIN_FORM_QUESTIONS_CONFIG.length;

export const getIconForCategory = (category: QuestionCategory | undefined): React.ReactNode => {
  const iconBaseClass = "w-16 h-16 mb-4"; 
  const iconColor = `text-${THEME_COLORS.iconPrimary}`;

  switch (category) {
    case QuestionCategory.GENERAL_INFO:
      return <UserIcon className={`${iconBaseClass} ${iconColor}`} />;
    case QuestionCategory.PHYSICAL_MEASUREMENTS:
      return <MeasurementIcon className={`${iconBaseClass} ${iconColor}`} />;
    case QuestionCategory.SLEEP_RECOVERY:
      return <SleepIcon className={`${iconBaseClass} ${iconColor}`} />;
    case QuestionCategory.NUTRITION_HABITS:
      return <NutritionIcon className={`${iconBaseClass} ${iconColor}`} />;
    case QuestionCategory.STRENGTH:
      return <StrengthIcon className={`${iconBaseClass} ${iconColor}`} />;
    case QuestionCategory.FLEXIBILITY:
      return <FlexibilityIcon className={`${iconBaseClass} ${iconColor}`} />;
    default:
      // Fallback icon, could be a generic question mark or user icon
      return <UserIcon className={`${iconBaseClass} text-${THEME_COLORS.iconMuted}`} />;
  }
};
