// pages/index.jsx
import Hero from './components/hero/pages';
import WhoCanUse from './components/users/pages';
import FAQ from './components/faq/index';
import Nav from './components/navbar/index';
import { useLanguage } from './translations/contexts/languageContext';



export default function Home() {
  const { t, toggleLanguage } = useLanguage();
  
  return (
   
  
    <>

    
    
      <Nav />
      <Hero />
      <WhoCanUse />
      <FAQ />
     
 
    </>
  );
}