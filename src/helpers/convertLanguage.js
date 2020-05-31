import * as setOfWording from './translations.json';

const translate = (lang, key) => {
  let translation = setOfWording.default[lang][key];

  if (!translation) {
    translation = key.split('.').reduce((acc, next) => {
      if (acc && acc[next]) {
        return acc[next];
      }

      return acc;
    }, setOfWording.default[lang]);
  }

  return translation;
};

export default translate;
