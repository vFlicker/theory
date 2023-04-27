const findOdd = (array) => {
  const map = new Map();

  for (const integer of array) {
    let value = 1;

    if (map.has(integer)) value += map.get(integer);

    map.set(integer, value)
  }

  const entries = map.entries();
  for (const [key, value] of entries) {
    if (value % 2 !== 0) return key;
  }
};

console.log(findOdd([1,2,2,3,3,3,4,3,3,3,2,2,1])); // 4
console.log(findOdd([7])); // 7
