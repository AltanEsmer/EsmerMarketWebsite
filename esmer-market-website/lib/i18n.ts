import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import all translation files
import translationEN from '../public/locales/en/common.json';
import translationTR from '../public/locales/tr/common.json';

// The translations
const resources = {
  en: {
    common: translationEN,
  },
  tr: {
    common: translationTR,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Default language
    fallbackLng: 'en', // Fallback language
    
    ns: ['common'], // Namespaces
    defaultNS: 'common',
    
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n; 