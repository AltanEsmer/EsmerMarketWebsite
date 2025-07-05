import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import only Turkish translation
import translationTR from '../public/locales/tr/common.json';

// The translations
const resources = {
  tr: {
    common: translationTR,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'tr',
    fallbackLng: 'tr',
    
    ns: ['common'],
    defaultNS: 'common',
    
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n; 