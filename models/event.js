class Event {
  constructor(id, name, startDate, endDate, active, notPublic, eventKey) {
    this.id = id;
    this.name = name;
    this.startDate = startDate;
    this.endDate = endDate;
    this.active = active;
    this.notPublic = notPublic;
    this.eventKey = eventKey;
  }
}

export default Event;
