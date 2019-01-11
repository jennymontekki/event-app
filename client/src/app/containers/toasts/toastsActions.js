import createToast from './toastsFactory';
import * as toastsConstants from './toastsConstants';

const defaultOptions = {
  type: 'info',
  message: 'message',
  duration: 5000
};

export const addToast = (options = defaultOptions) => {
  return {
    type: toastsConstants.ACTION_ADD_TOAST,
    payload: createToast({ ...defaultOptions, ...options })
  };
};

export const removeToast = id => {
  return {
    type: toastsConstants.ACTION_REMOVE_TOAST,
    payload: id
  };
};
