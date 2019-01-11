import * as addEditEventConstants from './addEditEventConstants';
import { newDate, dateToString } from './../../shared/helpers';

const location = { lat: 0, lng: 0 };

navigator.geolocation.getCurrentPosition(position => {
  location.lat = position.coords.latitude;
  location.lng = position.coords.longitude;
});

const initialState = {
  newEvent: {
    title: '',
    categoryId: 1,
    address: '',
    timeZone: null,
    location,
    description: '',
    date: dateToString(newDate()),
    category: { id: 1 }
  },
  eventToEdit: null,
  loading: false
};

const addEditEventReducer = (state = initialState, action) => {
  switch (action.type) {
    case addEditEventConstants.ACTION_ADD_EDIT_EVENT_START_LOADING:
      return { ...state, loading: true, eventToEdit: null };

    case addEditEventConstants.ACTION_FETCH_EVENT_TO_EDIT_SUCCESS:
      return { ...state, loading: false, eventToEdit: action.payload };

    case addEditEventConstants.ACTION_FETCH_EVENT_TO_EDIT_ERROR:
      return { ...state, loading: false, eventToEdit: action.payload };

    case addEditEventConstants.ADD_EDIT_EVENT_SUCCESS:
      return { ...state, loading: false };

    case addEditEventConstants.ADD_EDIT_EVENT_ERROR:
      return { ...state, loading: false };


    default:
      return state;
  }
};

export default addEditEventReducer;
