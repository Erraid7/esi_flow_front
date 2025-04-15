// pages/index.jsx
import Hero from './components/hero/pages';
import WhoCanUse from './components/users';
import FAQ from './components/faq/newindex';
import Nav from './components/navbar/index';
import Explor from './components/about/index';
import How from './components/guide/index';
import { useLanguage } from './translations/contexts/languageContext';
import Contact from './components/contact/index';

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
      <Contact />
    </div>
  );
}