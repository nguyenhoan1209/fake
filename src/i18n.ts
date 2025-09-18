import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import i18nResources from 'assets/locales';
import { KEY_LANGUAGE, LANGUAGE_EN, LANGUAGE_VI } from 'config/constants';

i18next.use(initReactI18next).init({
  lng: window.localStorage.getItem(KEY_LANGUAGE) || LANGUAGE_VI,
  fallbackLng: [LANGUAGE_VI, LANGUAGE_EN],
  resources: i18nResources,
  interpolation: {
    escapeValue: false,
  },
  saveMissing: true,
  debug: import.meta.env.DEV,
});

i18next.services.formatter?.add('lowercase', (value) => {
  return value.toLowerCase();
});

export default i18next;
