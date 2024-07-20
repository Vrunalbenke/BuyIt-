import en from './en.json';
import es from './es.json';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

export const languages = {
  en: {
    translation: en,
  },
  es: {
    translation: es,
  },
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: languages,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
