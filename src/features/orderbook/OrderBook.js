import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bid, ask } from 'styles/main.scss';
import Table from './components/Table';
import { getOrderbookState } from './selectors';

class OrderBook extends PureComponent {
  constructor() {
    super();
    this.state = {
      highlightRow: '',
    };
    this.updateHoverState = this.updateHoverState.bind(this);
  }
  updateHoverState(row) {
    this.setState({ highlightRow: row });
  }

  render() {
    // throw new Error('I crashed!'); // - TODO uncomment me to test error page
    const { orderBook, data: { bids, asks } } = this.props;
    const { highlightRow } = this.state;
    console.log(orderBook);
    return (
      <>
        <Table
          type={bid}
          data={asks}
          updateHoverState={this.updateHoverState}
          selectPrice={this.selectPrice}
          highlightRow={highlightRow}
        />
        <Table
          type={ask}
          data={bids}
          updateHoverState={this.updateHoverState}
          selectPrice={this.selectPrice}
          highlightRow={highlightRow}
        />
      </>
    );
  }
}

OrderBook.propTypes = {
  orderBook: PropTypes.array.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  orderBook: getOrderbookState(state),
});

export default connect(
  mapStateToProps,
)(OrderBook);

