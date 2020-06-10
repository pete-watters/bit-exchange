/* eslint-disable no-magic-numbers */
import { findMatchingSubstring } from './match';

test('Should return an array of string subset and match', () => {
  expect(findMatchingSubstring('122.666', '122.555')).toStrictEqual(['122.', '666']);
  expect(findMatchingSubstring('122.666', '122.555')).toStrictEqual(['122.', '666']);
  expect(findMatchingSubstring('122.666', '122.555')).toStrictEqual(['122.', '666']);
  expect(findMatchingSubstring('122.666', '555.555')).toStrictEqual(['', '122.666']);
});
