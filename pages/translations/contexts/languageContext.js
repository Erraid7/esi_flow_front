import { createContext, useState, useContext, useEffect } from 'react';
import { en } from '../en';
import { fr } from '../fr';


const translations = { en, fr };

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
  
  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'fr' : 'en';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };
  
  const t = (section, key) => {
    if (translations[language] && translations[language][section] && translations[language][section][key]) {
      return translations[language][section][key];
    }
    console.warn(`Translation missing: ${language}.${section}.${key}`);
    return key;
  };
  
  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);