import * as toastsConstants from './toastsConstants';

const initialState = {
  toastsList: []
};

const toastsReducer = (state = initialState, action) => {
  switch (action.type) {
    case toastsConstants.ACTION_ADD_TOAST:
      return { ...state, toastsList: [action.payload, ...state.toastsList] };

    case toastsConstants.ACTION_REMOVE_TOAST:
      return { ...state, toastsList: state.toastsList.filter(toast => toast.id !== action.payload) };

    default:
      return state;
  }
};

export default toastsReducer;
