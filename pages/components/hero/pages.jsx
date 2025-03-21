// components/hero/pages.jsx
import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/pages/translations/contexts/languageContext';

const Hero = () => {
  const { t, toggleLanguage } = useLanguage();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F5F7F8] dark:bg-neutral-950 px-4 py-12 text-center">
      {/* Logo */}
      <img src="/logo12.svg" alt="" className='mb-6 dark:hidden' />
      <img src="/logo1-dark.svg" alt="" className='mb-6 hidden dark:block' />
     
      
      {/* Welcome text */}
      <h2 className="text-5xl  font-russo mb-4 dark:text-white">
        Welcome to <span className="text-[#254E7A]">ESI </span>FLOW
      </h2>
      
      {/* Tagline */}
      <h3 className="text-5xl  font-russo mb-8 dark:text-white">
      {t('hero', 'title')}
      </h3>
      
      {/* Description */}
      <p className="max-w-2xl text-l font-inter mx-auto mb-8 text-[#212529] dark:text-white">
        ESI Flow is the ideal solution to report and track all technical issues at ESI. 
        Thanks to a fluid and intuitive interface, stay informed of current incidents 
        and actively participate in improving your academic environment.
      </p>
      
      {/* CTA Button */}
      <Link href="/connect">
        <button className="bg-[#0D57AB] hover:bg-[#82C2E6] text-white font-medium py-2 px-6 rounded-md transition-colors">
          Connectez-vous
        </button>
      </Link>
    </div>
  );
};

export default Hero;