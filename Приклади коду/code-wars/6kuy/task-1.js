// const solution = (number) => {
//   let result = 0;

//   /* We can start from 3 */
//   for (let currentNumber = 3; currentNumber < number; currentNumber++) {
//     if (currentNumber % 3 === 0 && currentNumber % 5 === 0) {
//       result += currentNumber;
//       continue;
//     };

//     if (currentNumber % 3 === 0) {
//       result += currentNumber;
//       continue;
//     };
    
//     if (currentNumber % 5 === 0) {
//       result += currentNumber;
//       continue;
//     };
//   }

//   return result;
// };

const solution = (number) => {
  let result = 0;

  /* We can start from 3 */
  for (let currentNumber = 3; currentNumber < number; currentNumber++) {
    if (currentNumber % 3 === 0 || currentNumber % 5 === 0) {
      result += currentNumber;
    };
  }

  return result;
};

console.log(solution(10)); // 23
