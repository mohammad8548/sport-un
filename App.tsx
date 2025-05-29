
import React, { useState, useCallback, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import useLocalStorage from './hooks/useLocalStorage';
import { Answer, AppScreen, Question } from './types';
import { InitialInfoScreen } from './components/InitialInfoScreen';
import { QuestionScreen } from './components/QuestionScreen';
import { LoadingScreen } from './components/LoadingScreen';
import { SuccessScreen } from './components/SuccessScreen';
import { WelcomeScreen } from './components/WelcomeScreen'; // Added for WELCOME state
import { TOTAL_MAIN_FORM_SCREENS, MAIN_FORM_QUESTIONS_CONFIG, initialInfoQuestions } from './constants';

const App: React.FC = () => {
  const [currentAppScreen, setCurrentAppScreen] = useLocalStorage<AppScreen>('appScreen_talentTurquoiseV2', AppScreen.WELCOME); // Default to WELCOME
  const [currentFormScreenIndex, setCurrentFormScreenIndex] = useLocalStorage<number>('currentFormScreenIndex_talentTurquoiseV2', 0);
  const [formData, setFormData] = useLocalStorage<Answer>('formData_talentTurquoiseV2', {});
  
  // Placeholder API URL
  const API_SUBMIT_URL = 'https://api.example.com/submit_talent_data';

  useEffect(() => {
    const validStates = [AppScreen.WELCOME, AppScreen.INITIAL_INFO, AppScreen.FORM, AppScreen.SUBMITTING, AppScreen.SUCCESS_SUBMISSION];
    if (!validStates.includes(currentAppScreen)) {
        setCurrentAppScreen(AppScreen.WELCOME);
        setCurrentFormScreenIndex(0);
        setFormData({});
    }
  }, [currentAppScreen, setCurrentAppScreen, setCurrentFormScreenIndex, setFormData]);

  const handleStartFromWelcome = useCallback(() => {
    setCurrentAppScreen(AppScreen.INITIAL_INFO);
    window.scrollTo(0,0);
  }, [setCurrentAppScreen]);

  const handleInitialInfoSubmit = useCallback((initialAnswers: Answer) => {
    setFormData(prevData => ({ ...prevData, ...initialAnswers }));
    setCurrentAppScreen(AppScreen.FORM);
    setCurrentFormScreenIndex(0); 
    window.scrollTo(0, 0);
  }, [setFormData, setCurrentAppScreen, setCurrentFormScreenIndex]);

  const handleNextScreen = useCallback((currentScreenAnswers: Answer) => {
    setFormData(prevData => ({ ...prevData, ...currentScreenAnswers }));
    if (currentFormScreenIndex < TOTAL_MAIN_FORM_SCREENS - 1) {
      setCurrentFormScreenIndex(prevIndex => prevIndex + 1);
      window.scrollTo(0, 0); 
    } else {
      console.warn("handleNextScreen called on the last screen. Submission should be handled by handleSubmitData.");
    }
  }, [currentFormScreenIndex, setFormData, setCurrentFormScreenIndex]);

  const handlePreviousScreen = useCallback(() => {
    // If on the first screen of the main form, go back to initial info
    if (currentAppScreen === AppScreen.FORM && currentFormScreenIndex === 0) {
      setCurrentAppScreen(AppScreen.INITIAL_INFO);
      window.scrollTo(0,0);
    } else if (currentFormScreenIndex > 0) { // Handles previous within the main form
      setCurrentFormScreenIndex(prevIndex => prevIndex - 1);
      window.scrollTo(0, 0);
    }
    // No "previous" from INITIAL_INFO screen back to WELCOME via this handler, 
    // as InitialInfoScreen's BottomNavBar won't show "previous" if configured correctly.
  }, [currentAppScreen, currentFormScreenIndex, setCurrentAppScreen, setCurrentFormScreenIndex]);
  
  const handleSubmitData = useCallback(async (lastScreenAnswers: Answer) => {
    const finalData = { ...formData, ...lastScreenAnswers };
    setFormData(finalData);
    setCurrentAppScreen(AppScreen.SUBMITTING);
    window.scrollTo(0, 0);

    if (API_SUBMIT_URL === 'https://api.example.com/submit_talent_data') {
      console.warn("DEVELOPER NOTE: API_SUBMIT_URL is a placeholder. Simulating successful submission.");
      alert("توجه: نقطه پایانی سرور برای ارسال واقعی اطلاعات پیکربندی نشده است. این یک حالت نمایشی است. اطلاعات ارسال نخواهد شد.");
      
      // Simulate a delay for the loading screen then proceed to success
      setTimeout(() => {
        setCurrentAppScreen(AppScreen.SUCCESS_SUBMISSION);
      }, 1500); // 1.5 second delay
      return;
    }

    try {
      const response = await fetch(API_SUBMIT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalData),
      });

      if (!response.ok) {
        console.error('Server error:', response.status, await response.text());
        alert('خطا در ارسال اطلاعات. لطفاً دوباره تلاش کنید.');
        setCurrentAppScreen(AppScreen.FORM);
        return;
      }
      setCurrentAppScreen(AppScreen.SUCCESS_SUBMISSION);
    } catch (error) {
      console.error('Submission failed:', error);
      alert('خطا در اتصال به سرور. لطفاً اتصال اینترنت خود را بررسی کرده و دوباره تلاش کنید.');
      setCurrentAppScreen(AppScreen.FORM);
    }
  }, [formData, setFormData, setCurrentAppScreen]);

  const handleResetForm = useCallback(() => {
    setFormData({});
    setCurrentFormScreenIndex(0);
    setCurrentAppScreen(AppScreen.WELCOME); // Go back to the Welcome screen on reset
    window.scrollTo(0, 0);
  }, [setFormData, setCurrentFormScreenIndex, setCurrentAppScreen]);


  const renderScreen = () => {
    switch (currentAppScreen) {
      case AppScreen.WELCOME:
        return <WelcomeScreen onStart={handleStartFromWelcome} />;
      case AppScreen.INITIAL_INFO:
        return (
          <InitialInfoScreen
            questions={initialInfoQuestions}
            initialData={{
              userName: formData.userName || '',
              userAge: formData.userAge || '',
            }}
            onSubmit={handleInitialInfoSubmit}
          />
        );
      case AppScreen.FORM:
        return (
          <QuestionScreen
            currentScreenIndex={currentFormScreenIndex}
            totalScreens={TOTAL_MAIN_FORM_SCREENS}
            questionsConfig={MAIN_FORM_QUESTIONS_CONFIG}
            formData={formData}
            onNext={handleNextScreen}
            onPrevious={handlePreviousScreen}
            onSubmit={handleSubmitData}
            screenType="main"
          />
        );
      case AppScreen.SUBMITTING:
        return <LoadingScreen message="در حال ارسال اطلاعات..." />;
      case AppScreen.SUCCESS_SUBMISSION:
        return <SuccessScreen onRestart={handleResetForm} />;
      default:
        setCurrentAppScreen(AppScreen.WELCOME); 
        return <WelcomeScreen onStart={handleStartFromWelcome} />;
    }
  };
  
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<div className={`app-container min-h-screen transition-opacity duration-300 ease-in-out bg-${(currentAppScreen === AppScreen.FORM || currentAppScreen === AppScreen.INITIAL_INFO) ? 'slate-50' : 'white'}`}>{renderScreen()}</div>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
