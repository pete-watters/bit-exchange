import React, { memo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ticker } from 'styles/main.scss';
import { getTickerData } from './selectors';

const Ticker = ({ price, tickerData }) => {
  console.log(tickerData);
  // debugger;
  if (tickerData) {
    return (
      <article className={ticker}>
        <h3>BTC/USD</h3>
        {/* {tickerData[0]} */}
        {/* {tickerData.map(data => )} */}
      </article>
    );
  } else {
    return null;
  }
};

Ticker.propTypes = {
  price: PropTypes.string.isRequired,
  tickerData: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  tickerData: getTickerData(state),
});

export default connect(
  mapStateToProps,
)(memo(Ticker));