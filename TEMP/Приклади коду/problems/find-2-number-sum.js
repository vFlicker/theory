const array = [3, 5, 1, 4];

/* 1 прохід циклу */
const findSum = (array, value) => {
  const values = new Set();
  // 9 - 3 = 6
  values.add(value - array[0]); // Set(1) { 6 }

  for (let index = 1; index < array.length; index++) {
    const currentValue = array[index];
    
    if (values.has(currentValue)) return true;

     // 9 - 5 = 4
    values.add(value - currentValue);
  };

  return false;
}

console.log(findSum(array, 9));