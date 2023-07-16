const getCachedFibonacci = () => {
  const map = new Map();

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
