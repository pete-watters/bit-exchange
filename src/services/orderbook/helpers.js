import { sumArray, sumFloats, subtractFloats } from 'tools/sum';
import { sortByColumn } from 'tools/sort';
import { serializeSourceData } from 'tools/serializer';
import { ask, bid } from 'styles/main.scss';

const isBid = type => type === bid;

const isFirstElement = index => index === 0;

const calculateAskVolume = (index, array, amount) =>
  (isFirstElement(index) ? amount : subtractFloats(array[index - 1][1], amount));

const calculateVolume = (type, index, array, amount, cumulativeAmount) =>
  (isBid(type)
    ? sumFloats(amount, cumulativeAmount)
    : calculateAskVolume(index, array, cumulativeAmount));

const sortSourceData = (orderBook, type, totalVolume) =>
  sortByColumn(orderBook, 0)
    .map(([price, amount], index, array) => {
      totalVolume = calculateVolume(type, index, array, amount, totalVolume);
      return [serializeSourceData(price), amount, totalVolume, type];
    });

export const serializeOrderBook = (asks, bids) => ({
  asks: sortSourceData(asks, ask, sumArray(asks, 1)),
  bids: sortSourceData(bids, bid, 0),
});
