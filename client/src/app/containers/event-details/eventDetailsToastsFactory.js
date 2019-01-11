class eventDetailsToastsFactory {
  static fetchEventDetailsError = message => {
    return {
      type: 'danger',
      message,
      duration: 0
    };
  }

  static fetchEventMessagesError = message => {
    return {
      type: 'warning',
      message
    };
  }

  static subscriptionSuccess = type => {
    const message = type === 'subscribe' ? 'You\'ve been subscibed to event!' : 'You\'ve been unsubscibed from event!';
    return {
      type: 'success',
      message
    };
  }

  static subscriptionError = message => {
    return {
      type: 'warning',
      message
    };
  }

  static deleteEventSuccess = () => {
    return {
      type: 'success',
      message: 'event has been deleted!'
    };
  }

  static deleteEventError = message => {
    return {
      type: 'warning',
      message
    };
  }
}

export default eventDetailsToastsFactory;
