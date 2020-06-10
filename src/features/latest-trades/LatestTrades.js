import React, { memo } from 'react';
import { gridRow } from 'styles/main.scss';

const LatestTrades = ({ latestTrades }) =>
  latestTrades && latestTrades.map(([type, price, amount, time]) => (
    <div key={`${time}-${amount}`} className={gridRow}>
      <span className={type}>{price}</span>
      <span>{amount}</span>
      <span>{time}</span>
    </div>
  ));

export default memo(LatestTrades);
