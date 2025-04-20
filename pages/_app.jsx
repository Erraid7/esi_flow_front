// pages/_app.jsx
import { useEffect } from 'react';
import '../styles/globals.css';
import Head from "next/head";
import { LanguageProvider } from "./translations/contexts/languageContext";
import { DarkModeProvider } from './darkLightMode/darkModeContext';

function MyApp({ Component, pageProps }) {

  return (
    <>
      <Head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="description" content="Your website description here" />
      </Head>
      <LanguageProvider>
        <DarkModeProvider>
          <Component {...pageProps} />
        </DarkModeProvider>
      </LanguageProvider>
    </>
  );
}

export default MyApp;