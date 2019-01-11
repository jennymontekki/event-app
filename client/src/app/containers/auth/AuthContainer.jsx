import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import * as authActions from './authActions';
import { getAuthData, setAuthData } from './../../shared/tempDataService';
import './auth.css';

import SignInComponent from './../../components/SignInComponent';
import SignUpComponent from './../../components/SignUpComponent';

class AuthContainer extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onChangeActiveAuthTypeHandler = this.onChangeActiveAuthTypeHandler.bind(this);
    this.onFormSubmitHandler = this.onFormSubmitHandler.bind(this);
  }

  onChangeActiveAuthTypeHandler(nextActiveAuthType) {
    const { changeActiveAuthType } = this.props.actions;
    const { authTypes } = this.props;

    changeActiveAuthType(authTypes[nextActiveAuthType]);
  }

  onFormSubmitHandler(userCreds) {
    const { authenticate } = this.props.actions;
    const { activeAuthType } = this.props;

    setAuthData({ authCreds: userCreds });
    authenticate(userCreds, activeAuthType);
  }

  render() {
    const { activeAuthType, loading } = this.props;
    const componentsListToRender = {
      signIn: <SignInComponent loading={loading} authData={getAuthData()} onChangeActiveAuthType={this.onChangeActiveAuthTypeHandler} onFormSubmit={this.onFormSubmitHandler} />,
      signUp: <SignUpComponent loading={loading} authData={getAuthData()} onChangeActiveAuthType={this.onChangeActiveAuthTypeHandler} onFormSubmit={this.onFormSubmitHandler} />
    };

    return (
      <Container className="auth-page">
        {componentsListToRender[activeAuthType]}
      </Container>
    );
  }
}

AuthContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  authTypes: PropTypes.object.isRequired,
  activeAuthType: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    activeAuthType: state.authStore.activeAuthType,
    authTypes: state.authStore.authTypes,
    loading: state.authStore.loading
  };
};

const mapDispatchActionsToProps = dispatch => {
  return {
    actions: bindActionCreators(authActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchActionsToProps)(AuthContainer);
