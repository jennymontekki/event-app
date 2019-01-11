import { EventDetailsApi } from './../../shared/apiService';
import * as eventDetailsConstants from './eventDetailsConstants';
import eventDetailsToastsFactory from './eventDetailsToastsFactory';
import { enterLeaveRoom } from './../../shared/socketService';

export const startLoading = () => {
  return {
    type: eventDetailsConstants.ACTION_EVENT_DETAILS_START_LOADING,
    payload: null
  };
};

export const eventNewMessage = payload => {
  return {
    type: eventDetailsConstants.ACTION_EVENT_NEW_MESSAGE,
    payload
  };
};

export const notAuthenticated = () => {
  return {
    type: 'NOTIFICATION',
    payload: null,
    meta: {
      notify: { type: 'warning', message: 'Sign in to subscribe' }
    }
  };
};

const fetchEventDetailsSuccess = eventDetails => {
  return {
    type: eventDetailsConstants.ACTION_FETCH_EVENT_DETAILS_SUCCESS,
    payload: eventDetails
  };
};

const fetchEventDetailsError = err => {
  return {
    type: eventDetailsConstants.ACTION_FETCH_EVENT_DETAILS_ERROR,
    payload: err,
    error: true,
    meta: {
      notify: eventDetailsToastsFactory.fetchEventDetailsError(err)
    }
  };
};

export const fetchEventDetails = id => {
  return dispatch => {
    dispatch(startLoading());
    return EventDetailsApi.fetchEventDetails(id)
      .then(response => dispatch(fetchEventDetailsSuccess(response.data)))
      .catch(err => dispatch(fetchEventDetailsError(err)));
  };
};

const fetchEventMessagesSuccess = eventMessages => {
  return {
    type: eventDetailsConstants.ACTION_FETCH_EVENT_MESSAGES_SUCCESS,
    payload: eventMessages
  };
};

const fetchEventMessagesError = err => {
  return {
    type: eventDetailsConstants.ACTION_FETCH_EVENT_MESSAGES_ERROR,
    payload: err,
    error: true,
    meta: {
      notify: eventDetailsToastsFactory.fetchEventMessagesError(err)
    }
  };
};

export const fetchEventMessages = id => {
  return dispatch => {
    return EventDetailsApi.fetchEventMessages(id)
      .then(response => dispatch(fetchEventMessagesSuccess(response.data)))
      .catch(err => dispatch(fetchEventMessagesError(err)));
  };
};

const subscriptionSuccess = type => {
  return {
    type: eventDetailsConstants.ACTION_SUBSCRIPTION_SUCCESS,
    payload: null,
    meta: {
      notify: eventDetailsToastsFactory.subscriptionSuccess(type)
    }
  };
};

const subscriptionError = err => {
  return {
    type: eventDetailsConstants.ACTION_SUBSCRIPTION_ERROR,
    payload: err,
    error: true,
    meta: {
      notify: eventDetailsToastsFactory.subscriptionError(err)
    }
  };
};

export const subscription = (method, payload) => {
  const { eventId } = payload;

  return dispatch => {
    return EventDetailsApi[method](eventId)
      .then(() => {
        method === 'subscribe' ? enterLeaveRoom({ type: 'enter', roomId: eventId }) : enterLeaveRoom({ type: 'leave', roomId: eventId });
        dispatch(subscriptionSuccess(method));
        dispatch(fetchEventDetails(eventId));
      })
      .catch(err => dispatch(subscriptionError(err)));
  };
};

const deleteEventSuccess = () => {
  return {
    type: eventDetailsConstants.ACTION_DELETE_EVENT_SUCCESS,
    payload: null,
    meta: {
      notify: eventDetailsToastsFactory.deleteEventSuccess(),
      redirect: null
    }
  };
};

const deleteEventError = err => {
  return {
    type: eventDetailsConstants.ACTION_DELETE_EVENT_ERROR,
    payload: err,
    error: true,
    meta: {
      notify: eventDetailsToastsFactory.deleteEventError(err)
    }
  };
};

export const deleteEvent = eventId => {
  return dispatch => {
    return EventDetailsApi.deleteEvent(eventId)
      .then(() => dispatch(deleteEventSuccess()))
      .catch(err => dispatch(deleteEventError(err)));
  };
};
