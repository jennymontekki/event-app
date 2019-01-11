class Event {
  constructor({ title, address, location, description = '', date, categoryId, category }) {
    this.title = title;
    this.address = address;
    this.location = location;
    this.description = description;
    this.date = date;
    this.categoryId = categoryId || category.id;
  }
}

export default Event;
