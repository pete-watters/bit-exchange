import React, { memo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fairMarketPrice } from 'styles/main.scss';
import { getTickerState } from './selectors';

const Ticker = ({ price, tickerData }) => {
  console.log(tickerData);
  return (
    <article className={fairMarketPrice}>
      <h3>{price}</h3>
    </article>
    );
};

Ticker.propTypes = {
  price: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  tickerData: getTickerState(state),
});

export default connect(
  mapStateToProps,
)(memo(Ticker));