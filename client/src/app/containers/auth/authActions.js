import { AuthApi } from './../../shared/apiService';
import WebStorageService from './../../shared/webStorageService';
import * as authConstants from './authConstants';
import authToastsFactory from './authToastsFactory';
import { eventsRoute } from './../../shared/config';
import { initSocketService, socketDisconnect } from './../../shared/socketService';

const startLoading = () => {
  return {
    type: authConstants.ACTION_AUTH_START_LOADING,
    payload: null
  };
};

export const changeActiveAuthType = nextActiveAuthType => {
  return {
    type: authConstants.ACTION_CHANGE_ACTIVE_AUTH_TYPE,
    payload: nextActiveAuthType
  };
};

export const changeNotificationStatus = nextStatus => {
  return {
    type: authConstants.ACTION_CHANGE_NOTIFICATION_STATUS,
    payload: nextStatus
  };
};

const authenticateSuccess = name => {
  return {
    type: authConstants.ACTION_AUTHENTICATE_SUCCESS,
    payload: true,
    meta: {
      notify: authToastsFactory.authenticateSuccess(name),
      redirect: `${eventsRoute.url}/1`
    }
  };
};

const authenticateError = err => {
  return {
    type: authConstants.ACTION_AUTHENTICATE_ERROR,
    payload: err,
    error: true,
    meta: {
      notify: authToastsFactory.authenticateError(err)
    }
  };
};

export const authenticate = (userCreds, authType) => {
  return dispatch => {
    dispatch(startLoading());
    return AuthApi[authType](userCreds)
      .then(response => {
        const { user, token } = response.data;
        WebStorageService.saveAuthenticationData({ user, token });
        dispatch(authenticateSuccess(user.name));
        initSocketService();
      })
      .catch(err => dispatch(authenticateError(err)));
  };
};

const signOutSuccess = name => {
  return {
    type: authConstants.ACTION_SIGN_OUT_SUCCESS,
    payload: false,
    meta: {
      notify: authToastsFactory.signOutSuccess(name)
    }
  };
};

const signOutError = err => {
  return {
    type: authConstants.ACTION_SIGN_OUT_ERROR,
    payload: err,
    error: true,
    meta: {
      notify: authToastsFactory.signOutError(err)
    }
  };
};

export const signOut = () => {
  return dispatch => {
    return AuthApi.signOut()
      .then(() => {
        socketDisconnect();
        dispatch(signOutSuccess(WebStorageService.getUser().name));
        WebStorageService.deleteAuthenticationData();
      })
      .catch(err => dispatch(signOutError(err)));
  };
};
