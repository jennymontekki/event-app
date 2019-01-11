import { EventsApi } from './../../shared/apiService';
import * as eventsConstants from './eventsConstants';
import eventsToastsFactory from './eventsToastsFactory';

const startLoading = () => {
  return {
    type: eventsConstants.ACTION_EVENTS_START_LOADING,
    payload: true
  };
};

export const fetchEventsSuccess = events => {
  return {
    type: eventsConstants.ACTION_FETCH_EVENTS_SUCCESS,
    payload: events
  };
};

const fetchEventsError = err => {
  return {
    type: eventsConstants.ACTION_FETCH_EVENTS_ERROR,
    payload: err,
    error: true,
    meta: {
      notify: eventsToastsFactory.fetchEventsError(err)
    }
  };
};

const fetchEvents = ({ fetchMethod, data }) => {
  return dispatch => {
    dispatch(startLoading());
    return EventsApi[fetchMethod]({ data })
      .then(response => {
        const { events, eventsCount } = response.data;
        dispatch(fetchEventsSuccess({ events, eventsCount }));
      })
      .catch(err => dispatch(fetchEventsError(err)));
  };
};

export const fetchAllEvents = pageNum => fetchEvents({ fetchMethod: 'fetchAllEvents', data: { pageNum } });

export const fetchEventsByUserId = pageNum => fetchEvents({ fetchMethod: 'fetchEventsByUserId', data: { pageNum } });

export const fetchSubscribedEvents = pageNum => fetchEvents({ fetchMethod: 'fetchSubscribedEvents', data: { pageNum } });

export const fetchEventsByCategoryId = ({ categoryId, pageNum }) => fetchEvents({ fetchMethod: 'fetchEventsByCategoryId', data: { categoryId, pageNum } });

const fetchFilteredEventsSuccess = filteredEvents => {
  return {
    type: eventsConstants.ACTION_FETCH_FILTERED_EVENTS_SUCCESS,
    payload: filteredEvents
  };
};

const fetchFilteredEventsError = err => {
  return {
    type: eventsConstants.ACTION_FETCH_FILTERED_EVENTS_ERROR,
    payload: err,
    error: true,
    meta: {
      notify: eventsToastsFactory.fetchFilteredEventsError(err)
    }
  };
};

export const fetchFilteredEvents = filterEvents => {
  return dispatch => {
    return EventsApi.fetchFilteredEvents(filterEvents)
      .then(response => dispatch(fetchFilteredEventsSuccess(response.data)))
      .catch(err => dispatch(fetchFilteredEventsError(err)));
  };
};

