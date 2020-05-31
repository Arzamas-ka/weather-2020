import { findElement, createElement, insertBefore } from '../helpers/helperDOM';
import translate from '../helpers/convertLanguage';
import soundIconDefault from '../assets/icons/sound_white.svg';

const createMainContainer = () => {
  const main = createElement('main', ['main', 'container']);

  return main;
};

const createSoundBlock = () => {
  const innerHTML = `<img class="sound-img" src=${soundIconDefault}>`;
  const soundContainer = createElement('div', ['sound-wrapper'], innerHTML);

  return soundContainer;
};

const createLocationBlock = () => {
  const locationContainer = createElement('div', ['section-left__location-container']);
  const locationCity = createElement('span', ['section-left__location', 'section-left__location--city']);
  const locationCountry = createElement('span', ['section-left__location', 'section-left__location--country']);
  const locationFlag = createElement('span', ['section-left__location', 'section-left__location--flag']);

  return {
    locationContainer,
    locationCity,
    locationCountry,
    locationFlag,
  };
};

const createDateBlock = () => {
  const dateContainer = createElement('div', ['section-left__date-container']);
  const dataDay = createElement('span', ['section-left__date', 'section-left__date--day']);
  const dataMonth = createElement('span', ['section-left__date', 'section-left__date--month']);
  const dataDayNumeric = createElement('span', ['section-left__date', 'section-left__date--day-numeric']);
  const dataHours = createElement('span', ['section-left__date', 'section-left__date--hours']);

  return {
    dateContainer,
    dataDay,
    dataMonth,
    dataDayNumeric,
    dataHours,
  };
};

const createCurrentWeatherBlock = (currentLang) => {
  const currentWeather = createElement('div', ['section-left__current-weather-container']);
  const sectionDegree = createElement('div', ['section-left__current-degree']);
  const sectionDegreePrecipitation = createElement('div', ['section-left__precipitation-container']);

  sectionDegreePrecipitation.innerHTML = `
    <img class="section-left__precipitation section-left__precipitation--icon"></img>
    <span class="section-left__precipitation section-left__precipitation--summary"></span>
    <div class="section-left__phenomena-container">
      <span class="section-left__phenomena section-left__phenomena--feels">${translate(
    currentLang,
    'main.feels'
  )}</span>
      <span class="section-left__phenomena section-left__phenomena--feels-phenomena"></span>
    </div>
    <div class="section-left__phenomena-container">
      <span class="section-left__phenomena section-left__phenomena--wind">${translate(currentLang, 'main.wind')} </span>
      <span class="section-left__phenomena section-left__phenomena--wind-phenomena"></span>
      <span class="section-left__phenomena section-left__phenomena--wind-speed"> ${translate(
    currentLang,
    'main.wind.speed'
  )}</span>
    </div>
    <div class="section-left__phenomena-container">
      <span class="section-left__phenomena section-left__phenomena--humidity">${translate(
    currentLang,
    'main.humidity'
  )} </span>
      <span class="section-left__phenomena section-left__phenomena--humidity-phenomena"></span>
    </div>
  `;

  currentWeather.append(sectionDegree);
  currentWeather.append(sectionDegreePrecipitation);

  return currentWeather;
};

const createFeatureDaysWeatherBlock = () => {
  const featureDays = createElement('div', ['section-left__feature-weather-container']);

  featureDays.innerHTML = `
    <div class="section-left__day-container">
      <span class="section-left__next section-left__tomorrow"></span>
      <img id="img-tomorrow"></>
      <span class="section-left__day--degree-tomorrow"></span>
    </div>
    <div class="section-left__day-container">
      <span class="section-left__next section-left__day-after-tomorrow"></span>
      <img id="img-after-tomorrow"></>
      <span class="section-left__day--degree-after-tomorrow"></span>
    </div>
    <div class="section-left__day-container">
      <span class="section-left__next section-left__second-day-after-tomorrow"></span>
      <img id="img-second-after-tomorrow"></>
      <span class="section-left__day--degree-second-day-after-tomorrow"></span>
    </div>
  `;

  return featureDays;
};

const createMapContainer = () => {
  const sectionMap = createElement('div', ['section-right__map']);

  return sectionMap;
};

const createCoordinatesBlock = (currentLang) => {
  const sectionCoordinates = createElement('div', ['section-right__coordinates']);

  sectionCoordinates.innerHTML = `
    <div class="section__coordinates--lat">
      <span class="section__latitude">${translate(currentLang, 'main.latitude')} </span>
      <span class="section__latitude--text"></span>
    </div>
    <div class="section__coordinates--lon">
      <span class="section__longitude">${translate(currentLang, 'main.longitude')} </span>
      <span class="section__longitude--text"></span>
    </div>
  `;

  return sectionCoordinates;
};

const createTickerContainer = () => {
  const footerContainer = createElement('div', ['ticker-wrap']);

  return footerContainer;
};

const renderLeftSection = () => {
  const currentLang = localStorage.getItem('language');

  const leftSection = createElement('section', ['section-left']);
  const sectionLocation = createLocationBlock();
  const locationWrapper = sectionLocation.locationContainer;
  const dataSection = createDateBlock();
  const dataSectionWrapper = dataSection.dateContainer;

  leftSection.prepend(locationWrapper);
  leftSection.prepend(createSoundBlock());
  locationWrapper.append(sectionLocation.locationCity);
  locationWrapper.append(sectionLocation.locationCity);
  locationWrapper.append(sectionLocation.locationCountry);
  locationWrapper.append(sectionLocation.locationFlag);
  leftSection.append(dataSectionWrapper);
  dataSectionWrapper.append(dataSection.dataDay);
  dataSectionWrapper.append(dataSection.dataMonth);
  dataSectionWrapper.append(dataSection.dataDayNumeric);
  dataSectionWrapper.append(dataSection.dataHours);
  leftSection.append(createCurrentWeatherBlock(currentLang));
  leftSection.append(createFeatureDaysWeatherBlock());

  return leftSection;
};

const renderRightSection = () => {
  const currentLang = localStorage.getItem('language');

  const rightSection = createElement('section', ['section-right']);

  rightSection.append(createMapContainer());
  rightSection.append(createCoordinatesBlock(currentLang));

  return rightSection;
};

const renderMain = () => {
  const script = findElement('script');
  const mainContainer = createMainContainer();

  insertBefore(script, mainContainer);
  mainContainer.prepend(renderLeftSection());
  mainContainer.append(renderRightSection());
  findElement('body').append(createTickerContainer());
};

export default renderMain;
