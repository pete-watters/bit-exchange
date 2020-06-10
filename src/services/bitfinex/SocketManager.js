import React from 'react';
import PropTypes from 'prop-types';
// import io from 'socket.io-client';

const ONE_THOUSAND = 1000;
const TIMEOUT = 250;

// defining the context with empty channels object
export const SocketContext = React.createContext({
  channels: [],
  // FIXME - I made channels an array? Maybe I should have an object for each channel here?
});
// TODO move this to hooks
// defining a useWebsocket hook for functional components
export const useWebsocket = () => React.useContext(SocketContext);

class SocketManager extends React.Component {
  state = {
    channels: [],
  }
  socket = null;
  channels = ['trades', 'ticker', 'book'];

  // so in my state
  // - channels with: name, id, data
  // if I get subscribe - add that channel and its ID
  // for other messages, the first field is ID then data so use that to update

  constructor (props) {
    super(props);

    this.socket = new WebSocket('wss://api-pub.bitfinex.com/ws/2');

    this.socket.onmessage = message => {
      // console.log(JSON.parse(message.data));
      const data = JSON.parse(message.data);
      const { event, channel, chanId } = data;

      switch (event) {
        case 'subscribed':
        // console.log('subscribed');
        this.setState(prevState => ({
            channels: [
              ...prevState.channels,
              { channel, id: chanId, data: null},
            ],
         }));
          break;
        case 'info':
          console.log('info', message);
          break;
        default:
          console.log(message);
          // TODO need better protection here for other events
          if (data) {
            const [ channelId, channelData ] = data;
            this.setState(prevState => ({
              channels: prevState.channels.map(chan =>
                chan.id === channelId
                  ? { ...chan, data: channelData }
                  : chan
              ),
            }));
          }
          break;
      }
    };
  }

  componentDidMount() {
    this.connect();
  }

  componentWillUnmount() {
    this.disconnect();
  }
  sendToChannel = (channel, event, symbol) =>
  this.socket.send(JSON.stringify({
      event,
      channel,
      symbol,
  }));

  connect = () => {
    let that = this; // cache the this
    let connectInterval;

    // websocket onopen event listener
    this.socket.onopen = () => {
        this.channels.map(channel => this.sendToChannel(channel, 'subscribe', 'tBTCUSD'));
        this.setState({ ws: this.socket });
        that.timeout = TIMEOUT; // reset timer to TIMEOUT on open of websocket connection
        clearTimeout(connectInterval); // clear Interval on on open of websocket connection
    };

    // websocket onclose event listener
    this.socket.onclose = e => {
        this.disconnect();
        console.log(
            `Socket is closed. Reconnect will be attempted in ${Math.min(
                ONE_THOUSAND / ONE_THOUSAND,
                (that.timeout + that.timeout) / ONE_THOUSAND
            )} second.`,
            e.reason
        );

        that.timeout = that.timeout + that.timeout; //increment retry interval
        connectInterval = setTimeout(this.check, Math.min(ONE_THOUSAND, that.timeout)); //call check function after timeout
    };

    // websocket onerror event listener
    this.socket.onerror = err => {
        console.error(
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
    }
  }
/**
 * utilited by the @function connect to check if the connection is close, if so attempts to reconnect
 */
check = () => {
  // TODO need to make surte this works with my new way
  // I replace ws with this.socket but this ws is used to handle reconnection
    const { ws } = this.state;

    //check if websocket instance is closed, if so call `connect` function.
    if (!ws || ws.readyState == WebSocket.CLOSED) this.connect();
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
};

export default SocketManager;