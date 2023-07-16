/*
  Дано масив цілих чисел розміром N,
  знайти перший неповторюваний елемент у цьому масиві.
*/

const getPositiveNumbers1 = (array) => {
  for (let i = 0; i < array.length; i++) {
    let j;

    for (j = 0; j < array.length; j++) {
      if (i !== j && array[i] === array[j]) break;
    }

    if (j === array.length) return array[i];
  }

  return null;
};

const getPositiveNumbers2 = (array) => {
  const map = new Map();

  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    let value = 1;

    if (map.has(element)) value = map.get(element) + 1;

    map.set(element, value);
  }

  for (const [key, value] of map.entries()) {
    if (value === 1) return key;
  };
};

console.log(getPositiveNumbers1([-1, 2, -1, 3, 0])); // 2
console.log(getPositiveNumbers1([9, 4, 9, 6, 7, 4])); // 6

console.log(getPositiveNumbers2([-1, 2, -1, 3, 0])); // 2
console.log(getPositiveNumbers2([9, 4, 9, 6, 7, 4])); // 6
