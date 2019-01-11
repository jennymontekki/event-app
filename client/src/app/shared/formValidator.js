export const maxLength = {
  email: 50,
  password: 30,
  name: 50,
  title: 80
};

export const minLength = {
  password: 6,
  name: 6,
  title: 6
};

export const invalidMsg = {
  email: {
    maxLength: `Email must be at most ${maxLength.email} characters long`,
    invalidSymbols: 'Email is incorrect'
  },
  password: {
    minLength: `Password must be at least ${minLength.password} characters long(without white spaces)`,
    maxLength: `Password must be at most ${maxLength.password} characters long(without white spaces)`
  },
  name: {
    minLength: `Name must be at least ${minLength.name} characters long`,
    maxLength: `Name must be at most ${maxLength.name} characters long`,
    invalidSymbols: 'Name can contain only alphanumeric symbols or -.'
  },
  title: {
    minLength: `Event title must be at least ${minLength.title} characters long`,
    maxLength: `Event title must be at most ${maxLength.title} characters long`,
    invalidSymbols: 'Event title can contain alphanumeric symbols or ,.?!@<>"\':;#№$%&*()-+='
  }
}

export const validateEmail = (value, msg) => {
  const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const response = {
    newValid: false,
    newMsg: msg
  };

  if (value.length > maxLength.email) {
    response.newMsg = invalidMsg.email.maxLength;
    return response;
  }

  if (regExp.test(value) === false) {
    response.newMsg = invalidMsg.email.invalidSymbols;
    return response;
  }

  response.newValid = true;

  return response;
};

export const validatePassword = (value, msg) => {
  const response = {
    newValid: false,
    newMsg: msg
  };

  if (value.replace(/\s+/g, '').length < minLength.password) {
    response.newMsg = invalidMsg.password.minLength;
    return response;
  }

  if (value.replace(/\s+/g, '').length > maxLength.password) {
    response.newMsg = invalidMsg.password.maxLength;
    return response;
  }

  response.newValid = true;

  return response;
};

export const validateName = (value, msg) => {
  const regExp = /^[a-z0-9 \-.']+$/img;
  const response = {
    newValid: false,
    newMsg: msg
  };

  if (value.replace(/\s+/g, '').length < minLength.name) {
    response.newMsg = invalidMsg.name.minLength;
    return response;
  }

  if (value.length > maxLength.name) {
    response.newMsg = invalidMsg.name.maxLength;
    return response;
  }

  if (regExp.test(value) === false) {
    response.newMsg = invalidMsg.name.invalidSymbols;
    return response;
  }

  response.newValid = true;

  return response;
};

export const validateTitle = (value, msg) => {
  const regExp = /^[a-z0-9,.?!@<>"':;#№$%&*()\-+= ]+$/img;
  const response = {
    newValid: false,
    newMsg: msg
  };

  if (value.replace(/\s+/g, '').length < minLength.title) {
    response.newMsg = invalidMsg.title.minLength;
    return response;
  }

  if (value.length > maxLength.title) {
    response.newMsg = invalidMsg.title.maxLength;
    return response;
  }

  if (regExp.test(value) === false) {
    response.newMsg = invalidMsg.title.invalidSymbols;
    return response;
  }

  response.newValid = true;

  return response;
};

export const validateSubmit = fields => {
  const response = {
    newValid: true,
    newColor: 'success'
  };

  if (Object.values(fields).some(field => field.valid !== true)) {
    response.newValid = false;
    response.newColor = 'danger';
  }

  return response;
};

export const validators = {
  email: validateEmail,
  password: validatePassword,
  name: validateName,
  title: validateTitle
};
