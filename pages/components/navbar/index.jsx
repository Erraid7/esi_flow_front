import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../translations/contexts/languageContext';
import { useDarkMode } from '../../darkLightMode/darkModeContext';
import {Sun1, Moon, LanguageCircle, HambergerMenu, CloseCircle} from 'iconsax-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar = () => {
  const { t, toggleLanguage } = useLanguage();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [activeLink, setActiveLink] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  // Automatically update active link based on current route/section
  useEffect(() => {
    const handleRouteChange = () => {
      const hash = window.location.hash.substring(1); // Remove the # from the hash
      setActiveLink(hash || 'home');
    };

    // Add event listener for hash changes
    window.addEventListener('hashchange', handleRouteChange);
    
    // Initial check when component mounts
    handleRouteChange();

    // Cleanup event listener
    return () => {
      window.removeEventListener('hashchange', handleRouteChange);
    };
  }, []);

  const linkStyle = (linkName) => `
    text-neutral-990 dark:text-neutral-100 font-semibold text-lg transition-colors duration-300
    ${activeLink === linkName 
      ? 'text-primary-600 dark:text-primary-300 border-b-2 border-primary-600 dark:border-primary-300 ' 
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
    <>
      {/* Blur overlay when mobile menu is open */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-10 backdrop-blur-sm bg-black/10 md:hidden h-full" 
          onClick={toggleMobileMenu}
        />
      )}

      <nav className="w-full">
        {/* Desktop Navbar */}
        <div className="fixed top-0 left-0 right-0 z-20 bg-white dark:bg-neutral-990 shadow-md dark:shadow-neutral-900 px-4 md:px-20 py-3 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src="/home/navbar/logo1.svg" alt="" className='dark:hidden' />
            <img src="/home/navbar/logo1-dark.svg" alt="" className='hidden dark:block' />
          </div>
          
          {/* Desktop Navigation */}
          <div className="flex items-center gap-12">
            {/* Desktop Links */}
            <div className="hidden md:flex justify-center items-center gap-9">
              {['home', 'about', 'guide', 'users', 'faq', 'contact'].map((linkName, index) => (
                <Link 
                  key={linkName}
                  href={`#${linkName}`} 
                  className={linkStyle(linkName)}
                  onClick={() => handleLinkClick(linkName)}
                >
                  {t('home', 'navbar', index + 1)}
                </Link>
              ))}
            </div>
            
            {/* Desktop Icons and Login */}
            <div className="flex items-center gap-6">
              {/* Dark Mode Toggle Button */}
              <button 
                onClick={toggleDarkMode}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? (
                  <Sun1 size="18" color="white" variant="Bold"/>
                ) : (
                  <Moon size="18" color="black" variant="Bold"/>
                )}
              </button>
              
              {/* Language selector icon */}
              <button 
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" 
                onClick={toggleLanguage}
              >
                {isDarkMode ? (
                  <LanguageCircle size="18" color="white" variant="Bold"/>
                ) : (
                  <LanguageCircle size="18" color="black" variant="Bold"/>
                )}
              </button>
            </div>
            
            
          </div>

          {/* Desktop Login Button */}
          <Link  
              href="../../login" 
              className="w-fit text-center px-8 bg-primary-600 dark:bg-primary-300 dark:hover:bg-primary-400 hover:bg-primary-700 text-neutral-50 dark:text-neutral-950 font-medium text-base py-2 rounded-lg transition-colors"
              >
              {t('home', 'navbar', 'button')}
            </Link>

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
          <div className="fixed inset-x-0 top-16 bg-white dark:bg-neutral-990 md:hidden h-fit z-30">
            <div className="flex flex-col items-center gap-2 py-5">
              {['home', 'about', 'guide', 'users', 'faq', 'contact'].map((linkName, index) => (
                <Link 
                  key={linkName}
                  href={`#${linkName}`} 
                  className={`pt-2 ${linkStyle(linkName)}`}
                  onClick={() => handleLinkClick(linkName)}
                >
                  {t('home', 'navbar', index + 1)}
                </Link>
              ))}

              {/* Mobile Login Button */}
              <Link 
                href="../../login" 
                className="w-fit text-center px-8 bg-primary-600 dark:bg-primary-300 dark:hover:bg-primary-400 hover:bg-primary-700 text-neutral-50 dark:text-neutral-950 font-medium text-sm py-2 rounded-lg transition-colors"
              >
                {t('home', 'navbar', 'button')}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;