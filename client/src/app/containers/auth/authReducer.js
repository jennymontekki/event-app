import * as authConstants from './authConstants';
import WebStorageService from './../../shared/webStorageService';

const initialState = {
  activeAuthType: 'signIn',
  authTypes: {
    signIn: 'signIn',
    signUp: 'signUp'
  },
  authStatus: WebStorageService.isSignedIn(),
  notificationStatus: null,
  loading: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authConstants.ACTION_AUTH_START_LOADING:
      return { ...state, loading: true };

    case authConstants.ACTION_CHANGE_ACTIVE_AUTH_TYPE:
      return { ...state, activeAuthType: action.payload };

    case authConstants.ACTION_AUTHENTICATE_SUCCESS:
      return { ...state, loading: false, authStatus: action.payload };
      
    case authConstants.ACTION_AUTHENTICATE_ERROR:
      return { ...state, loading: false };

    case authConstants.ACTION_CHANGE_NOTIFICATION_STATUS:
      return { ...state, notificationStatus: action.payload };

    case authConstants.ACTION_SIGN_OUT_SUCCESS:
      return { ...state, authStatus: action.payload };

    default:
      return state;
  }
};

export default authReducer;
