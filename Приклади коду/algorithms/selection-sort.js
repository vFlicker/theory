const array = [3, 10, 1, 4, 2, 7, 5, 8, 9, 6];
let iterationsNumber = 0;

const selectionSort = (array) => {
  const sortedArray = [];
  let minValue = null;

  for (let index = 0; index < array.length; index++) {
    const value = array[index];
    
    if (!minValue) minValue = value;

    if (minValue > value) {
      minValue = value;
    }
  }

  return minValue;
};

console.log(selectionSort(array));
console.log(`Number of iterations: ${iterationsNumber}`);