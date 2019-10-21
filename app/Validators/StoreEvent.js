class StoreEvent {
  get rules() {
    return {
      name: 'required',
      background_color: 'required',
      color: 'required',
    };
  }

  get validateAll() {
    return true;
  }
}

module.exports = StoreEvent;
