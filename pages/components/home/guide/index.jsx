import React, { useState } from 'react';
import { useLanguage } from '../../../translations/contexts/languageContext';
import { useDarkMode } from '../../../darkLightMode/darkModeContext';
import {DocumentDownload} from 'iconsax-react';
import CustomYouTube from "./CustomYouTube";
export default function Home() {
    const { t, toggleLanguage } = useLanguage();
    const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <section id='guide' className="px-4 md:px-20  flex flex-col gap-8 bg-neutral-50 dark:bg-neutral-990 pb-12">
     
        {/* Discover Section */}
      
        <div className="flex flex-col gap-5">
          <h6 className="text-[40px] md:text-[80px] font-russo text-neutral-950 dark:text-neutral-100 leading-tight">
            {t('home' , 'howItWorks' , 'title' , 1)} <br /> {t('home' , 'howItWorks' , 'title' , 2)} 
          </h6>
          <p className="text-sm md:text-lg text-neutral-950 dark:text-neutral-100 leading-relaxed max-w-3xl">
            {t('home' , 'howItWorks' , 'description')} 
          </p>
          
          <CustomYouTube videoId="lfmg-EJ8gm4"  />
          <button className="flex items-center w-fit gap-3 bg-primary-600 hover:bg-primary-700 hover:dark:bg-primary-400 dark:bg-primary-300 dark:text-neutral-950 text-neutral-100 font-semibold text-xs md:text-xl py-3 md:py-4 px-7 md:px-8 rounded-md transition-colors self-end">
            {t('home' , 'howItWorks' , 'button')}  
            {isDarkMode ? (
              <DocumentDownload size="26" color="black" className='hidden md:block'/>

            ) : (
              <DocumentDownload size="28" color="white" className='hidden md:block'/>
            )}
            {isDarkMode ? (
              <DocumentDownload size="20" color="black" className='block md:hidden'/>

            ) : (
              <DocumentDownload size="20" color="white" className='block md:hidden'/>
            )}
            
            

          </button>
          
        </div>

       
     

      {/* Mission Section */}
      
      
      
    </section>
  );
}
