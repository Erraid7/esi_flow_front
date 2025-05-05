import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../../translations/contexts/languageContext';
import { useDarkMode } from '../../../darkLightMode/darkModeContext';
import {Sun1, Moon, LanguageCircle, HambergerMenu, CloseCircle} from 'iconsax-react';
import Link from 'next/link';

// Define nav links with names and href
const navLinks = [
  { name: 'home', href: '#home', label: 'Home' },
  { name: 'about', href: '#about', label: 'About' },
  { name: 'guide', href: '#guide', label: 'Guide' },
  { name: 'users', href: '#users', label: 'Users' },
  { name: 'faq', href: '#faq', label: 'FAQ' },
  { name: 'contact', href: '#contact', label: 'Contact' }
];

const Navbar = () => {
  const { t, toggleLanguage } = useLanguage();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [activeLink, setActiveLink] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Update active link and scroll progress on scroll
  useEffect(() => {
    const handleScroll = () => {
      // Update active link
      const sections = navLinks.map((link) => document.getElementById(link.href.substring(1)));
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section, index) => {
        if (
          section && 
          section.offsetTop <= scrollPosition &&
          section.offsetTop + section.offsetHeight > scrollPosition
        ) {
          setActiveLink(navLinks[index].name);
        }
      });

      // Update scroll progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkStyle = (linkName) => `
    text-neutral-990 dark:text-neutral-100 font-semibold text-lg transition-colors duration-300
    ${activeLink === linkName 
      ? 'text-primary-600 dark:text-primary-300 border-b-2 border-primary-600 dark:border-primary-300 ' 
      : 'hover:text-primary-600 dark:hover:text-primary-300 border-b-2 border-transparent hover:border-primary-600 dark:hover:border-primary-300'}
    active:border-primary-600 dark:active:border-primary-300
  `;

  const handleLinkClick = (linkName) => {
    scrollToSection(linkName);
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
            <img src="/logo-v.svg" alt="" className='dark:hidden w-20 h-12' />
            <img src="/logo-v-dark.svg" alt="" className='hidden dark:block w-20 h-12' />
          </div>
          
          {/* Desktop Navigation */}
          <div className="flex items-center gap-12">
            {/* Desktop Links */}
            <div className="hidden md:flex justify-center items-center gap-9">
              {navLinks.map((link) => (
                <button 
                  key={link.name}
                  onClick={() => handleLinkClick(link.name)}
                  className={linkStyle(link.name)}
                >
                  {t('home', 'navbar', link.name === 'home' ? 1 : 
                     link.name === 'about' ? 2 : 
                     link.name === 'guide' ? 3 : 
                     link.name === 'users' ? 4 : 
                     link.name === 'faq' ? 5 : 
                     link.name === 'contact' ? 6 : 'button')}
                </button>
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
              className="w-fit hidden md:flex text-center px-8 bg-primary-600 dark:bg-primary-300 dark:hover:bg-primary-400 hover:bg-primary-700 text-neutral-50 dark:text-neutral-950  text-base py-2 rounded-lg transition-colors font-bold"
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
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleLinkClick(link.name)}
                  className={`pt-2 ${linkStyle(link.name)}`}
                >
                  {t('home', 'navbar', link.name === 'home' ? 1 : 
                     link.name === 'about' ? 2 : 
                     link.name === 'guide' ? 3 : 
                     link.name === 'users' ? 4 : 
                     link.name === 'faq' ? 5 : 
                     link.name === 'contact' ? 6 : 'button')}
                </button>
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