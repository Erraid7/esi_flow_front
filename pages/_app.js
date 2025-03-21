import "@/styles/globals.css";
import { LanguageProvider } from "./translations/contexts/languageContext";




function MyApp({ Component, pageProps }) {
  return (
    <LanguageProvider>
      <Component {...pageProps} />
    </LanguageProvider>
  );
}

export default MyApp;
