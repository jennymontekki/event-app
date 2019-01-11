import { AddEditEventApi } from './../../shared/apiService';
import * as addEditEventConstants from './addEditEventConstants';
import addEditEventToastsFactory from './addEditEventToastsFactory';
import { eventsRoute, eventDetailsRoute } from './../../shared/config';
import { enterLeaveRoom } from './../../shared/socketService';

const startLoading = () => {
  return {
    type: addEditEventConstants.ACTION_ADD_EDIT_EVENT_START_LOADING,
    payload: null
  };
};

const fetchEventToEditSuccess = eventToEdit => {
  return {
    type: addEditEventConstants.ACTION_FETCH_EVENT_TO_EDIT_SUCCESS,
    payload: eventToEdit
  };
};

const fetchEventToEditError = err => {
  return {
    type: addEditEventConstants.ACTION_FETCH_EVENT_TO_EDIT_ERROR,
    payload: err,
    error: true,
    meta: {
      notify: addEditEventToastsFactory.fetchEventToEditError(err),
      redirect: `${eventsRoute.url}/1`
    }
  };
};

export const fetchEventToEdit = id => {
  return dispatch => {
    dispatch(startLoading());
    return AddEditEventApi.fetchEventToEdit(id)
      .then(response => dispatch(fetchEventToEditSuccess(response.data)))
      .catch(err => dispatch(fetchEventToEditError(err)));
  };
};

const addEditEventSuccess = (type, id) => {
  return {
    type: addEditEventConstants.ADD_EDIT_EVENT_SUCCESS,
    payload: null,
    meta: {
      notify: addEditEventToastsFactory.addEditEventSuccess(type),
      redirect: `${eventDetailsRoute.url}/${id}`
    }
  };
};

const addEditEventError = err => {
  return {
    type: addEditEventConstants.ADD_EDIT_EVENT_ERROR,
    payload: err,
    error: true,
    meta: {
      notify: addEditEventToastsFactory.addEditEventError(err),
      redirect: `${eventsRoute.url}/1`
    }
  };
};

const addEditEvent = ({ fetchMethod, data }) => {
  return dispatch => {
    dispatch(startLoading());
    return AddEditEventApi[fetchMethod](data)
      .then(response => {
        const { id } = response.data;
        enterLeaveRoom({ type: 'enter', roomId: id });
        dispatch(addEditEventSuccess(fetchMethod === 'addEvent' ? 'Added' : 'Edited', id));
      })
      .catch(err => dispatch(addEditEventError(err)));
  };
};

export const addEvent = payload => addEditEvent({ fetchMethod: 'addEvent', data: { payload } });

export const editEvent = ({ payload, eventId }) => addEditEvent({ fetchMethod: 'editEvent', data: { payload, eventId } });
