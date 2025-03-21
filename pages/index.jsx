// pages/index.jsx
import Hero from '../components/hero/pages';
import WhoCanUse from '../components/whoCanUse/pages';
import FAQ from '../components/FAQ/index';
import Nav from '../components/nav/index';



export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <WhoCanUse />
      <FAQ />
     
    </main>
  );
}