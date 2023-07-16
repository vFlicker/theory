// const isSquare = (number) => {
//   if (number < 0) return false;

//   const sqrtNumber = Math.sqrt(number);
//   return sqrtNumber % 1 === 0 ? true : false;
// };

const isSquare = (number) => Number.isInteger(Math.sqrt(number));

console.log(isSquare(-1)); // false
console.log(isSquare(4.2)); // false
console.log(isSquare(4)); // true