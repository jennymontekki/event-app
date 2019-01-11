import * as eventDetailsConstants from './eventDetailsConstants';

export const initialState = {
  eventDetails: null,
  eventMessages: [],
  loading: false
};

const eventDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case eventDetailsConstants.ACTION_EVENT_DETAILS_START_LOADING:
      return { ...state, loading: true, eventDetails: null };

    case eventDetailsConstants.ACTION_EVENT_NEW_MESSAGE:
      return { ...state, eventMessages: [...state.eventMessages, action.payload] };

    case eventDetailsConstants.ACTION_FETCH_EVENT_DETAILS_SUCCESS:
      return { ...state, loading: false, eventDetails: action.payload };

    case eventDetailsConstants.ACTION_FETCH_EVENT_DETAILS_ERROR:
      return { ...state, loading: false, eventDetails: action.payload };

    case eventDetailsConstants.ACTION_FETCH_EVENT_MESSAGES_SUCCESS:
      return { ...state, eventMessages: action.payload };

    default:
      return state;
  }
};

export default eventDetailsReducer;
