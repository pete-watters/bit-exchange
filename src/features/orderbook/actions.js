import { ORDER_BOOK } from './constants';

export const updateOrderbook = ({ data })  => ({
  type: ORDER_BOOK.UPDATE_ORDER_BOOK,
  payload: data,
});