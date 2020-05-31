import { findElement } from '../helpers/helperDOM';
import translate from '../helpers/convertLanguage';

const createFeatureDays = (currentLang) => {
  const generateDate = (getFeatureDays) => {
    const day = new Date();
    day.setDate(new Date().getDate() + getFeatureDays);
    return day.toString().split(' ')[0].toLowerCase();
  };

  const featureWeekDays = [generateDate(1), generateDate(2), generateDate(3)];

  findElement('.section-left__tomorrow').name = `${featureWeekDays[0]}`;
  findElement('.section-left__tomorrow').textContent = translate(currentLang, `main.days.${featureWeekDays[0]}`);
  findElement('.section-left__day-after-tomorrow').name = `${featureWeekDays[1]}`;
  findElement('.section-left__day-after-tomorrow').textContent = translate(
    currentLang,
    `main.days.${featureWeekDays[1]}`
  );
  findElement('.section-left__second-day-after-tomorrow').name = `${featureWeekDays[2]}`;
  findElement('.section-left__second-day-after-tomorrow').textContent = translate(
    currentLang,
    `main.days.${featureWeekDays[2]}`
  );
};

const getCurrentDate = () => {
  const currentLang = localStorage.getItem('language');

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentWeekDay = currentDate.getDay();
  const currentDay = currentDate.getDate();
  const hoursElem = findElement('.section-left__date--hours');

  findElement('.section-left__date--day').textContent = `${translate(currentLang, `days.${currentWeekDay}`)}, `;
  findElement('.section-left__date--month').textContent = `${translate(currentLang, `months.${currentMonth}`)} `;
  findElement('.section-left__date--day-numeric').textContent = `${currentDay}, `;
  findElement('.section-left__date-container').appendChild(hoursElem);

  createFeatureDays(currentLang);
};

export default getCurrentDate;
