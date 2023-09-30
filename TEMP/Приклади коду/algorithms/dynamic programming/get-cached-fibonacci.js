const getCachedFibonacci = () => {
  const map = new Map();

  const fibonacci = (number) => {
    if (number === 1) return 0;
    if (number === 2) return 1;

    if (!map.has(number)) {
      const result = fibonacci(number - 1) + fibonacci(number - 2);
      map.set(number, result);
    }

    return map.get(number);
  };

  return fibonacci;
};

const cachedFibonacci = getCachedFibonacci();
console.log(cachedFibonacci(300));
