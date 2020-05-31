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

const getSearchableCityName = () => findElement('.header-input').value;

const requestCityGeocodingData = (url) => fetch(url).then((response) => response.json());

const getGeocodingData = (geo) => {
  const lat = geo.results[0].geometry.lat;
  const long = geo.results[0].geometry.lng;

  return { lat, long };
};

const renderCoordinates = ({ lat, long }) => {
  const latitudeText = findElement('.section__latitude--text');
  const latitudeNumber = lat.toFixed(3);
  latitudeText.textContent = latitudeNumber;

  const longitudeText = findElement('.section__longitude--text');
  const longitudeNumber = long.toFixed(3);
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
    renderCoordinates(coordinates);
    await Promise.all([renderMap(coordinates), getCurrentCityCountry(coordinates), getCurrentWeather(coordinates)]);
    createTicker();
    hideLoader();
  } catch (error) {
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
