export class EventEmitter {
  #listeners = {};

  on(type, listener) {
    if (!this.#listeners[type]) this.#listeners[type] = [];

    this.#listeners[type].push(listener);
  }

  emit(type, payload) {
    const events = this.#listeners[type];

    if (events) {
      for (const listener of events) {
        listener(payload);
      }
    }
  }
}
