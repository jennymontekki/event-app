class categoriesToastsFactory {
  static fetchCategories = message => {
    return {
      type: 'danger',
      message,
      duration: 0
    };
  }
}

export default categoriesToastsFactory;
