/* Об'єднати два відсортовані масиви */

const mergeTwoArrays = (firstArray, secondArray) => {
  const mergedArrays = [];

  let firstPointer = 0;
  let secondPointer = 0;


  while (firstPointer !== firstArray.length && secondPointer !== secondArray.length) {
    const firstElement = firstArray[firstPointer];
    const secondElement = secondArray[secondPointer];

    if (firstElement === secondElement) {
      mergedArrays.push(firstElement);
      mergedArrays.push(secondElement);

      firstPointer += 1;
      secondPointer += 1;
    }

    if (firstElement > secondElement) {
      mergedArrays.push(secondElement);
      secondPointer += 1;
    } else if (secondElement > firstElement) {
      mergedArrays.push(firstElement);
      firstPointer += 1;
    }
  }

  while (firstPointer !== firstArray.length) {
    const firstElement = firstArray[firstPointer];
    
    mergedArrays.push(firstElement);
    firstPointer += 1;
  }

  while (secondPointer !== secondArray.length) {
    const secondElement = secondArray[secondPointer];

    mergedArrays.push(secondElement);
    secondPointer += 1;
  }

  return mergedArrays;
};

console.log(mergeTwoArrays([1, 3, 4, 5], [2, 4, 6, 8]));