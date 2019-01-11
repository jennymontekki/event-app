import { CategoriesApi } from './../../shared/apiService';
import * as categoriesConstants from './categoriesConstants';
import categoriesToastsFactory from './categoriesToastsFactory';

const startLoading = () => {
  return {
    type: categoriesConstants.ACTION_CATEGORIES_START_LOADING,
    payload: true
  };
};

const fetchCategoriesSuccess = categories => {
  return {
    type: categoriesConstants.ACTION_FETCH_CATEGORIES_SUCCESS,
    payload: categories
  };
};

const fetchCategoriesError = err => {
  return {
    type: categoriesConstants.ACTION_FETCH_CATEGORIES_ERROR,
    payload: err,
    error: true,
    meta: {
      notify: categoriesToastsFactory.fetchCategories(err)
    }
  };
};

export const fetchAllCategories = () => {
  return dispatch => {
    dispatch(startLoading());
    return CategoriesApi.fetchAllCategories()
      .then(response => dispatch(fetchCategoriesSuccess(response.data)))
      .catch(err => dispatch(fetchCategoriesError(err)));
  };
};
