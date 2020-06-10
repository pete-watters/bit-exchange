import { TRADES } from './constants';

export const updateTrades = ({ data }) => ({
  type: TRADES.UPDATE_TRADES,
  payload: data,
});