class profileToastsFactory {
  static fetchMessagesError = message => {
    return {
      type: 'danger',
      message,
      duration: 0
    };
  }

  static deleteMessageError = message => {
    return {
      type: 'warning',
      message
    };
  }

  static deleteMyEventSuccess = () => {
    return {
      type: 'success',
      message: 'event has been deleted!'
    };
  }

  static deleteMyEventError = message => {
    return {
      type: 'warning',
      message
    };
  }

  static unsubscribeSuccess = () => {
    return {
      type: 'success',
      message: 'You\'ve been unsubscibed from event!'
    };
  }

  static unsubscribeError = message => {
    return {
      type: 'warning',
      message
    };
  }
}

export default profileToastsFactory;
