import { findElement } from '../helpers/helperDOM';
import { BACKGROUND, EMPTY_STRING, PROXY_URL } from '../constants/constants';
import { getTimeOfYear, getTimeOfDay, errorShow } from '../helpers/helperUI';
import { showLoader, hideLoader } from '../render/renderLoader';

const updateBackground = async () => {
  const timeYear = getTimeOfYear();
  const timeDay = getTimeOfDay();
  let city = findElement('.header-input').value;

  if (city === EMPTY_STRING) city = findElement('.section-left__location--city').textContent;

  // Information for cross-check
  console.log('Параметры запроса фонового изображения: ', `${city}, ${timeDay}, ${timeYear}, nature`);

  const requestBackground = `${PROXY_URL}${BACKGROUND.apiUrl}?query=${city},${timeDay},${timeYear},nature&client_id=${BACKGROUND.token}`;
  showLoader();
  await fetch(requestBackground)
    .then((response) => {
      if (response.status >= 400) throw new Error(`${response.status} ${response.statusText}`);
      return response.json();
    })
    .then((image) => {
      const imageUrl = `${image.urls.regular}`;
      findElement('body').style.backgroundImage = `url(${imageUrl})`;
      findElement('body').style.backgroundSize = 'cover';
      findElement('body').setAttribute('loading', 'lazy');
    })
    .then(hideLoader())
    .catch((error) => errorShow(error));
};

export default updateBackground;
