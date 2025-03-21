// pages/_app.jsx
import { useEffect } from 'react';
import '../styles/globals.css';
import Head from "next/head";
import { LanguageProvider } from "./translations/contexts/languageContext";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Check on app initialization if dark mode should be applied
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark' || 
        (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <>
      <Head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="description" content="Your website description here" />
      </Head>
      <LanguageProvider>
        <Component {...pageProps} />
      </LanguageProvider>
    </>
  );
}

export default MyApp;