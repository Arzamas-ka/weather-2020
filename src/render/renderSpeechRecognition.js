import { debounce } from 'lodash-es';
import { handlerSearchButton } from '../actions/eventSearch';
import { findElement, createElement } from '../helpers/helperDOM';
import iconMicrophoneHover from '../assets/icons/microphone-red.svg';
import iconMicrophoneDefault from '../assets/icons/microphone-white.svg';
import { EMPTY_STRING, LANGUAGES_NAME, LEVEL_OF_VOLUME } from '../constants/constants';

const louderWords = ['громче', 'громко', 'гром', 'louder', 'loude', 'loud'];
const quieterWords = ['тише', 'тиша', 'тихо', 'quieter', 'quiet', 'quiete'];
const stopWords = ['погода', 'weather', ...louderWords, ...quieterWords];
let voiceLevel = 1;

// Information for cross-check
console.log('Звук микрофона по умолчанию', voiceLevel);
console.log(
  `Прослушать погоду с кодовыми словами: \n1. Кликнуть по микрофону \n2. Дождаться состояния микрофона в красном цвете \n3. Произнести одно из нужных слов в зависимости от текущего языка,
  ${stopWords[0]} / ${stopWords[1]},
  ${quieterWords[0]} / ${quieterWords[3]},
  ${louderWords[0]} / ${louderWords[3]}`
);

const getInformationWeatherPage = () => {
  const city = findElement('.section-left__location--city').textContent;
  const country = findElement('.section-left__location--country').textContent;
  const today = findElement('.section-left__date--day').textContent;
  const month = findElement('.section-left__date--month').textContent;
  const dayNumeric = findElement('.section-left__date--day-numeric').textContent;
  const degree = findElement('.section-left__current-degree').textContent;
  const summary = findElement('.section-left__precipitation--summary').textContent;

  return {
    city,
    country,
    today,
    month,
    dayNumeric,
    degree,
    summary,
  };
};

const synth = window.speechSynthesis;

const textToSpeech = debounce((codeWord) => {
  const lang = localStorage.getItem('language');
  const text = getInformationWeatherPage();

  const speech = new SpeechSynthesisUtterance(
    `${text.city}
    ${text.country}
    ${text.today}
    ${text.dayNumeric}
    ${text.month}
    ${text.degree}
    ${text.summary}`
  );

  if (louderWords.includes(codeWord.toLowerCase())) {
    voiceLevel += LEVEL_OF_VOLUME;
    speech.volume = voiceLevel;

    // Information for cross-check
    console.log('Звук микрофона - громче: ', voiceLevel);
  }

  if (quieterWords.includes(codeWord.toLowerCase())) {
    voiceLevel -= LEVEL_OF_VOLUME;
    speech.volume = voiceLevel;

    // Information for cross-check
    console.log('Звук микрофона - тише: ', voiceLevel);
  }

  if (lang === LANGUAGES_NAME.ru) {
    speech.lang = LANGUAGES_NAME.ru;
  }
  synth.speak(speech);
}, 2000);

let codeWord = EMPTY_STRING;

export default () => {
  const microphone = findElement('.header-microphone');

  microphone.addEventListener('click', () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    const lang = localStorage.getItem('language');
    recognition.interimResults = true;
    recognition.lang = `${lang}-${lang.charAt(0).toUpperCase()}${lang.slice(1)}`;

    recognition.addEventListener('result', (event) => {
      const inputElement = findElement('.header-input');
      codeWord = event.results[0][0].transcript;

      if (stopWords.includes(codeWord.toLowerCase())) {
        findElement('.header-input').value = EMPTY_STRING;
        textToSpeech(codeWord);
        return;
      }

      inputElement.value = codeWord;
    });

    recognition.addEventListener('audiostart', () => {
      const previousMicroImg = findElement('.header-microphone__img');
      microphone.removeChild(previousMicroImg);

      const imgMicrophone = createElement('img', ['header-microphone__img']);
      imgMicrophone.src = `${iconMicrophoneHover}`;
      microphone.appendChild(imgMicrophone);
    });

    recognition.addEventListener('audioend', () => {
      const previousMicroImg = findElement('.header-microphone__img');
      microphone.removeChild(previousMicroImg);

      const imgMicrophone = createElement('img', ['header-microphone__img']);
      imgMicrophone.src = `${iconMicrophoneDefault}`;
      microphone.appendChild(imgMicrophone);

      const inputElement = findElement('.header-input');
      if (inputElement.value) {
        handlerSearchButton();
      }
    });

    recognition.start();
  });
};

export const listenToWeather = () =>
  findElement('.sound-img').addEventListener('click', () => textToSpeech(codeWord));
