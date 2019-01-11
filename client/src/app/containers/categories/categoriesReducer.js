import * as categoriesConstants from './categoriesConstants';

const initialState = {
  categories: null,
  loading: false
};

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case categoriesConstants.ACTION_CATEGORIES_START_LOADING:
      return { ...state, loading: true };

    case categoriesConstants.ACTION_FETCH_CATEGORIES_SUCCESS:
      return { ...state, loading: false, categories: action.payload };

    case categoriesConstants.ACTION_FETCH_CATEGORIES_ERROR:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default categoriesReducer;
