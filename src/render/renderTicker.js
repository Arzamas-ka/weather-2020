import { findElement } from '../helpers/helperDOM';

const createTicker = () => {
  const footerWrapper = findElement('.ticker-wrap');

  footerWrapper.innerHTML = `
      <div class="ticker">
        <div class="ticker__item">${findElement('.section-left__location--city').textContent} ${
  findElement('.section-left__location--country').textContent
}</div>
        <div class="ticker__item">${findElement('.section-left__date--day').textContent.slice(0, -2)}: ${
  findElement('.section-left__current-degree').textContent
}</div>
        <div class="ticker__item">${findElement('.section-left__precipitation--summary').textContent}</div>
        <div class="ticker__item">${findElement('.section-left__phenomena--feels').textContent}${
  findElement('.section-left__phenomena--feels-phenomena').textContent
}</div>
        <div class="ticker__item">${findElement('.section-left__phenomena--wind').textContent.slice(0, -1)}${
  findElement('.section-left__phenomena--wind-phenomena').textContent
}${findElement('.section-left__phenomena--wind-speed').textContent}</div>
        <div class="ticker__item">${findElement('.section-left__phenomena--humidity').textContent.slice(0, -1)}${
  findElement('.section-left__phenomena--humidity-phenomena').textContent
}</div>

        <div class="ticker__item">${findElement('.section-left__tomorrow').textContent}: ${
  findElement('.section-left__day--degree-tomorrow').textContent
}</div>
        <div class="ticker__item">${findElement('.section-left__day-after-tomorrow').textContent}: ${
  findElement('.section-left__day--degree-after-tomorrow').textContent
}</div>
        <div class="ticker__item">${findElement('.section-left__second-day-after-tomorrow').textContent}: ${
  findElement('.section-left__day--degree-second-day-after-tomorrow').textContent
}</div>
      </div>
  `;
};

export default createTicker;
