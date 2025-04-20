// pages/index.jsx
import Hero from './components/home/hero/pages';
import WhoCanUse from './components/home/users';
import FAQ from './components/home/faq/index';
import Nav from './components/home/navbar/index';
import Explor from './components/home/about/index';
import How from './components/home/guide/index';
import { useLanguage } from './translations/contexts/languageContext';
import Contact from './components/home/contact/index';



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
      <Contact/>
    </div> 
  );
}