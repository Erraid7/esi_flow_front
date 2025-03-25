// Navbar.jsx
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../translations/contexts/languageContext';
import { useDarkMode } from '../../darkLightMode/darkModeContext';
import {Sun1 , Moon , LanguageCircle , HambergerMenu} from 'iconsax-react';
import Link from 'next/link';


const Navbar = () => {
  const { t, toggleLanguage } = useLanguage();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [activeLink, setActiveLink] = useState('home');

  const linkStyle = (linkName) => `
    text-primary-900 dark:text-neutral-100
    ${activeLink === linkName 
      ? 'text-primary-600 dark:text-primary-300 border-b-2 border-primary-600 dark:border-primary-300' 
      : 'hover:text-primary-600 dark:hover:text-primary-300 border-b-2 border-transparent hover:border-primary-600 dark:hover:border-primary-300'}
    active:border-primary-600 dark:active:border-primary-300
  `;

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
  };

  


  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-black shadow-md dark:shadow-neutral-990  px-8 py-2 flex justify-between items-center">
      <div></div>
      <div className="flex items-center gap-2">
      <img src="/home/navbar/logo1.svg" alt="" className='dark:hidden' />
      <img src="/home/navbar/logo1-dark.svg" alt="" className=' hidden dark:block' />
      </div>
      
      <div className="flex items-center gap-6">
      <div className="hidden md:flex space-x-6">
      <Link 
        href="#home" 
        className={linkStyle('home')}
        onClick={() => handleLinkClick('home')}
      >
        {t('home', 'navbar' , 1)}
      </Link>
      <Link 
        href="#about" 
        className={linkStyle('about')}
        onClick={() => handleLinkClick('about')}
      >
        {t('home', 'navbar' , 2)}
      </Link>
      <Link 
        href="#guide" 
        className={linkStyle('guide')}
        onClick={() => handleLinkClick('guide')}
      >
        {t('home', 'navbar' , 3)}
      </Link>
      <Link 
        href="#users" 
        className={linkStyle('users')}
        onClick={() => handleLinkClick('users')}
      >
        {t('home', 'navbar' , 4)}
      </Link>
      <Link 
        href="#faq" 
        className={linkStyle('faq')}
        onClick={() => handleLinkClick('faq')}
      >
        {t('home', 'navbar' , 5)}
      </Link>
      <Link 
        href="#contact" 
        className={linkStyle('contact')}
        onClick={() => handleLinkClick('contact')}
      >
        {t('home', 'navbar' , 6)}
      </Link>
    </div>
      
        
        <div className="flex items-center gap-3">
          {/* Dark Mode Toggle Button */}
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              // Sun Icon
              <Sun1 size="20" color="white" variant="Bold"/>
            ) : (
              // Moon Icon
              <Moon size="20" color="black" variant="Bold"/>
            )}
          </button>
          
          {/* Language selector icon (placeholder) */}
          <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" onClick={toggleLanguage}>
          {isDarkMode ? (
              // Sun Icon
              <LanguageCircle size="20" color="white" variant="Bold"/>
            ) : (
              // Moon Icon
              <LanguageCircle size="20" color="black" variant="Bold"/>
            )}
          </button>
          
          {/* Login Button */}
          
        </div>
        
      </div>
      <a href="/login" className=" bg-primary-600 dark:bg-primary-300 dark:hover:bg-primary-400 hover:bg-primary-700 text-neutral-50 dark:text-neutral-950   font-medium  text-base py-3 px-6 rounded-xl transition-colors">
      {t('home', 'navbar' , 'button')}
          </a>
    </nav>
  );
};

export default Navbar;