import { ask } from 'styles/main.scss';
import { findMatchingSubstring } from 'tools/match';
import { DECIMAL_PLACES } from './constants';

export const getRowNumber = (rowType, index, rowData) =>
  (rowType === ask ? `${index + 1}` : `${rowData.length - index}`);

const getPreviousPrice = (index, array) => (index === 0 ? '' : array[index - 1][0]);
const formatFloat = (input, decimalPlaces) => Number(input).toFixed(decimalPlaces);

export const formatPrice = (price, index, array) =>
  findMatchingSubstring(formatFloat(price, DECIMAL_PLACES.PRICE), getPreviousPrice(index, array));

export const formatVolume = volume =>
  formatFloat(volume, DECIMAL_PLACES.VOLUME).split('.');
