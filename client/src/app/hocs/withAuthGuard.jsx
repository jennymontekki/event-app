import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export default function (ComposedComponent) {
  class withAuthGuard extends React.PureComponent {
    componentWillMount() { this.checkAuth(); }

    componentDidUpdate() { this.checkAuth(); }

    checkAuth() {
      const { takeMeasures, authStatus } = this.props;
      if (!authStatus)
        takeMeasures();
    }

    render() { return <ComposedComponent {...this.props} />; }
  }

  withAuthGuard.propTypes = {
    takeMeasures: PropTypes.func.isRequired,
    authStatus: PropTypes.bool.isRequired
  };

  const mapStateToProps = state => {
    return {
      authStatus: state.authStore.authStatus
    };
  };

  const mapDispatchActionsToProps = dispatch => {
    return {
      takeMeasures: () => dispatch({
        type: 'NOTIFICATION',
        payload: null,
        meta: {
          notify: { type: 'warning', message: 'Sign in to proceed!' },
          redirect: '/'
        }
      })
    };
  };

  return connect(mapStateToProps, mapDispatchActionsToProps)(withAuthGuard);
}
