import { combineReducers } from 'redux';
import { orderbook } from 'features/orderbook/reducers';
import { ticker } from 'features/ticker/reducers';
import { trades } from 'features/trades/reducers';

export default combineReducers({
  orderbook,
  ticker,
  trades,
});