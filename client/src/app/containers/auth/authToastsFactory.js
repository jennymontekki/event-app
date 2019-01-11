class authToastsFactory {
  static authenticateSuccess = userName => {
    return {
      type: 'success',
      message: `Hello ${userName}!`
    };
  }

  static authenticateError = message => {
    return {
      type: 'danger',
      message,
      duration: 0
    };
  }

  static signOutSuccess = userName => {
    return {
      type: 'success',
      message: `Hope to see you soon ${userName}!`
    };
  }

  static signOutError = message => {
    return {
      type: 'danger',
      message,
      duration: 0
    };
  }
}

export default authToastsFactory;
