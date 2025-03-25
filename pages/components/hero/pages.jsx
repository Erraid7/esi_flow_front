// components/hero/pages.jsx
import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/pages/translations/contexts/languageContext';

const Hero = () => {
  const { t, toggleLanguage } = useLanguage();
  return (
    <section id='home' className="flex flex-col items-center justify-center min-h-screen bg-neutral-50 dark:bg-neutral-950 px-4 py-12 text-center mt-16">
      {/* Logo */}
      <img src="/home/hero/logo12.svg" alt="" className='mb-6 dark:hidden' />
      <img src="/home/hero/logo1-dark.svg" alt="" className='mb-6 hidden dark:block' />
     
      
      {/* Welcome text */}
      <h2 className="text-5xl  font-russo mb-4 text-neutral-950 dark:text-white">
        {t( 'home', 'hero', 'title' , 1)} <span className='text-primary-600 dark:text-primary-300 text-5xl  font-russo'>{t( 'home', 'hero', 'title' , 2)}</span> {t( 'home', 'hero', 'title' , 3)} 
      </h2>
      
      {/* Tagline */}
      <h3 className="text-5xl  font-russo mb-8 dark:text-white">
      {t('home', 'hero', 'subtitle')}
      </h3>
      
      {/* Description */}
      <p className="max-w-2xl text-l mx-auto mb-8 text-neutral-990 dark:text-white">
      {t('home', 'hero', 'description')}
      </p>
      
      {/* CTA Button */}
      <Link href="/connect">
        <button className="bg-primary-600 hover:bg-primary-700 hover:dark:bg-primary-400 dark:bg-primary-300 text-white dark:text-black font-medium py-2 px-6 rounded-md transition-colors">
        {t('home', 'hero', 'button')}
        </button>
      </Link>
    </section>
  );
};

export default Hero;