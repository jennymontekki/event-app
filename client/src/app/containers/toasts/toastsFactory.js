const ID_LENGTH = 20;
const POSSIBLE_SYMBOLS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const generateId = () => {
  let result = '';

  for (let i = 0, length = ID_LENGTH; i < length; i++) {
    result += POSSIBLE_SYMBOLS.charAt(Math.floor(Math.random() * POSSIBLE_SYMBOLS.length));
  }

  return result;
};

const createToast = (options) => {
  return {
    ...options,
    id: generateId()
  };
};

export default createToast;
