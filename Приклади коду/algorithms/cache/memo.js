const increment = (value) => {
  console.log('Function increment called');
  return value + 1;
}

const memo = (fn) => {
  const cache = new Map();

  return (value) => {
    if (!cache.has(value)) cache.set(value, fn(value));
    return cache.get(value);
  };
};

const memorizedIncrement = memo(increment);

console.log(memorizedIncrement(1));
console.log(memorizedIncrement(2));
console.log(memorizedIncrement(13));
console.log(memorizedIncrement(13));
console.log(memorizedIncrement(13));
console.log(memorizedIncrement(1));
console.log(memorizedIncrement(3));