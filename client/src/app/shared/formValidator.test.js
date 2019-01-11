import {
  maxLength,
  minLength,
  validateEmail,
  invalidMsg,
  validatePassword,
  validateName,
  validateTitle,
  validateSubmit
} from './formValidator';

const createFakeValue = (type, length) => {
  let value = '';
  let len = length;
  if (type === 'max') len += 2;
  if (type === 'symbol') value += '`';
  for (let i = 1; i < len; i++) value += 'q';
  return value;
};

const createFakeFields = submitType => {
  const fields = {
    email: { valid: true },
    password: { valid: true }
  };

  if (submitType === 'incorrect') fields.password.valid = false;
  return fields;
};

describe('formValidator functionality', () => {
  const defMsg = 'PASS';
  const { email, password, name, title } = invalidMsg;

  it('validateEmail shows message when email input is longer than allowed', () => {
    expect(validateEmail(createFakeValue('max', maxLength.email), defMsg).newMsg).toBe(email.maxLength);
  });

  it('validateEmail shows message when email input contains invalid symbols', () => {
    expect(validateEmail(createFakeValue('symbol', 0), defMsg).newMsg).toBe(email.invalidSymbols);
  });

  it('validatePassword shows message when password input is longer than allowed', () => {
    expect(validatePassword(createFakeValue('max', maxLength.password), defMsg).newMsg).toBe(password.maxLength);
  });

  it('validatePassword shows message when password input is shorter than required', () => {
    expect(validatePassword(createFakeValue('min', minLength.password), defMsg).newMsg).toBe(password.minLength);
  });

  it('validateName shows message when name input is longer than allowed', () => {
    expect(validateName(createFakeValue('max', maxLength.name), defMsg).newMsg).toBe(name.maxLength);
  });

  it('validateName shows message when name input is shorter than required', () => {
    expect(validateName(createFakeValue('min', minLength.name), defMsg).newMsg).toBe(name.minLength);
  });

  it('validateName shows message when name input contains invalid symbols', () => {
    expect(validateName(createFakeValue('symbol', minLength.name), defMsg).newMsg).toBe(name.invalidSymbols);
  });

  it('validateTitle shows message when title input is longer than allowed', () => {
    expect(validateTitle(createFakeValue('max', maxLength.title), defMsg).newMsg).toBe(title.maxLength);
  });

  it('validateTitle shows message when title input is shorter than required', () => {
    expect(validateTitle(createFakeValue('min', minLength.title), defMsg).newMsg).toBe(title.minLength);
  });

  it('validateTitle shows message when title input contains invalid symbols', () => {
    expect(validateTitle(createFakeValue('symbol', minLength.title), defMsg).newMsg).toBe(title.invalidSymbols);
  });

  it('validateSubmit returns {newValid:true, newColor:success} when all fields are valid', () => {
    expect(validateSubmit(createFakeFields('correct'))).toEqual({ newValid: true, newColor: 'success' });
  });

  it('validateSubmit returns {newValid:false, newColor:danger} when at least one of fields is invalid', () => {
    expect(validateSubmit(createFakeFields('incorrect'))).toEqual({ newValid: false, newColor: 'danger' });
  });
});
