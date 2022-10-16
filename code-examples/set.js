const array = [3, 5, 1, 4];

const findSum = (array, value) => {
  const values = new Set();
  values.add(value - array[0]); // Set(1) { 6 }

  for (let index = 1; index < array.length; index++) {
    const currentValue = array[index];
    
    if (values.has(currentValue)) return true;

    values.add(value - currentValue);
  };

  return false;
}

console.log(findSum(array, 9));