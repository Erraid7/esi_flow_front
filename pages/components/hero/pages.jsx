// components/hero/pages.jsx
import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/pages/translations/contexts/languageContext';

const Hero = () => {
  const { t, toggleLanguage } = useLanguage();
  return (
    <section id='home' className="flex flex-col items-center justify-center  bg-neutral-50 dark:bg-neutral-990 px-4 py-24 text-center ">
      {/* Logo */}
      <img src="/home/hero/logo12.svg" alt="" className='mb-6 dark:hidden max-w-40 md:max-w-80' />
      <img src="/home/hero/logo1-dark.svg" alt="" className='mb-6 hidden dark:block max-w-40 md:max-w-80' />
     
      
      {/* Welcome text */}
      <h2 className="text-3xl md:text-5xl  font-russo mb-4 text-neutral-950 dark:text-neutral-100">
        {t( 'home', 'hero', 'title' , 1)} <span className='text-primary-600 dark:text-primary-300 text-3xl md:text-5xl  font-russo'>{t( 'home', 'hero', 'title' , 2)}</span> {t( 'home', 'hero', 'title' , 3)} 
      </h2>
      
      {/* Tagline */}
      <h3 className="text-3xl md:text-5xl font-russo mb-8 text-neutral-950 dark:text-neutral-100">
      {t('home', 'hero', 'subtitle')}
      </h3>
      
      {/* Description */}
      <p className="max-w-3xl text-sm md:text-lg mx-auto mb-8 text-neutral-950 dark:text-neutral-100">
      {t('home', 'hero', 'description')}
      </p>
      
      {/* CTA Button */}
      <Link href="/connect">
        <button className="bg-primary-600 hover:bg-primary-700 hover:dark:bg-primary-400 dark:bg-primary-300 dark:text-neutral-950 text-neutral-100 font-medium text-base py-2 md:py-3 px-6 md:px-14 rounded-lg transition-colors">
        {t('home', 'hero', 'button')}
        </button>
      </Link>
    </section>
  );
};

export default Hero;