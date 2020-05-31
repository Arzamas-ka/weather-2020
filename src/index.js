import { showLoader, hideLoader } from './render/renderLoader';
import renderHeader from './render/renderHeader';
import renderMain from './render/renderMain';
import createTicker from './render/renderTicker';
import getCurrentGeocoding, { getCurrentMap } from './apiData/geocodingData';
import getCurrentCityCountry from './apiData/currentDislocation';
import getCurrentWeather from './apiData/currentWeather';
import getCurrentDate from './apiData/currentDate';
import eventsApp from './actions/eventsApp';
import updateBackground from './actions/updateBackground';
import { initialAppSettings } from './helpers/helperUI';
import initializeSpeechRecognition, { listenToWeather } from './render/renderSpeechRecognition';

import './styles/init.scss';

showLoader();
renderHeader();
renderMain();

getCurrentGeocoding()
  .then(getCurrentMap)
  .then(getCurrentCityCountry)
  .then(getCurrentWeather)
  .then(getCurrentDate)
  .then(updateBackground)
  .then(createTicker)
  .then(listenToWeather)
  .then(hideLoader);

initialAppSettings();
eventsApp();
initializeSpeechRecognition();
