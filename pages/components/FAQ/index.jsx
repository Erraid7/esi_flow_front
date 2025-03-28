import { useState, useRef, useEffect } from 'react';
import { ArrowDown2, ArrowRight2 } from 'iconsax-react';
import { useDarkMode } from '../../darkLightMode/darkModeContext';
import { useLanguage } from '@/pages/translations/contexts/languageContext';

export default function ESIFlowFAQs() {
  const [openQuestion, setOpenQuestion] = useState(null);
  const { isDarkMode } = useDarkMode();
  const { t, toggleLanguage } = useLanguage();

  const faqs = [
    {
      id: 'what',
      question: t('home','faq','questions',0,'question'),
      answer: t('home','faq','questions',0,'answer'),
    },
    {
      id: 'who',
      question: t('home','faq','questions',1,'question'),
      answer: t('home','faq','questions',1,'answer'),
    },
    {
      id: 'how',
      question: t('home','faq','questions',2,'question'),
      answer: t('home','faq','questions',2,'answer'),
    },
    {
      id: 'track',
      question: t('home','faq','questions',3,'question'),
      answer: t('home','faq','questions',3,'answer'),
    }
  ];

  const toggleQuestion = (id) => {
    setOpenQuestion(openQuestion === id ? null : id);
  };

  return (
    <section
      className="my-8 px-4 md:px-20 flex flex-col gap-8 bg-neutral-50 dark:bg-neutral-990 pb-24"
      id="faq"
    >
      <h1 className="text-[40px] md:text-[80px] font-russo text-neutral-950 dark:text-neutral-100 leading-tight">
        {t('home','faq','title',1)}
        <br />
        {t('home','faq','title',2)}
      </h1>

      <div className="flex flex-col gap-2">
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className="bg-white dark:bg-neutral-950 hover:bg-gray-50 dark:hover:bg-neutral-900 transition-colors rounded-md overflow-hidden"
          >
            <button
              onClick={() => toggleQuestion(faq.id)}
              className="w-full px-4 py-5 text-left flex justify-between items-center"
            >
              <span className="font-medium text-neutral-950 dark:text-neutral-100">
                {faq.question}
              </span>
              <span className="transition-transform duration-300">
                {openQuestion === faq.id ? (
                  <ArrowDown2 size="16" color={isDarkMode ? "white" : "#254E7A"} />
                ) : (
                  <ArrowRight2 size="16" color={isDarkMode ? "white" : "#254E7A"} />
                )}
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${openQuestion === faq.id ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
            >
              <div className="px-4 pb-5 w-full">
                <p className="text-neutral-950 dark:text-neutral-100 text-sm md:text-base break-words">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}