/*
  Знайти другий мінімальний елемент в масиві
*/

/**
 * Складність за часом — `О(n)`
 * Складність за пам'яттю — `О(1)`
 */
const findSecondMinimalElement = (array) => {
  let firstPinter = 0;
  let secondPointer = 1;
  let firstElement = Infinity;
  let secondElement = Infinity;

  while (firstPinter <= array.length && secondPointer <= array.length ) {
    if (array[firstPinter]) {
      firstElement = Math.min(firstElement, array[firstPinter]);
    }

    if (array[secondPointer]) {
      secondElement = Math.min(secondElement, array[secondPointer]);
    }

    firstPinter += 2;
    secondPointer += 2;
  }

  return firstElement > secondElement ? firstElement : secondElement;
};
