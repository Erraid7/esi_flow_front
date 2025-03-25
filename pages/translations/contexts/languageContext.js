// pages/translations/contexts/languageContext.js
import React, { createContext, useState, useContext } from 'react';
import { en } from '../en';
import { fr } from '../fr';

const translations = { en, fr };

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

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