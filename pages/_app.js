import Head from "next/head";
import "@/styles/globals.css";
import { LanguageProvider } from "./translations/contexts/languageContext";

function MyApp({ Component, pageProps }) {
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