import { findElement } from './helperDOM';
import translate from './convertLanguage';
import {
  TEMPERATURE_NAMES,
  EMPTY_STRING,
  SEASONS_NAMES,
  MONTH,
  TIME_OF_DAY,
  LANGUAGES_NAME,
  COEFFICIENT_CELSIUS_FAHRENHEIT
} from '../constants/constants';

import clearDayImg from '../assets/images/clear-day.png';
import clearNightImg from '../assets/images/clear-night.png';
import cloudyImg from '../assets/images/cloudy.png';
import fogImg from '../assets/images/fog.png';
import hailImg from '../assets/images/hail.png';
import cloudyDayImg from '../assets/images/partly-cloudy-day.png';
import cloudyNightImg from '../assets/images/partly-cloudy-night.png';
import rainImg from '../assets/images/rain.png';
import sleetImg from '../assets/images/sleet.png';
import snowImg from '../assets/images/snow.png';
import thunderstormImg from '../assets/images/thunderstorm.png';
import tornadoImg from '../assets/images/tornado.png';
import windImg from '../assets/images/wind.png';

const time = {
  hours: '',
  minutes: '',
  seconds: '',
};

export const weatherImages = {
  fog: fogImg,
  rain: rainImg,
  wind: windImg,
  cloudy: cloudyImg,
  tornado: tornadoImg,
  snow: snowImg,
  sleet: sleetImg,
  'partly-cloudy-day': cloudyDayImg,
  'partly-cloudy-night': cloudyNightImg,
  hail: hailImg,
  'clear-night': clearNightImg,
  'clear-day': clearDayImg,
  thunderstorm: thunderstormImg,
};

export const roundInteger = (number) => Math.round(number);

export const getTimeOfYear = () => {
  const nowMonth = new Date().getMonth();

  let timeYear = EMPTY_STRING;

  if (nowMonth === MONTH.December || nowMonth === MONTH.January || nowMonth === MONTH.February) {
    timeYear += SEASONS_NAMES.winter;
  } else if (nowMonth === MONTH.March || nowMonth === MONTH.April || nowMonth === MONTH.May) {
    timeYear += SEASONS_NAMES.spring;
  } else if (nowMonth === MONTH.June || nowMonth === MONTH.July || nowMonth === MONTH.August) {
    timeYear += SEASONS_NAMES.summer;
  } else if (nowMonth === MONTH.September || nowMonth === MONTH.October || nowMonth === MONTH.November) {
    timeYear += SEASONS_NAMES.autumn;
  }
  return timeYear;
};

export const getTimeOfDay = () => {
  // const nowTimeOfDay = new Date().getHours();
  const nowTimeOfDay = time.hours;

  let timeDay = EMPTY_STRING;

  if (nowTimeOfDay >= TIME_OF_DAY['12'] && nowTimeOfDay < TIME_OF_DAY['18']) {
    timeDay += 'day';
  } else if (nowTimeOfDay >= TIME_OF_DAY['00'] && nowTimeOfDay <= TIME_OF_DAY['06']) {
    timeDay += 'night';
  } else if (nowTimeOfDay > TIME_OF_DAY['06'] && nowTimeOfDay < TIME_OF_DAY['12']) {
    timeDay += 'morning';
  } else if (nowTimeOfDay >= TIME_OF_DAY['18'] && nowTimeOfDay <= TIME_OF_DAY['24']) {
    timeDay += 'evening';
  }

  return timeDay;
};

export const initialAppSettings = () => {
  if (!localStorage.getItem('language')) {
    localStorage.setItem('language', LANGUAGES_NAME.en);
  }

  if (!localStorage.getItem('temperatureMeasure')) {
    localStorage.setItem('temperatureMeasure', TEMPERATURE_NAMES.celsius);
  }
};

export const updateLanguages = () => {
  const currentLang = localStorage.getItem('language');

  findElement('.header-update').title = translate(currentLang, 'header.update.btn');
  findElement('.header-input').title = translate(currentLang, 'header.search.title');
  findElement('.header-input').placeholder = translate(currentLang, 'header.search.placeholder');
  findElement('.header__search-btn').textContent = translate(currentLang, 'header.search.button');
  findElement('.section-left__phenomena--feels').textContent = translate(currentLang, 'main.feels');
  findElement('.section-left__phenomena--wind').textContent = translate(currentLang, 'main.wind');
  findElement('.section-left__phenomena--wind-speed').textContent = translate(currentLang, 'main.wind.speed');
  findElement('.section-left__phenomena--humidity').textContent = translate(currentLang, 'main.humidity');

  const tomorrowDay = findElement('.section-left__tomorrow').name;
  findElement('.section-left__tomorrow').textContent = translate(currentLang, `main.days.${tomorrowDay}`);

  const dayAfterTomorrow = findElement('.section-left__day-after-tomorrow').name;
  findElement('.section-left__day-after-tomorrow').textContent = translate(
    currentLang,
    `main.days.${dayAfterTomorrow}`
  );

  const secondDayAfterTomorrow = findElement('.section-left__second-day-after-tomorrow').name;
  findElement('.section-left__second-day-after-tomorrow').textContent = translate(
    currentLang,
    `main.days.${secondDayAfterTomorrow}`
  );

  findElement('.section__latitude').textContent = translate(currentLang, 'main.latitude');
  findElement('.section__longitude').textContent = translate(currentLang, 'main.longitude');
};

export const convertFahrenheitToCelsius = (temperature) => Math.round((temperature - COEFFICIENT_CELSIUS_FAHRENHEIT.fahrenheit) / COEFFICIENT_CELSIUS_FAHRENHEIT.coefficient);

export const checkZeroInMinutes = (value) => {
  if (value < TIME_OF_DAY[10] || value === TIME_OF_DAY[0]) {
    value = `0${value}`;
  }

  return value;
};

export const calculateDateOfSearchCity = (timeZoneOffsetSecs) => {
  const now = new Date();
  const nowUTC = new Date(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    now.getUTCHours(),
    now.getUTCMinutes(),
    now.getUTCSeconds(),
    now.getUTCMilliseconds()
  ).getTime();

  const locationTimeMS = timeZoneOffsetSecs * 1000 + nowUTC;
  const locationDate = new Date();
  locationDate.setTime(locationTimeMS);

  const day = locationDate.getDay();
  const hours = locationDate.getHours();
  const minutes = locationDate.getMinutes();
  const seconds = locationDate.getSeconds();

  const minutesResult = checkZeroInMinutes(minutes);
  const hoursResult = checkZeroInMinutes(hours);
  const secondsResult = checkZeroInMinutes(seconds);
  time.hours = hoursResult;

  return {
    day,
    hoursResult,
    minutesResult,
    secondsResult,
  };
};

export const errorShow = (error) => {
  const toast = findElement('.toaster-error');
  toast.textContent = error;

  toast.classList.remove('toaster-error--close');
  toast.classList.add('toaster-error--open');

  setTimeout(() => {
    toast.classList.remove('toaster-error--open');
    toast.classList.add('toaster-error--close');
  }, 5000);
};
