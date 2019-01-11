class eventsToastsFactory {
  static fetchEventsError = message => {
    return {
      type: 'danger',
      message,
      duration: 0
    };
  }

  static fetchFilteredEventsError = message => {
    return {
      type: 'danger',
      message,
      duration: 0
    };
  }
}

export default eventsToastsFactory;
