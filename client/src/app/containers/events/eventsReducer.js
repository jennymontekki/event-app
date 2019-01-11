import * as eventsConstants from './eventsConstants';

const initialState = {
  events: null,
  eventsCount: 0,
  filteredEvents: null,
  loading: false
};

const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case eventsConstants.ACTION_EVENTS_START_LOADING:
      return { ...state, loading: true, events: null };

    case eventsConstants.ACTION_FETCH_EVENTS_SUCCESS:
      return { ...state, loading: false, events: action.payload.events, eventsCount: action.payload.eventsCount };

    case eventsConstants.ACTION_FETCH_EVENTS_ERROR:
      return { ...state, loading: false };

    case eventsConstants.ACTION_FETCH_FILTERED_EVENTS_SUCCESS:
      return { ...state, loading: false, filteredEvents: action.payload };

    default:
      return state;
  }
};

export default eventsReducer;
