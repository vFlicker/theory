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

const getCachedFibonacci = () => {
  const map = new MyCache(300);

  const fibonacci = (number) => {
    if (number === 1) return 0;
    if (number === 2) return 1;

    const cachedValue = map.get(number);
    if (cachedValue) return cachedValue;

    const result = fibonacci(number - 1) + fibonacci(number - 2);
    map.set(number, result);
    return result;
  };

  return fibonacci;
};

const cachedFibonacci = getCachedFibonacci();
console.log(cachedFibonacci(300));
