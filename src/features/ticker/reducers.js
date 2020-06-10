import { TICKER } from './constants';

const INITIAL_STATE = {
  ticker: {},
};

export const ticker = (state = INITIAL_STATE,  {type, payload}) => {
  switch (type) {
    case TICKER.UPDATE_TICKER:
      return {
        ...state,
        ticker : {
          data: payload,
        },
      };
    default:
      return state;
  }
};
