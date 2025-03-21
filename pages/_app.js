import Head from "next/head";
import "@/styles/globals.css";
import { LanguageProvider, useLanguage } from "./translations/contexts/languageContext";

function AppContent({ Component, pageProps }) {
  const { language } = useLanguage();
  
  return (
    <div dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Component {...pageProps} />
    </div>
  );
}

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="description" content="Your website description here" />
      </Head>
      <LanguageProvider>
        <AppContent Component={Component} pageProps={pageProps} />
      </LanguageProvider>
    </>
  );
}

export default MyApp;