import { push, goBack } from 'react-router-redux';

const redirector = ({ dispatch }) => next => action => {
  if (action.meta && typeof action.meta.redirect !== 'undefined')
    action.meta.redirect !== null ? dispatch(push(action.meta.redirect)) : dispatch(goBack());

  return next(action);
};

export default redirector;
