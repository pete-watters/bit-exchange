import { ask, bid } from 'styles/main.scss';
import { TRADES } from './constants';

const getRandomLastOrder = (highestAsk, lowestBid) =>
  (Math.round(Math.random()) === 1 ? [ask, highestAsk] : [bid, lowestBid]);

export const generateLatestTrade = (asks, bids, currentTime) => {
  const highestAsk = asks[asks.length - 1][0];
  const lowestBid = bids[0][0];
  const randomVolume = Number(Math.random()).toFixed(TRADES.DECIMAL_PLACES);
  return [...getRandomLastOrder(highestAsk, lowestBid), randomVolume, currentTime];
};

export const getLatestTrades = (latestTrades, latestTrade) => {
  const tradeList = latestTrades.length < TRADES.LIST_LENGTH ? latestTrades : [];
  return [...tradeList, latestTrade];
};
