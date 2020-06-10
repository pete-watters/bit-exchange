import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { gridRow, hover } from 'styles/main.scss';

class TableRow extends PureComponent {
  onMouseEnter = () => {
    const { rowNumber, updateHoverState } = this.props;
    updateHoverState(rowNumber);
  };

  onMouseLeave = () => {
    const { updateHoverState } = this.props;
    updateHoverState('');
  };

  render() {
    const { price, amount, cumulativeAmount, highlightRow, type } = this.props;
    const [matched, unique] = price;
    const [integral, decimal] = amount;
    const [cumulativeIntegral, cumulativeDecimal] = cumulativeAmount;
    return (
      <div
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        className={`${gridRow} ${highlightRow && hover}`}
        role="button"
        tabIndex={0}
      >
        <span className={type}><em>{matched}</em>{unique}</span>
        <span>{integral}.<em>{decimal}</em></span>
        <span>{cumulativeIntegral}.<em>{cumulativeDecimal}</em></span>
      </div>
    );
  }
}

TableRow.propTypes = {
  rowNumber: PropTypes.string.isRequired,
  highlightRow: PropTypes.bool,
  type: PropTypes.string.isRequired,
  price: PropTypes.array.isRequired,
  amount: PropTypes.array.isRequired,
  cumulativeAmount: PropTypes.array.isRequired,
  updateHoverState: PropTypes.func.isRequired,
};

TableRow.defaultProps = {
  highlightRow: null,
};

export default TableRow;
