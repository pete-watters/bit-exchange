import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Logger } from 'utils/logger';
import { updateOrderbook } from 'features/orderbook/actions';
import { updateTicker } from 'features/ticker/actions';
import { updateTrades } from 'features/trades/actions';
import { SocketContext } from './context';

const ONE_THOUSAND = 1000;
const TIMEOUT = 250;

class SocketManager extends React.Component {
  state = {
    channels: [],
  }
  socket = null;
  channels = ['book', 'ticker', 'trades'];

  constructor (props) {
    super(props);
    this.socket = new WebSocket('wss://api-pub.bitfinex.com/ws/2');
    this.socket.onmessage = message => this.handleSocketMessage(message);
  }

  componentDidMount() {
    this.connect();
  }

  componentWillUnmount() {
    this.disconnect();
  }
  handleSocketMessage = message => {
    const data = JSON.parse(message.data);
    const { event, channel, chanId } = data;

    switch (event) {
      case 'subscribed':
      this.setState(prevState => ({
          channels: [
            ...prevState.channels,
            { channel, id: chanId, data: null},
          ],
       }));
        break;
      case 'info':
        break;
      default:
        // TODO need better protection here for other events
        if (data) {
          const { channels: stateChannels} = this.state;
          const [ channelId, channelData ] = data;
          const { syncOrderbook, syncTicker, syncTrades } = this.props;
          // DO this now call right action
          const updateChannel = stateChannels.filter(chan => chan.id === channelId)[0]["channel"];
          
          switch (updateChannel) {
            case 'book':
              syncOrderbook({ data: channelData});
            break;
            case 'ticker':
              syncTicker({ data: channelData});
            break;
            case 'trades':
              syncTrades({ data: channelData});
              break;
          }
        }
        break;
    }
  };
  sendToChannel = (channel, event, symbol) =>
  this.socket.send(JSON.stringify({
      event,
      channel,
      symbol,
  }));

  connect = () => {
    let that = this; // cache the this
    let connectInterval;

    this.socket.onopen = () => {
        this.channels.map(channel => this.sendToChannel(channel, 'subscribe', 'tBTCUSD'));
        that.timeout = TIMEOUT;
        clearTimeout(connectInterval);
    };

    // websocket onclose event listener
    this.socket.onclose = e => {
        this.disconnect();
        Logger(
            `Socket is closed. Reconnect will be attempted in ${Math.min(
                ONE_THOUSAND / ONE_THOUSAND,
                (that.timeout + that.timeout) / ONE_THOUSAND
            )} second.`,
            e.reason
        );

        that.timeout = that.timeout + that.timeout;
        connectInterval = setTimeout(this.check, Math.min(ONE_THOUSAND, that.timeout));
    };

    // websocket onerror event listener
    this.socket.onerror = err => {
        Logger(
            "Socket encountered error: ",
            err.message,
            "Closing socket"
        );

        this.socket.close();
    };
  };
  disconnect = () => {
    try {
      if (this.socket !== null) {
        this.channels.map(channel =>
          this.sendToChannel(channel, 'unsubscribe', 'tBTCUSD')
        );
      }
    } catch (e) {
      // socket not connected
      Logger('Socket not connected');
    }
  }
check = () => {
    if (!this.socket || this.socket.readyState == WebSocket.CLOSED) this.connect();
};

  render () {
    const { children } = this.props;
    const { channels } = this.state;
    return (
      <SocketContext.Provider value={{ channels: channels }}>
        {children}
      </SocketContext.Provider>
    );
  }
}

SocketManager.propTypes = {
  children: PropTypes.array.isRequired,
  syncOrderbook: PropTypes.func.isRequired,
  syncTicker: PropTypes.func.isRequired,
  syncTrades: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  syncOrderbook: updateOrderbook,
  syncTicker: updateTicker,
  syncTrades: updateTrades,
};

export default connect(
  null,
  mapDispatchToProps
)(SocketManager);