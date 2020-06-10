import { TRADES } from './constants';

const INITIAL_STATE = {
  trades: {},
};

export const trades = (state = INITIAL_STATE,  {type, payload}) => {
  switch (type) {
    case TRADES.UPDATE_TRADES:
      return {
        ...state,
        trades : {
          data: payload,
        },
      };
    default:
      return state;
  }
};
