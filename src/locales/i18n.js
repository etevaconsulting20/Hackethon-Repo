import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./languages/en.json";
import fi from "./languages/fi.json";



const Languages = ["en", "fi"];
const resources = {
  en: en,
  fi: fi,
};

const getBrowserLocal = () => {
  let _locale = window.navigator.userLanguage || window.navigator.language;
  const trimmedLocale = _locale.trim();
  return trimmedLocale.split(/-|_/)[0];
}



i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: 'en',
    debug: false,
    whitelist: Languages,
    //detection: langDetectorOptions,
    lng: getBrowserLocal(),
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: resources,
    // react: {
    //   wait: true,
    //   bindI18n: "languageChanged loaded",
    //   bindStore: "added removed",
    //   nsMode: "default"
    // }
  });


export default i18n;