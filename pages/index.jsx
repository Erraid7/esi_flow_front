// pages/index.jsx
import Hero from './components/hero/pages';
import WhoCanUse from './components/users';
import FAQ from './components/faq/index';
import Nav from './components/navbar/index';
import Explor from './components/about/index';
import How from './components/guide/index';
import { useLanguage } from './translations/contexts/languageContext';
import edituser from './edit_user/index';



export default function Home() {
  const { t, toggleLanguage } = useLanguage();
  
  return (
    <div className="bg-neutral-50 dark:bg-neutral-990">
      <Nav />
      <Hero />
      <Explor/>
      <How />
      <WhoCanUse />
      <FAQ />
      {/* add link to edit user page */}
      <div className="flex justify-center mt-8">
        <a href="/edit_user" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
          {t('edit_user')}
        </a>
      </div>
    </div>
  );
}