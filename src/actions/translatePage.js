import { findElement } from '../helpers/helperDOM';
import { updateLanguages } from '../helpers/helperUI';
import { EMPTY_STRING } from '../constants/constants';
import createTicker from '../render/renderTicker';
import getCurrentCityCountry from '../apiData/currentDislocation';
import getCurrentDate from '../apiData/currentDate';
import getCurrentWeather from '../apiData/currentWeather';
import { showLoader, hideLoader } from '../render/renderLoader';


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
  const lat = findElement('.section__latitude--text').textContent;
  const long = findElement('.section__longitude--text').textContent;

  await getCurrentWeather({ lat, long });
  await getCurrentCityCountry({ lat, long });
  getCurrentDate();
  updateLanguages();
  createTicker();
  hideLoader();
};

export default translatePage;
