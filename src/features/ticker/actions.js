import { TICKER } from './constants';

export const updateTicker = ({ data }) => ({
  type: TICKER.UPDATE_TICKER,
  payload: data,
});