import { toCelsius, toFahrenheit } from './tempUnitsConverter';

it('toCelsius converts fahrenheit to celsius', () => {
  expect(toCelsius(32)).toBe(0);
  expect(toCelsius(23)).toBe(-5);
});

it('toFahrenheit converts celsius to fahrenheit', () => {
  expect(toFahrenheit(0)).toBe(32);
  expect(toFahrenheit(5)).toBe(41);
});

