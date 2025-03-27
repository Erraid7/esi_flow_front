import React, { useState } from 'react';
import { useLanguage } from '../../translations/contexts/languageContext';
import { useDarkMode } from '../../darkLightMode/darkModeContext';
import {Sun1, Moon, LanguageCircle, HambergerMenu, CloseCircle} from 'iconsax-react';
import Link from 'next/link';

const Navbar = () => {
  const { t, toggleLanguage } = useLanguage();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [activeLink, setActiveLink] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const linkStyle = (linkName) => `
    text-neutral-990 dark:text-neutral-100
    ${activeLink === linkName 
      ? 'text-primary-600 dark:text-primary-300 border-b-2 border-primary-600 dark:border-primary-300' 
      : 'hover:text-primary-600 dark:hover:text-primary-300 border-b-2 border-transparent hover:border-primary-600 dark:hover:border-primary-300'}
    active:border-primary-600 dark:active:border-primary-300
  `;

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="w-full">
      {/* Desktop Navbar */}
      <div className="fixed top-0 left-0 right-0 z-20 bg-white dark:bg-black shadow-md dark:shadow-neutral-990 px-8 py-2 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="/home/navbar/logo1.svg" alt="" className='dark:hidden' />
          <img src="/home/navbar/logo1-dark.svg" alt="" className='hidden dark:block' />
        </div>
        
        {/* Desktop Navigation */}
        <div className="flex items-center gap-6">
          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6">
            <Link 
              href="#home" 
              className={linkStyle('home')}
              onClick={() => handleLinkClick('home')}
            >
              {t('home', 'navbar', 1)}
            </Link>
            <Link 
              href="#about" 
              className={linkStyle('about')}
              onClick={() => handleLinkClick('about')}
            >
              {t('home', 'navbar', 2)}
            </Link>
            <Link 
              href="#guide" 
              className={linkStyle('guide')}
              onClick={() => handleLinkClick('guide')}
            >
              {t('home', 'navbar', 3)}
            </Link>
            <Link 
              href="#users" 
              className={linkStyle('users')}
              onClick={() => handleLinkClick('users')}
            >
              {t('home', 'navbar', 4)}
            </Link>
            <Link 
              href="#faq" 
              className={linkStyle('faq')}
              onClick={() => handleLinkClick('faq')}
            >
              {t('home', 'navbar', 5)}
            </Link>
            <Link 
              href="#contact" 
              className={linkStyle('contact')}
              onClick={() => handleLinkClick('contact')}
            >
              {t('home', 'navbar', 6)}
            </Link>
          </div>
          
          {/* Desktop Icons and Login */}
          <div className="flex items-center gap-3">
            {/* Dark Mode Toggle Button */}
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun1 size="20" color="white" variant="Bold"/>
              ) : (
                <Moon size="20" color="black" variant="Bold"/>
              )}
            </button>
            
            {/* Language selector icon */}
            <button 
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" 
              onClick={toggleLanguage}
            >
              {isDarkMode ? (
                <LanguageCircle size="20" color="white" variant="Bold"/>
              ) : (
                <LanguageCircle size="20" color="black" variant="Bold"/>
              )}
            </button>
          </div>
          
          {/* Desktop Login Button */}
          
        </div>
        <a 
            href="/login" 
            className="hidden md:block bg-primary-600 dark:bg-primary-300 dark:hover:bg-primary-400 hover:bg-primary-700 text-neutral-50 dark:text-neutral-950 font-medium text-base py-2 px-6 rounded-lg transition-colors"
          >
            {t('home', 'navbar', 'button')}
          </a>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden">
          <button 
            onClick={toggleMobileMenu}
            className="p-2 rounded-full"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <CloseCircle size="26" color={isDarkMode ? 'white' : 'black'} />
            ) : (
              <HambergerMenu size="26" color={isDarkMode ? 'white' : 'black'} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-16 bg-white/20 dark:bg-black/20 md:hidden h-1/2 backdrop-blur-sm z-20 ">
          <div className="flex flex-col items-center">
            <Link 
              href="#home" 
              className={`pt-2 ${linkStyle('home')}`}
              onClick={() => handleLinkClick('home')}
            >
              {t('home', 'navbar', 1)}
            </Link>
            <Link 
              href="#about" 
              className={` pt-2 ${linkStyle('about')}`}
              onClick={() => handleLinkClick('about')}
            >
              {t('home', 'navbar', 2)}
            </Link>
            <Link 
              href="#guide" 
              className={`pt-2 ${linkStyle('guide')}`}
              onClick={() => handleLinkClick('guide')}
            >
              {t('home', 'navbar', 3)}
            </Link>
            <Link 
              href="#users" 
              className={` pt-2 ${linkStyle('users')}`}
              onClick={() => handleLinkClick('users')}
            >
              {t('home', 'navbar', 4)}
            </Link>
            <Link 
              href="#faq" 
              className={` pt-2 ${linkStyle('faq')}`}
              onClick={() => handleLinkClick('faq')}
            >
              {t('home', 'navbar', 5)}
            </Link>
            <Link 
              href="#contact" 
              className={`pt-2 ${linkStyle('contact')}`}
              onClick={() => handleLinkClick('contact')}
            >
              {t('home', 'navbar', 6)}
            </Link>

            {/* Mobile Login Button */}
            <a 
              href="/login" 
              className="w-3/5 text-center mt-2 bg-primary-600 dark:bg-primary-300 dark:hover:bg-primary-400 hover:bg-primary-700 text-neutral-50 dark:text-neutral-950 font-medium text-base py-2 rounded-lg transition-colors"
            >
              {t('home', 'navbar', 'button')}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;