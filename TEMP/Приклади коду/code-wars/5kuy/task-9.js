// const maxSequence = (numbers) => {
//   let maxSum = 0;

//   for (let i = 1; i <= numbers.length; i++) {
//     for (let j = 0; j < numbers.length - i + 1; j++) {
//       const subArray = numbers.slice(j, j + i)
//       const sum = subArray.reduce((acc, number) => acc + number, 0);

//       if (maxSum < sum) maxSum = sum;
//     }
//   }

//   return maxSum;
// };

// const maxSequence = (numbers) => {
//   let maxSum = 0;

//   for (let i = 1; i <= numbers.length; i++) {
//     for (let sum = 0, j = 0; j < numbers.length - i + 1; j++) {
//       sum += numbers[j + i];
//       if (maxSum < sum) maxSum = sum;
//     }
//   }

//   return maxSum;
// };

function maxSequence(numbers) {
  let maxSum = 0;
  let currentSum = 0;

  for (const number of numbers) {
    currentSum = Math.max(0, currentSum + number);
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
}

console.log(maxSequence([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // 6 --> [4, -1, 2, 1]
console.log(maxSequence([-2, 5, -1, 7, -3])); // 11 --> [5, -1, 7]
