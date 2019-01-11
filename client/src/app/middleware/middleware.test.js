import notifier from './notifier';
import { ACTION_ADD_TOAST } from './../containers/toasts/toastsConstants';

const create = () => {
  const store = {
    getState: jest.fn(() => ({})),
    dispatch: jest.fn()
  };
  const next = jest.fn();

  const invoke = action => notifier(store)(next)(action);

  return { store, next, invoke };
};

const toastObj = {
  message: 'test message for notify middleware',
  type: 'danger',
  duration: 0
};

const action = {
  type: 'ACTION_ANY_TYPE',
  payload: null,
  meta: { notify: toastObj }
};

describe('middlewares', () => {
  it('notification middleware calls \'next\' with action', () => {
    const { next, invoke } = create();
    invoke(action);
    expect(next).toHaveBeenCalledWith(action);
  });

  it('notification middleware dispatches ACTION_ADD_TOAST if action has meta defined with property \'notify\'', () => {
    const { store, next, invoke } = create();
    invoke(action);
    expect(store.dispatch).toHaveBeenCalledWith({ type: ACTION_ADD_TOAST, payload: { id: expect.any(String), ...toastObj } });
    expect(next).toHaveBeenCalledWith(action);
  });
});
