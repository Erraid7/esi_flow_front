import React, { useState } from 'react';
import { useLanguage } from '../../translations/contexts/languageContext';
import { useDarkMode } from '../../darkLightMode/darkModeContext';
export default function Home() {
    const { t, toggleLanguage } = useLanguage();
    const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <section className="overflow-auto px-4 md:px-20  flex flex-col gap-8 bg-neutral-50 dark:bg-neutral-990 pb-24" id='about'>
     
        {/* Discover Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 ">
        <div className="flex flex-col gap-5">
          <h6 className="text-[40px] md:text-[80px] font-russo text-neutral-950 dark:text-neutral-100 leading-tight">
            {t('home' , 'discover' , 'title')} <br /> Flow
          </h6>
          <p className="text-sm md:text-lg text-neutral-950 dark:text-neutral-100 leading-relaxed">
            <span className="text-sm md:text-lg font-bold">{t('home' , 'discover' , 'about')} </span> <br />
            {t('home' , 'discover' , 'aboutDescription')} 
          </p>
        </div>
        <img src="home/explor/image2.svg" />
      </div>

      {/* Mission Section */}
      <div className="flex flex-col md:flex-row gap-10 md:gap-28">
        <img src="home/explor/image1.svg" className="hidden md:block" />
        <div className="flex flex-col gap-8 items-center md:items-start">
          <p className="text-sm md:text-lg text-neutral-950 dark:text-neutral-100 leading-relaxed">
            <span className="text-sm md:text-lg font-bold">{t('home' , 'discover' , 'mission')} </span> <br />
            {t('home' , 'discover' , 'missionDescription')} 
          </p>
        </div>
      </div>
     
      
    </section>
  );
}
