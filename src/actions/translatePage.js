import { findElement } from '../helpers/helperDOM';
import { updateLanguages } from '../helpers/helperUI';
import { EMPTY_STRING } from '../constants/constants';
import createTicker from '../render/renderTicker';
import getCurrentCityCountry from '../apiData/currentDislocation';
import getCurrentDate from '../apiData/currentDate';
import getCurrentWeather from '../apiData/currentWeather';
import { showLoader, hideLoader } from '../render/renderLoader';

import { sharedLocation } from '../apiData/geocodingData';

const translatePage = async (event) => {
  showLoader();
  const currentLanguage = localStorage.getItem('language');
  const clickedButton = event.target;
  const clickedLanguage = event.target.name;

  if (currentLanguage === clickedLanguage) return;

  findElement('.header-languages__btn--active').classList.remove('header-languages__btn--active');
  clickedButton.classList.add('header-languages__btn--active');
  localStorage.setItem('language', clickedLanguage);

  findElement('.section-left__location--flag').textContent = EMPTY_STRING;

  await getCurrentWeather({
    lat: sharedLocation.latitudeNumber,
    long: sharedLocation.longitudeNumber,
  });
  await getCurrentCityCountry({
    lat: sharedLocation.latitudeNumber,
    long: sharedLocation.longitudeNumber,
  });
  getCurrentDate();
  updateLanguages();
  createTicker();
  hideLoader();
};

export default translatePage;
