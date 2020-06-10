import React, { memo } from 'react';
import { connect } from 'react-redux';
import { gridRow } from 'styles/main.scss';
import { getTradesState } from './selectors';

const LatestTrades = ({ latestTrades }) => {
  console.log(latestTrades);
  return latestTrades && latestTrades.map(([type, price, amount, time]) => (
    <div key={`${time}-${amount}`} className={gridRow}>
      <span className={type}>{price}</span>
      <span>{amount}</span>
      <span>{time}</span>
    </div>
  ));
};

const mapStateToProps = state => ({
  trades: getTradesState(state),
});

  export default connect(
    mapStateToProps,
  )(memo(LatestTrades));
