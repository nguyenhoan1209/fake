import { KEY_LANGUAGE, LANGUAGE_VI } from 'config/constants';

const getLanguage = (): string => {
  return window.localStorage.getItem(KEY_LANGUAGE) || LANGUAGE_VI;
};

export default getLanguage;
