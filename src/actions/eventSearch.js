import { findElement } from '../helpers/helperDOM';
import {
  EMPTY_STRING, ENTER_KEY_CODE, DISLOCATION, PROXY_URL
} from '../constants/constants';
import { showLoader, hideLoader } from '../render/renderLoader';
import renderMap from '../render/renderMap';
import updateBackground from './updateBackground';
import getCurrentCityCountry from '../apiData/currentDislocation';
import getCurrentWeather from '../apiData/currentWeather';
import createTicker from '../render/renderTicker';
import { sharedLocation } from '../apiData/geocodingData';

const getSearchableCityName = () => findElement('.header-input').value;

const requestCityGeocodingData = (url) => fetch(url).then((response) => response.json());

const getGeocodingData = (geo) => {
  const lat = geo.results[0].geometry.lat;
  const long = geo.results[0].geometry.lng;

  sharedLocation.latitudeNumber = lat;
  sharedLocation.longitudeNumber = long;

  return { lat, long };
};

const getGeocodingDataForRender = (geo) => {
  const lat = geo.results[0].annotations.DMS.lat;
  const long = geo.results[0].annotations.DMS.lng;

  return { lat, long };
};

const renderCoordinates = ({ lat, long }) => {
  const latitudeText = findElement('.section__latitude--text');
  const latitudeNumber = lat.slice(0, 7);
  latitudeText.textContent = latitudeNumber;

  const longitudeText = findElement('.section__longitude--text');
  const longitudeNumber = long.slice(0, 7);
  longitudeText.textContent = longitudeNumber;
};

export const handlerSearchButton = async () => {
  const cityName = getSearchableCityName();
  showLoader();
  const requestUrl = `${PROXY_URL}${DISLOCATION.apiUrl}?q=${cityName}&key=${DISLOCATION.token}`;
  try {
    const cityGeocodingData = await requestCityGeocodingData(requestUrl);
    await updateBackground();
    const coordinates = getGeocodingData(cityGeocodingData);

    const coordinatesForRender = getGeocodingDataForRender(cityGeocodingData);
    renderCoordinates(coordinatesForRender);
    await Promise.all([
      renderMap(coordinates),
      getCurrentCityCountry(coordinates),
      getCurrentWeather(coordinates),
    ]);
    createTicker();
    hideLoader();
  } catch (error) {
    hideLoader();
    const input = findElement('.header-input');
    input.value = 'Incorrect city name';
    input.classList.add('header-input--error');
  }
};

export const eventEnterOnInput = (event) => {
  if (event.keyCode === ENTER_KEY_CODE) {
    event.target.blur();
    handlerSearchButton();
  }
};

export const eventFocusOnInput = () => {
  findElement('.header-input').classList.remove('header-input--error');
  findElement('.header-input').value = EMPTY_STRING;
  findElement('.header-input').placeholder = EMPTY_STRING;
};
