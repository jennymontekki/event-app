import React from 'react';
import PropTypes from 'prop-types';
import './error.css';

class ErrorComponent extends React.Component {
  shouldComponentUpdate() { return false; }

  render() {
    const { errorCode } = this.props.match.params;

    return (
      <div className="error-page">
        {errorCode}
      </div>
    );
  }
}

ErrorComponent.propTypes = {
  match: PropTypes.object.isRequired
};


export default ErrorComponent;
