const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let iterationsNumber = 0;

const binarySearch = (item, array) => {
  let start = 0;
  let end = array.length - 1;

  while (start <= end) {
    iterationsNumber += 1;
    
    const middle = Math.floor((start + end) / 2);
    const currentItem = array[middle];

    if (item === currentItem) return item;

    if (item < currentItem) {
      end = middle - 1;
    } else {
      start = middle + 1;
    }
  }

  return null;
};

console.log(binarySearch(5, array))
console.log(`Number of iterations: ${iterationsNumber}`);
