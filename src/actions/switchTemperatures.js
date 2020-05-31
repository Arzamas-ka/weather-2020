/* eslint-disable max-len */
import { findElement } from '../helpers/helperDOM';
import {
  PARSE_INT_BASE,
  COEFFICIENT_CELSIUS_FAHRENHEIT,
  DEGREE_SIGN, TEMPERATURE_NAMES,
  SPACE
} from '../constants/constants';
import { roundInteger } from '../helpers/helperUI';
import createTicker from '../render/renderTicker';

const fahrenheitToCelsius = (className) => {
  const currentTemperature = parseInt(findElement(className).textContent, PARSE_INT_BASE)
  * COEFFICIENT_CELSIUS_FAHRENHEIT.coefficient + COEFFICIENT_CELSIUS_FAHRENHEIT.fahrenheit;
  findElement(className).innerHTML = `${SPACE} ${roundInteger(`${currentTemperature}`)}${DEGREE_SIGN}`;
};

const celsiusToFahrenheit = (className) => {
  const currentTemperature = (parseInt(findElement(className).textContent, PARSE_INT_BASE)
   - COEFFICIENT_CELSIUS_FAHRENHEIT.fahrenheit) / COEFFICIENT_CELSIUS_FAHRENHEIT.coefficient;
  findElement(className).innerHTML = `${SPACE} ${roundInteger(`${currentTemperature}`)}${DEGREE_SIGN}`;
};

export const convertFahrenheit = () => {
  if (localStorage.getItem('temperatureMeasure') === TEMPERATURE_NAMES.celsius) {
    localStorage.setItem('temperatureMeasure', TEMPERATURE_NAMES.fahrenheit);

    findElement('.header__temperature--celsius').classList.remove('header__temperature--active');
    findElement('.header__temperature--fahrenheit').classList.add('header__temperature--active');

    fahrenheitToCelsius('.section-left__current-degree');
    fahrenheitToCelsius('.section-left__phenomena--feels-phenomena');
    fahrenheitToCelsius('.section-left__day--degree-tomorrow');
    fahrenheitToCelsius('.section-left__day--degree-after-tomorrow');
    fahrenheitToCelsius('.section-left__day--degree-second-day-after-tomorrow');

    createTicker();
  } else {
    return;
  }
};

export const convertCelsius = () => {
  if (localStorage.getItem('temperatureMeasure') === TEMPERATURE_NAMES.fahrenheit) {
    localStorage.setItem('temperatureMeasure', TEMPERATURE_NAMES.celsius);

    findElement('.header__temperature--fahrenheit').classList.remove('header__temperature--active');
    findElement('.header__temperature--celsius').classList.add('header__temperature--active');

    celsiusToFahrenheit('.section-left__current-degree');
    celsiusToFahrenheit('.section-left__phenomena--feels-phenomena');
    celsiusToFahrenheit('.section-left__day--degree-tomorrow');
    celsiusToFahrenheit('.section-left__day--degree-after-tomorrow');
    celsiusToFahrenheit('.section-left__day--degree-second-day-after-tomorrow');

    createTicker();
  } else {
    return;
  }
};
