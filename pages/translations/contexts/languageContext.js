// pages/translations/contexts/languageContext.js
import React, { createContext, useState, useContext } from 'react';
import { en } from '../en';
import { fr } from '../fr';

const translations = { en, fr };

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  // Initialize language based on user preference from localStorage
  React.useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    } else {
      localStorage.setItem('language', language);
    }
  }, []);

  // Function to get nested translations
  const t = (...keys) => {
    let currentTranslation = translations[language];
    
    for (const key of keys) {
      if (currentTranslation && currentTranslation[key] !== undefined) {
        currentTranslation = currentTranslation[key];
      } else {
        return `Missing translation for ${keys.join('.')}`;
      }
    }
    
    return currentTranslation;
  };

  // Toggle language between English and French
  const toggleLanguage = () => {
    setLanguage(prevLanguage => prevLanguage === 'en' ? 'fr' : 'en');
    const newLanguage = language === 'en' ? 'fr' : 'en';
    localStorage.setItem('language', newLanguage);
    document.documentElement.lang = newLanguage; // Update the document language
  };

  return (
    <LanguageContext.Provider value={{ t, language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  
  return context;
};