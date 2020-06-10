import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Error from 'components/Error';

class ErrorBoundary extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  onRetryClick() {
    window.location.reload(this);
  }

  componentDidCatch(error) {
    this.setState({ error });
  }

  render() {
    const { error } = this.state;
    const { children } = this.props;

    if (error) {
      return (
        <Error onRetryClick={this.onRetryClick} />
      );
    }
    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]).isRequired,
};

export default ErrorBoundary;
