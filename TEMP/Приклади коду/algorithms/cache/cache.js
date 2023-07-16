class MyCache {
  #map;

  constructor(size) {
    this.size = size;
    this.#map = new Map();
  }

  get(key) {
    return this.#map.get(key);
  }

  set(key, value) {
    if (this.#map.size === this.size) {
      this.delete(this.#getFirst());
    }

    this.#map.set(key, value);
  }

  delete(key) {
    this.#map.delete(key);
  }

  #getFirst() {
    return this.#map.keys().next().value;
  }
}
