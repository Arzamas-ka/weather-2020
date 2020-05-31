import { checkZeroInMinutes, convertFahrenheitToCelsius } from './helperUI';

describe('checkZeroInMinutes', () => {
  const resultOne = checkZeroInMinutes(1);
  it('should return number less 10, which was concatenated with 0 in start', () => {
    expect(resultOne).toBe('01');
  });

  const resultTwo = checkZeroInMinutes(9);
  it('should return number less 10, which was concatenated with 0 in start', () => {
    expect(resultTwo).toBe('09');
  });

  const resultThree = checkZeroInMinutes(0);
  it('should return number less 10, which was concatenated with 0 in start', () => {
    expect(resultThree).toBe('00');
  });

  const resultFour = checkZeroInMinutes(55);
  it('should return number less 10, which was concatenated with 0 in start', () => {
    expect(resultFour).not.toBe('00');
  });
});

describe('convertFahrenheitToCelsius', () => {
  const resultOne = convertFahrenheitToCelsius(1);
  it('should return temperature of celsius', () => {
    expect(resultOne).toBe(-17);
  });

  const resultTwo = convertFahrenheitToCelsius(108);
  it('should return temperature of celsius', () => {
    expect(resultTwo).toBe(42);
  });

  const resultThree = convertFahrenheitToCelsius(17);
  it('should return temperature of celsius', () => {
    expect(resultThree).not.toBe(-9);
  });

  const resultFour = convertFahrenheitToCelsius(77);
  it('should return temperature of celsius', () => {
    expect(resultFour).not.toBe(40);
  });
});
