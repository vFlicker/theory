// 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89

// const productFib = (prod) => {
//   let prev = 0;
//   let current = 1;

//   while (true) {
//     const temp = prev;
//     prev = current;
//     current += temp;

//     if (prev * current === prod) {
//       return [prev, current, true];
//     }
  
//     if (prev * current > prod) {
//       return [prev, current, false];
//     }
//   }
// };

const productFib = (prod) => {
  let [prev, current] = [0, 1];

  while (prev * current < prod) {
    [prev, current] = [current, prev + current];
  }

  return [prev, current, prev * current === prod];
};

console.log(productFib(0)); // [21, 34, true];
console.log(productFib(800)); // [34, 55, false];