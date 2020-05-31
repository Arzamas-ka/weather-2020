import { findElement } from '../helpers/helperDOM';
import {
  PROXY_URL, DISLOCATION, LANGUAGES_NAME, PARSE_INT_BASE
} from '../constants/constants';
import { calculateDateOfSearchCity, errorShow } from '../helpers/helperUI';

let intervalId = null;

const drawFlag = (data) => {
  findElement('.section-left__location--flag').textContent = `${data}`;
};

const getCurrentCityCountry = ({ lat, long }) => {
  let requestUrlCityCountry;

  const ru = `${DISLOCATION.apiUrl}?q=${lat}+${long}&language=ru&key=${DISLOCATION.token}`;
  const en = `${DISLOCATION.apiUrl}?q=${lat}+${long}&language=en&key=${DISLOCATION.token}`;
  const by = `${DISLOCATION.apiUrl}?q=${lat}+${long}&language=be&key=${DISLOCATION.token}`;

  if (localStorage.getItem('language') === LANGUAGES_NAME.ru) {
    requestUrlCityCountry = ru;
  } else if (localStorage.getItem('language') === LANGUAGES_NAME.en) {
    requestUrlCityCountry = en;
  } else if (localStorage.getItem('language') === LANGUAGES_NAME.by) {
    requestUrlCityCountry = by;
  }

  return fetch(`${PROXY_URL}${requestUrlCityCountry}`)
    .then((response) => {
      if (response.status >= 400) throw new Error(`${response.status} ${response.statusText}`);
      return response.json();
    })
    .then((data) => {
      if (!data.results[0].components.city) {
        findElement(
          '.section-left__location--city'
        ).textContent = `${data.results[0].components.country}`;
      } else {
        findElement(
          '.section-left__location--city'
        ).textContent = `${data.results[0].components.city}`;
      }
      findElement(
        '.section-left__location--country'
      ).textContent = `${data.results[0].components.country}`;

      clearInterval(intervalId);

      intervalId = setInterval(() => {
        const timezoneOffsetSeconds = parseInt(
          data.results[0].annotations.timezone.offset_sec,
          PARSE_INT_BASE
        );
        const { hoursResult, minutesResult } = calculateDateOfSearchCity(timezoneOffsetSeconds);
        const time = `${hoursResult}:${minutesResult}`;
        findElement('.section-left__date--hours').textContent = time;
      }, 1000);
      drawFlag(data.results[0].annotations.flag);
    })
    .then(() => ({ lat, long }))
    .catch((error) => errorShow(error));
};

export default getCurrentCityCountry;
