// /contexts/LanguageContext.js
import { createContext, useState, useContext, useEffect } from 'react';
import { en } from '../en';
import { fr } from '../fr';
import { ar } from '../ar';


const translations = { en , fr , ar };

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  
  // Load language preference from localStorage if available
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage);
    }
  }, []);
  
  const changeLanguage = (lang) => {
    if (translations[lang]) {
      setLanguage(lang);
      localStorage.setItem('language', lang);
    }
  };
  
  const toggleLanguage = () => {
    // Now cycles through en -> fr -> ar -> en
    const languageOrder = ['en', 'fr', 'ar'];
    const currentIndex = languageOrder.indexOf(language);
    const nextIndex = (currentIndex + 1) % languageOrder.length;
    const newLanguage = languageOrder[nextIndex];
    
    changeLanguage(newLanguage);
  };
  
  const t = (section, key) => {
    if (translations[language] && translations[language][section] && translations[language][section][key]) {
      return translations[language][section][key];
    }
    console.warn(`Translation missing: ${language}.${section}.${key}`);
    return key;
  };
  
  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);