import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { fairMarketPrice } from 'styles/main.scss';

const Ticker = ({ price }) => (
  <article className={fairMarketPrice}>
    <h3>{price}</h3>
  </article>
);

Ticker.propTypes = {
  price: PropTypes.string.isRequired,
};

export default memo(Ticker);
