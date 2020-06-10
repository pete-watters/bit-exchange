import React, { memo } from 'react';
import { BIT_EXCHANGE } from 'constants';

export const Header = () => (
  <header>
    <figure>
      <img src={BIT_EXCHANGE.COPY.LOGO_URL} alt="" />
      <figcaption>
        <h1>{BIT_EXCHANGE.COPY.LOGO}</h1>
      </figcaption>
    </figure>
  </header>
);

export default memo(Header);
