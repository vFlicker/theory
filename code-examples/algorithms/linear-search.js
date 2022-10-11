const array = [3, 10, 1, 4, 2, 7, 5, 8, 9, 6];
let iterationsNumber = 0;

const linearSearch = (item, array) => {
  for (let index = 0; index < array.length; index++) {
    iterationsNumber += 1;

    const currentItem = array[index];
    if (item === currentItem) return item;
  }

  return null;
};

console.log(linearSearch(5, array));
console.log(`Number of iterations: ${iterationsNumber}`);
