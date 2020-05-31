import { findElement, createElement } from '../helpers/helperDOM';
import { LANGUAGES, TEMPERATURE_MEASURES, UPDATE_BACKGROUND_ICON } from '../constants/constants';
import translate from '../helpers/convertLanguage';
import microphoneDefaultIcon from '../assets/icons/microphone-white.svg';

const createHeaderContainer = () => {
  const headerContainer = createElement('header', ['header', 'container']);

  return headerContainer;
};

const createUpdateButton = (currentLang) => {
  const buttonUpdateBG = createElement('button', ['header-update'], UPDATE_BACKGROUND_ICON);
  buttonUpdateBG.setAttribute('title', translate(currentLang, 'header.update.btn'));

  return buttonUpdateBG;
};

const createLanguagesButtons = (currentLang) => {
  const buttonLanguages = createElement('div', ['header-languages']);

  LANGUAGES.map((lang) => {
    let classNames = ['header-languages__btn', `header-languages__btn--${lang}`];
    const buttonLanguage = createElement('button', classNames);
    const isActiveLang = lang === currentLang;
    buttonLanguage.name = lang;
    buttonLanguage.textContent = lang;

    if (isActiveLang) {
      classNames = `${classNames.join(' ')} header-languages__btn--active`;

      buttonLanguage.className = classNames;
    }

    return buttonLanguage;
  }).forEach((button) => buttonLanguages.appendChild(button));

  return buttonLanguages;
};

const createTemperatureButtons = () => {
  const currentTemperatureMeasure = localStorage.getItem('temperatureMeasure');
  const headerTemperaturesWrapper = createElement('div', ['header-temperatures']);

  TEMPERATURE_MEASURES.forEach((measure) => {
    let classNames = ['header__temperature', `header__temperature--${measure.value}`];
    const temperatureButton = createElement('button', classNames);
    temperatureButton.name = measure.value;
    temperatureButton.innerHTML = measure.icon;

    if (currentTemperatureMeasure === measure.value) {
      classNames = `${classNames.join(' ')} header__temperature--active`;
      temperatureButton.className = classNames;
    }

    headerTemperaturesWrapper.appendChild(temperatureButton);
  });

  return headerTemperaturesWrapper;
};

const createSearchInput = (currentLang) => {
  const placeholder = translate(currentLang, 'header.search.placeholder');
  const title = translate(currentLang, 'header.search.title');
  const innerHTML = `
    <input class="header-input" type="text" name="search" placeholder="${placeholder}" value="" title="${title}">
  `;
  const headerSearchWrapper = createElement('div', ['header-search'], innerHTML);
  const microphoneImg = `
    <img src=${microphoneDefaultIcon} class="header-microphone__img">
  `;
  const microphone = createElement('div', ['header-microphone'], microphoneImg);
  const textContent = translate(currentLang, 'header.search.button');
  const buttonSearch = createElement('button', ['header__search-btn'], textContent);

  headerSearchWrapper.appendChild(microphone);
  headerSearchWrapper.appendChild(buttonSearch);

  return headerSearchWrapper;
};

const createToaster = () => {
  const toaster = createElement('div', ['toaster-error']);

  return toaster;
};

const renderHeader = () => {
  const currentLang = localStorage.getItem('language');

  const body = findElement('body');
  const headerContainer = createHeaderContainer();
  const headerTools = createElement('div', ['header-tools']);

  headerTools.appendChild(createUpdateButton(currentLang));
  headerTools.appendChild(createLanguagesButtons(currentLang));
  headerTools.appendChild(createTemperatureButtons());
  headerContainer.appendChild(createSearchInput(currentLang));
  headerContainer.prepend(headerTools);
  headerContainer.appendChild(createToaster());
  body.prepend(headerContainer);
};

export default renderHeader;
