const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let cyclicIterationsNumber = 0;
let recursiveIterationsNumber = 0;

const cyclicBinarySearch = (array, item) => {
  let start = 0;
  let end = array.length - 1;

  while (start <= end) {
    cyclicIterationsNumber += 1;
    
    const middle = Math.floor((start + end) / 2);
    const currentItem = array[middle];

    if (item === currentItem) return item;
 
    if (item > currentItem) {
      start = middle + 1;
    } else {
      end = middle - 1;
    }
  }

  return null;
};

const recursiveBinarySearch = (array, item) => {
  recursiveIterationsNumber += 1;

  const start = 0;
  const end = array.length - 1;
  const middle = Math.floor((start + end) / 2);
  const currentItem = array[middle];

  if (start > end) return null;

  if (item === currentItem) return item;

  if (item > currentItem) {
    return recursiveBinarySearch(item, array.slice(middle + 1))
  } else {
    return recursiveBinarySearch(item, array.slice(start, middle))
  }
};

console.log(cyclicBinarySearch(array, 5));
console.log(recursiveBinarySearch(array, 5));
console.log(`Number of iterations: ${cyclicIterationsNumber}`);
console.log(`Number of iterations: ${recursiveIterationsNumber}`);

