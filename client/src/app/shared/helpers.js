import moment from 'moment';

export const cloneObject = obj => {
  const clone = {};

  Object.keys(obj).forEach(key => {
    if (obj[key] !== null && typeof obj[key] === 'object')
      clone[key] = cloneObject(obj[key]);
    else
      clone[key] = obj[key];
  });

  return clone;
};

export const dateToString = rawDate => moment.utc(rawDate).format('LLLL');

export const localDateToString = rawDate => moment(rawDate).format('LLLL');

export const localShortDateToString = rawDate => moment(rawDate).format('l LT');

export const newDate = () => moment.utc();
