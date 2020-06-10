/* eslint-disable no-magic-numbers */
import { sortByColumn } from './sort';

const mockMatrix = [
  [4003.0, 8.104],
  [4004.9, 5.969],
  [4005.0, 2.560],
  [4007.3, 8.652],
  [4008.9, 9.994],
  [4009.5, 1.928],
  [4010.3, 1.352],
  [4011.4, 2.355],
  [4012.5, 8.088],
  [4013.6, 5.920],
  [4014.5, 10.473],
];

test('sort: Should accurately sort array by first column', () => {
  const sortedMatrix = [
    [4014.5, 10.473],
    [4013.6, 5.92],
    [4012.5, 8.088],
    [4011.4, 2.355],
    [4010.3, 1.352],
    [4009.5, 1.928],
    [4008.9, 9.994],
    [4007.3, 8.652],
    [4005, 2.56],
    [4004.9, 5.969],
    [4003, 8.104],
  ];

  expect(sortByColumn(mockMatrix, 0)).toStrictEqual(sortedMatrix);
});

test('sort: Should accurately sort array by second column', () => {
  const sortedMatrix = [
    [4014.5, 10.473],
    [4008.9, 9.994],
    [4007.3, 8.652],
    [4003, 8.104],
    [4012.5, 8.088],
    [4004.9, 5.969],
    [4013.6, 5.92],
    [4005, 2.56],
    [4011.4, 2.355],
    [4009.5, 1.928],
    [4010.3, 1.352],
  ];

  expect(sortByColumn(mockMatrix, 1)).toStrictEqual(sortedMatrix);
});
