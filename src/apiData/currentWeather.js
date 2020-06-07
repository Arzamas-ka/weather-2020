import { findElement } from '../helpers/helperDOM';
import {
  PROXY_URL,
  WEATHER,
  DEGREE_SIGN,
  LANGUAGES_NAME,
  TEMPERATURE_NAMES,
  COEFFICIENT_CELSIUS_FAHRENHEIT,
  SPACE,
  HTTP_CODES
} from '../constants/constants';
import {
  weatherImages,
  convertFahrenheitToCelsius,
  roundInteger,
  errorShow
} from '../helpers/helperUI';

const drawCelsiusElements = (data) => {
  findElement('.section-left__current-degree').innerHTML = `${convertFahrenheitToCelsius(
    roundInteger(data.currently.temperature)
  )}${DEGREE_SIGN}`;
  findElement('.section-left__precipitation--icon').src = `${weatherImages[data.currently.icon]}`;
  findElement('.section-left__precipitation--summary').textContent = data.currently.summary;
  findElement(
    '.section-left__phenomena--feels-phenomena'
  ).innerHTML = `${SPACE} ${convertFahrenheitToCelsius(
    roundInteger(data.currently.apparentTemperature)
  )}${DEGREE_SIGN}`;
  findElement('.section-left__phenomena--wind-phenomena').innerHTML = `${SPACE} ${roundInteger(
    data.currently.windSpeed
  )}`;
  findElement('.section-left__phenomena--humidity-phenomena').innerHTML = `${SPACE} ${
    roundInteger(data.currently.humidity) * COEFFICIENT_CELSIUS_FAHRENHEIT.percent
  }%`;
  findElement('.section-left__day--degree-tomorrow').innerHTML = `${convertFahrenheitToCelsius(
    roundInteger(data.daily.data[1].temperatureMin + data.daily.data[1].temperatureMax) /
      COEFFICIENT_CELSIUS_FAHRENHEIT.half
  )}${DEGREE_SIGN}`;
  findElement('#img-tomorrow').src = `${weatherImages[data.daily.data[1].icon]}`;
  findElement(
    '.section-left__day--degree-after-tomorrow'
  ).innerHTML = `${convertFahrenheitToCelsius(
    roundInteger(data.daily.data[2].temperatureMin + data.daily.data[2].temperatureMax) /
      COEFFICIENT_CELSIUS_FAHRENHEIT.half
  )}${DEGREE_SIGN}`;
  findElement('#img-after-tomorrow').src = `${weatherImages[data.daily.data[2].icon]}`;
  findElement(
    '.section-left__day--degree-second-day-after-tomorrow'
  ).innerHTML = `${convertFahrenheitToCelsius(
    roundInteger(data.daily.data[3].temperatureMin + data.daily.data[3].temperatureMax) /
      COEFFICIENT_CELSIUS_FAHRENHEIT.half
  )}${DEGREE_SIGN}`;
  findElement('#img-second-after-tomorrow').src = `${weatherImages[data.daily.data[3].icon]}`;
};

const drawFahrenheitElements = (data) => {
  findElement('.section-left__current-degree').innerHTML = `${roundInteger(
    data.currently.temperature
  )}${DEGREE_SIGN}`;
  findElement('.section-left__precipitation--icon').src = `${weatherImages[data.currently.icon]}`;
  findElement('.section-left__precipitation--summary').textContent = data.currently.summary;
  findElement('.section-left__phenomena--feels-phenomena').innerHTML = `${SPACE} ${roundInteger(
    data.currently.apparentTemperature
  )}${DEGREE_SIGN}`;
  findElement('.section-left__phenomena--wind-phenomena').innerHTML = `${SPACE} ${roundInteger(
    data.currently.windSpeed
  )}`;
  findElement('.section-left__phenomena--humidity-phenomena').innerHTML = `${SPACE} ${
    roundInteger(data.currently.humidity) * COEFFICIENT_CELSIUS_FAHRENHEIT.percent
  }%`;
  findElement('.section-left__day--degree-tomorrow').innerHTML = `${roundInteger(
    (data.daily.data[1].temperatureMin + data.daily.data[1].temperatureMax) /
      COEFFICIENT_CELSIUS_FAHRENHEIT.half
  )}${DEGREE_SIGN}`;
  findElement('#img-tomorrow').src = `${weatherImages[data.daily.data[1].icon]}`;
  findElement('.section-left__day--degree-after-tomorrow').innerHTML = `${roundInteger(
    (data.daily.data[2].temperatureMin + data.daily.data[2].temperatureMax) /
      COEFFICIENT_CELSIUS_FAHRENHEIT.half
  )}${DEGREE_SIGN}`;
  findElement('#img-after-tomorrow').src = `${weatherImages[data.daily.data[2].icon]}`;
  findElement('.section-left__day--degree-second-day-after-tomorrow').innerHTML = `${roundInteger(
    (data.daily.data[3].temperatureMin + data.daily.data[3].temperatureMax) /
      COEFFICIENT_CELSIUS_FAHRENHEIT.half
  )}${DEGREE_SIGN}`;
  findElement('#img-second-after-tomorrow').src = `${weatherImages[data.daily.data[3].icon]}`;
};

const getCurrentWeather = ({ lat, long }) => {
  let requestUrlWeather;

  const ru = `${WEATHER.apiUrl}${WEATHER.token}${lat},${long}?lang=ru`;
  const en = `${WEATHER.apiUrl}${WEATHER.token}${lat},${long}?lang=en`;
  const by = `${WEATHER.apiUrl}${WEATHER.token}${lat},${long}?lang=be`;

  if (localStorage.getItem('language') === LANGUAGES_NAME.ru) {
    requestUrlWeather = ru;
  } else if (localStorage.getItem('language') === LANGUAGES_NAME.en) {
    requestUrlWeather = en;
  } else if (localStorage.getItem('language') === LANGUAGES_NAME.by) {
    requestUrlWeather = by;
  }

  return fetch(`${PROXY_URL}${requestUrlWeather}`)
    .then((response) => {
      if (response.status >= HTTP_CODES.BAD_REQUEST) throw new Error(`${response.status} ${response.statusText}`);
      return response.json();
    })
    .then((data) => {
      if (localStorage.getItem('temperatureMeasure') === TEMPERATURE_NAMES.celsius) {
        drawCelsiusElements(data);
      } else if (localStorage.getItem('temperatureMeasure') === TEMPERATURE_NAMES.fahrenheit) {
        drawFahrenheitElements(data);
      }
    })
    .then(() => ({ lat, long }))
    .catch((error) => errorShow(error));
};

export default getCurrentWeather;
