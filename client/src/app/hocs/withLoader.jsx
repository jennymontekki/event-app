import React from 'react';
import { RingLoader } from 'react-spinners';
import PropTypes from 'prop-types';

export default function (ComposedComponent) {
  class withAuthGuard extends React.PureComponent {
    render() {
      const { loading } = this.props;
      return loading ? <div className="ui-component-loader"><RingLoader color="deepskyblue" loading={loading} /></div> : <ComposedComponent {...this.props} />;
    }
  }

  withAuthGuard.propTypes = {
    loading: PropTypes.bool.isRequired
  };

  return withAuthGuard;
}
