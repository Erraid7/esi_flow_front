'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { useDarkMode } from '../../../darkLightMode/darkModeContext';
import { useLanguage } from '@/pages/translations/contexts/languageContext';

export default function FaqSection() {
  const { isDarkMode } = useDarkMode();
  const { t } = useLanguage();

  const [faqItems, setFaqItems] = useState([
    {
      id: 'faq-1',
      number: '01',
      isOpen: false,
    },
    {
      id: 'faq-2',
      number: '02',
      isOpen: false,
    },
    {
      id: 'faq-3',
      number: '03',
      isOpen: false,
    },
    {
      id: 'faq-4',
      number: '04',
      isOpen: false,
    },
    {
      id: 'faq-5',
      number: '05',
      isOpen: false,
    },
  ]);

  const toggleFaq = (id) => {
    setFaqItems(
      faqItems.map((item) =>
        item.id === id ? { ...item, isOpen: !item.isOpen } : item
      )
    );
  };

  return (
  <section className="overflow-auto px-4 md:px-20  flex flex-col gap-8 bg-neutral-50 dark:bg-neutral-990 pb-24" id='faq'>
    <div className="w-full  mx-auto px-4 md:px-20">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-russo text-neutral-990 dark:text-neutral-100 leading-tight">
          {t('home', 'faq', 'title', 1)}<br />{t('home', 'faq', 'title', 2)}
        </h1>
      </div>

      <div className="space-y-4">
        {faqItems.map((item, index) => (
          <div
            key={item.id}
            className={`faq-item transition-all duration-300 ease-in-out rounded-lg overflow-hidden border shadow-sm ${
              item.isOpen
                ? isDarkMode
                  ? 'bg-neutral-900 border-neutral-700'
                  : 'bg-neutral-100 border-neutral-300'
                : isDarkMode
                ? 'bg-neutral-950 border-neutral-800'
                : 'bg-neutral-50 border-neutral-200'
            } animate-fadeInScale`}
            style={{ animationDelay: `${0.1 * (index + 1)}s` }}
          >
            <div
              className="flex items-center justify-between p-4 md:p-6 cursor-pointer"
              onClick={() => toggleFaq(item.id)}
            >
              <div className="flex items-center gap-4">
                <span className="text-lg font-bold text-neutral-700 dark:text-neutral-300">
                  {item.number}
                </span>
                <h3 className="text-base md:text-lg lg:text-xl font-medium text-neutral-900 dark:text-neutral-100">
                  {t('home', 'faq', 'questions', index, 'question')}
                </h3>
              </div>
              <div
                className={`icon-container flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full transition-all duration-300 ${
                  item.isOpen
                    ? 'rotate-180 bg-neutral-300 dark:bg-neutral-700'
                    : 'bg-neutral-600 dark:bg-neutral-400'
                }`}
              >
                {item.isOpen ? (
                  <Minus
                    className={`w-4 h-4 md:w-5 md:h-5 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}
                  />
                ) : (
                  <Plus
                    className={`w-4 h-4 md:w-5 md:h-5 ${
                      isDarkMode ? 'text-white' : 'text-white'
                    }`}
                  />
                )}
              </div>
            </div>

            <div
              className={`answer-container overflow-hidden transition-all duration-500 ease-in-out ${
                item.isOpen ? 'max-h-[500px]' : 'max-h-0'
              }`}
            >
              <div className="px-4 md:px-8 pb-4 md:pb-6 pt-0 answer-content transition-all duration-500 ease-in-out transform-gpu opacity-0 translate-y-[-20px]" style={{
                opacity: item.isOpen ? 1 : 0,
                transform: item.isOpen ? 'translateY(0)' : 'translateY(-20px)'
              }}>
                <p className="text-sm md:text-base text-neutral-800 dark:text-neutral-200">
                  {t('home', 'faq', 'questions', index, 'answer')}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
 </section>
  );
}