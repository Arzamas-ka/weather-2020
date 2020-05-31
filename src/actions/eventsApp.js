import { findElement } from '../helpers/helperDOM';
import updateBackground from './updateBackground';
import translatePage from './translatePage';
import { handlerSearchButton, eventEnterOnInput, eventFocusOnInput } from './eventSearch';
import { convertFahrenheit, convertCelsius } from './switchTemperatures';

const eventsApp = () => {
  findElement('.header-update').addEventListener('click', updateBackground);
  findElement('.header-languages').addEventListener('click', translatePage);
  findElement('.header__temperature--fahrenheit').addEventListener('click', convertFahrenheit);
  findElement('.header__temperature--celsius').addEventListener('click', convertCelsius);
  findElement('.header__search-btn').addEventListener('click', handlerSearchButton);
  findElement('.header-input').addEventListener('keydown', eventEnterOnInput);
  findElement('.header-input').addEventListener('focus', eventFocusOnInput);
};

export default eventsApp;
