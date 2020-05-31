import { EMPTY_STRING } from '../constants/constants';

export const removeElement = (selector) => {
  const element = document.querySelector(selector);

  if (element) element.remove();

  return element;
};

export const removeChildren = (selector) => {
  const element = document.querySelector(selector);

  if (element) element.innerHTML = EMPTY_STRING;

  return element;
};

export const findElement = (selector) => {
  const element = document.querySelector(selector);

  if (element) return element;

  return element;
};

export const createElement = (elementType, [...classNames], content) => {
  const element = document.createElement(elementType);

  if (classNames) element.className = [...classNames].join(' ');
  if (content) element.innerHTML = content;

  return element;
};

export const insertBefore = (beforeWhat, what) => {
  const element = beforeWhat.insertAdjacentElement('beforebegin', what);

  return element;
};
