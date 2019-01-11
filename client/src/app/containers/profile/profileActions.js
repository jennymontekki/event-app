import * as profileConstants from './profileConstants';
import * as eventsActions from './../events/eventsActions';
import profileToastsFactory from './profileToastsFactory';
import { ProfileApi } from './../../shared/apiService';
import { enterLeaveRoom } from './../../shared/socketService';

export const newMessage = payload => {
  return {
    type: profileConstants.ACTION_NEW_MESSAGE,
    payload
  };
};

const fetchMessagesSuccess = payload => {
  return {
    type: profileConstants.ACTION_FETCH_MESSAGES_SUCCESS,
    payload
  };
};

const fetchMessagesError = err => {
  return {
    type: profileConstants.ACTION_FETCH_MESSAGES_ERROR,
    payload: err,
    error: true,
    meta: {
      notify: profileToastsFactory.fetchMessagesError(err)
    }
  };
};

export const fetchMessages = pageNum => {
  return dispatch => {
    return ProfileApi.fetchMessages(pageNum)
      .then(response => {
        const { messages, messagesCount } = response.data;
        dispatch(fetchMessagesSuccess({ messages, messagesCount }));
      })
      .catch(err => dispatch(fetchMessagesError(err)));
  };
};

const deleteMessageSuccess = payload => {
  return {
    type: profileConstants.ACTION_DELETE_MESSAGE_SUCCESS,
    payload
  };
};

const deleteMessageError = err => {
  return {
    type: profileConstants.ACTION_DELETE_MESSAGE_ERROR,
    payload: err,
    error: true,
    meta: {
      notify: profileToastsFactory.deleteMessageError(err)
    }
  };
};

export const deleteMessage = messageId => {
  return dispatch => {
    return ProfileApi.deleteMessage(messageId)
      .then(() => dispatch(deleteMessageSuccess(messageId)))
      .catch(err => dispatch(deleteMessageError(err)));
  };
};

const deleteMyEventSuccess = eventId => {
  return {
    type: profileConstants.ACTION_DELETE_MY_EVENT_SUCCESS,
    payload: eventId,
    meta: {
      notify: profileToastsFactory.deleteMyEventSuccess()
    }
  };
};

const deleteMyEventError = err => {
  return {
    type: profileConstants.ACTION_DELETE_MY_EVENT_ERROR,
    payload: err,
    error: true,
    meta: {
      notify: profileToastsFactory.deleteMyEventError(err)
    }
  };
};

export const deleteMyEvent = (eventId, events, eventsCount) => {
  return dispatch => {
    return ProfileApi.deleteMyEvent(eventId)
      .then(() => {
        dispatch(eventsActions.fetchEventsSuccess({ events: events.filter(event => event.id !== eventId), eventsCount: eventsCount - 1 }));
        dispatch(deleteMyEventSuccess(eventId));
      })
      .catch(err => dispatch(deleteMyEventError(err)));
  };
};

const unsubscribeSuccess = () => {
  return {
    type: profileConstants.ACTION_UNSUBSCRIBE_FROM_EVENT_SUCCESS,
    payload: null,
    meta: {
      notify: profileToastsFactory.unsubscribeSuccess()
    }
  };
};

const unsubscribeError = err => {
  return {
    type: profileConstants.ACTION_UNSUBSCRIBE_FROM_EVENT_ERROR,
    payload: err,
    error: true,
    meta: {
      notify: profileToastsFactory.unsubscribeError(err)
    }
  };
};

export const unsubscribe = (eventId, events, eventsCount) => {
  return dispatch => {
    return ProfileApi.unsubscribeFromEvent(eventId)
      .then(() => {
        enterLeaveRoom({ type: 'leave', roomId: eventId });
        dispatch(eventsActions.fetchEventsSuccess({ events: events.filter(event => event.id !== eventId), eventsCount: eventsCount - 1 }));
        dispatch(unsubscribeSuccess());
      })
      .catch(err => dispatch(unsubscribeError(err)));
  };
};
