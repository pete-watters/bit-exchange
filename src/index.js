/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-webpack-loader-syntax */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import OrderbookWorker from 'worker-loader!./services/orderbook/worker';
import { orderBook as orderBookClass, trades as tradesClass } from 'styles/main.scss';
import { BIT_EXCHANGE } from 'constants';
import Layout from 'components/Layout';
// import Loading from 'components/Loading';
import ErrorBoundary from 'containers/ErrorBoundary';
import { serializeOrderBook } from 'services/orderbook/helpers';
import OrderBook from 'features/orderbook/OrderBook';
import LatestTrades from 'features/trades/LatestTrades';
import Ticker from 'features/ticker/Ticker';
import { getLatestTrades, generateLatestTrade } from 'features/trades/helpers';
import SocketManager from 'services/bitfinex/SocketManager';
import rootReducer from './reducers';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderBook: {
        asks: [],
        bids: [],
      },
      currentTime: null,
      latestTrades: [],
      latestTradePrice: null,
    };
  }

  componentDidMount() {
    if (window.Worker) {
      this.ob = new OrderbookWorker();
      this.ob.onmessage = e => {
        const { latestTrades } = this.state;
        const { asks, bids } = serializeOrderBook(e.data.asks, e.data.bids);
        const currentTime = new Date().toLocaleTimeString();
        const latestTrade = generateLatestTrade(asks, bids, currentTime);
        this.setState({
          orderBook: { asks, bids },
          currentTime,
          latestTrades: getLatestTrades(latestTrades, latestTrade),
          latestTradePrice: latestTrade[1],
        });
      };
    }
  }

  componentWillUnmount() {
    this.ob.terminate();
  }

  render() {
    const { currentTime, latestTradePrice, latestTrades, orderBook } = this.state;
    // return ( <Loading />);
    return (
      <ErrorBoundary>
        <SocketManager>
          <Layout>
            <Ticker price={`${latestTradePrice} ${BIT_EXCHANGE.CURRENCY}`} />
            <article className={orderBookClass}>
              <OrderBook data={orderBook} latestTradePrice={latestTradePrice} />
            </article>
            <aside className={tradesClass}>
              <article>
                <h3>{currentTime}</h3>
              </article>
              <article>
                <LatestTrades latestTrades={latestTrades} />
              </article>
            </aside>
          </Layout>
        </SocketManager>
      </ErrorBoundary>
    );
  }
}
// TODO figure out what I want to put into stats here
const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
, document.getElementById('app'));

