import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import eventsStore from './containers/events/eventsReducer';
import categoriesStore from './containers/categories/categoriesReducer';
import eventDetailsStore from './containers/event-details/eventDetailsReducer';
import addEditEventStore from './containers/add-edit-event/addEditEventReducer';
import authStore from './containers/auth/authReducer';
import toastsStore from './containers/toasts/toastsReducer';
import profileStore from './containers/profile/profileReducer';

export default combineReducers({
  router: routerReducer,
  eventsStore,
  categoriesStore,
  eventDetailsStore,
  addEditEventStore,
  authStore,
  toastsStore,
  profileStore
});
