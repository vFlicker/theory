/*
  Знайти пропущене число у відсортованому масиві
*/

/**
 * За часом — `О(log(n)`
 * За пам'яттю — `О(1)`
 */
const findMissingNumber = (array) => {
  let startIndex = 0;
  let endIndex = array.length - 1;

  while (startIndex < endIndex) {
    const middleIndex = Math.floor((startIndex + endIndex) / 2);
    const element = array[middleIndex];
    const wanterElement = middleIndex + 1;

    if (element > wanterElement) {
      endIndex = middleIndex - 1;
    } else if (wanterElement === element) {
      startIndex = middleIndex + 1;
    }

    return wanterElement;
  }
};

console.log(findMissingNumber([1, 2, 3, 5, 6, 7, 8, 9])); // 4
