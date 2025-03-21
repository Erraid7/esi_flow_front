import { useLanguage } from "./translations/contexts/languageContext";

export default function Home() {
  const { t, toggleLanguage } = useLanguage();
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <button
        onClick={toggleLanguage}
        className="absolute top-4 right-4 px-3 py-1 bg-gray-200 text-gray-800 rounded text-sm"
      >
        {t('common', 'toggleLanguage')}
      </button>
      <h1 className="text-4xl font-bold mb-4">{t('home', 'title')}</h1>
      <p className="mb-8">{t('home', 'description')}</p>
      <a href="/components/login" className="px-4 py-2 bg-blue-500 text-white rounded">
        {t('home', 'button')}
      </a>
    </div>
  );
}