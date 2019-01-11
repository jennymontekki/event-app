class addEditEventToastsFactory {
  static fetchEventToEditError = message => {
    return {
      type: 'danger',
      message,
      duration: 0
    };
  }

  static addEditEventSuccess = type => {
    return {
      type: 'success',
      message: `Event has been successfully ${type}!`
    };
  }

  static addEditEventError = message => {
    return {
      type: 'danger',
      message,
      duration: 0
    };
  }
}

export default addEditEventToastsFactory;
