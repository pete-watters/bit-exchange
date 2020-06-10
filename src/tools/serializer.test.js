/* eslint-disable no-magic-numbers */
import { exponentialToNumerical, serializeSourceData } from './serializer';

test('Exponential should convert to the first value power', () => {
  expect(exponentialToNumerical(2.5e25)).toBe(25);
  expect(exponentialToNumerical(-1.123e-10)).toBe(0);
  expect(exponentialToNumerical('4.0117684918745967e+3')).toBe(4011.7684918745967);
  expect(exponentialToNumerical('4.0117684918745555e+31')).toBe(4011.7684918745554);
});

test('High negative exponential should default to 0', () => {
  expect(exponentialToNumerical(-1.123e-10)).toBe(0);
  expect(exponentialToNumerical(1.23423534e-12)).toBe(0);
  expect(exponentialToNumerical('-4.0117684918745555e-31')).toBe(0);
});

test('Exponential conversion should not fail on non exponential data', () => {
  expect(exponentialToNumerical(12.12)).toBe(12.12);
  expect(exponentialToNumerical(141120000000000000)).toBe(141120000000000000);
  expect(exponentialToNumerical('0')).toBe(0);
  expect(exponentialToNumerical(22)).toBe(22);
  expect(exponentialToNumerical(null)).toBe(0);
  expect(exponentialToNumerical()).toBe(0);
});

test('serializeSourceData: Should serialize floats to one decimal place', () => {
  expect(serializeSourceData(2.555566)).toBe(2.6);
  expect(serializeSourceData(223.555566)).toBe(223.6);
  expect(serializeSourceData(223)).toBe(223.0);
});

test('serializeSourceData: Should serialize exponential values to one decimal place', () => {
  expect(serializeSourceData('4.0117684918745967e+3')).toBe(4011.8);
  expect(serializeSourceData('4.0117684918745555e+31')).toBe(4011.8);
});

test('serializeSourceData: Should handle broken data', () => {
  expect(serializeSourceData(null)).toBe(0);
  expect(serializeSourceData()).toBe(0);
  expect(serializeSourceData({})).toBe(0);
});
