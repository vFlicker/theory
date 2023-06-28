/*
  Переставити позитивні та негативні значення
  за O(n) часу та O(1) додаткового простору.
*/

const rearrangeNumbers = (array) => {
  const pivot = 0;
  let left = 0;
  let right = array.length - 1;

  while (left < right) {
    while (array[left] < pivot) {
      left++;
    }

    while (array[right] > pivot) {
      right--;
    }

    if (left <= right) {
      [array[left], array[right]] = [array[right], array[left]];
      left++;
      right--;
    }
  }

  return array;
};

console.log(rearrangeNumbers([3, 4, 5, 1, -2, 6, -7, 8, 9]));
