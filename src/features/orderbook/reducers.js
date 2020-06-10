import { ORDER_BOOK } from './constants';

const INITIAL_STATE = {
  orderbook: {},
};

export const orderbook = (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case ORDER_BOOK.UPDATE_ORDER_BOOK:
      return {
        ...state,
        orderbook : {
          data: payload,
        },
      };
    default:
      return state;
  }
};
