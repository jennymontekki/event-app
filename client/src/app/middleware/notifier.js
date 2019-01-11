import { addToast } from './../containers/toasts/toastsActions';

const notifier = ({ dispatch }) => next => action => {
  if (action.meta && action.meta.notify)
    dispatch(addToast(action.meta.notify));

  return next(action);
};

export default notifier;
