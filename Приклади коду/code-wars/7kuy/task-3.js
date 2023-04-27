// const highAndLow = (numbers) => {
//   const parsedNumbers = numbers.split(' ');
//   const firstNumber = Number(parsedNumbers[0]);
//   let min = firstNumber;
//   let max = firstNumber;

//   for (const parsedNumber of parsedNumbers) {
//     const number = Number(parsedNumber);

//     if (min > number) min = number;
//     if (max < number) max = number;
//   }

//   return `${max} ${min}`;
// }

const highAndLow = (numbers) => {
  const parsedNumbers = numbers.split(' ').map(Number);
  const max = Math.max(...parsedNumbers);
  const min = Math.min(...parsedNumbers);

  return `${max} ${min}`;
}

console.log(highAndLow("1 9 3 4 -5")); // "9 -5"
