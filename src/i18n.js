
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from "i18next-http-backend";

const i18nextLng = localStorage.getItem("i18nextLng")

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(Backend)
  .init({
    debug: false,
    lng: i18nextLng || 'ar', // default language
    fallbackLng: ['ar', 'en'],
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    react: {
      useSuspense: false,
    },
  });
i18n.on('languageChanged', (lng) => { document.documentElement.setAttribute('lang', lng); })
document.documentElement.lang = i18nextLng

export default i18n;

