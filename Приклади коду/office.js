// const count = (input) => {
//   if (input.length === 0) return 0;

//   const map = new Map();

//   for (const [start, end] of input) {
//     for (let current = start; current < end; current++) {
//       let count = 1;
//       if (map.has(current)) count += map.get(current);
//       map.set(current, count);
//     }
//   }

//   return Math.max(...map.values());
// };

// const count = (input) => {
//   let max = 0;

//   if (input.length === 0) return max;

//   const result = [];
  
//   for (const currentTime of input) {
//     if (result.length === 0) {
//       result.push(currentTime);
//       max = 1;
//       continue;
//     }

//     for (let index = 0; index < result.length; index++) {
//       const [_, prevEnd] = result[index];
//       const currentTimeEnd = currentTime[0];
//       if (prevEnd <= currentTimeEnd) result.splice(index, 1);
//     }

//     result.push(currentTime)
//     max = Math.max(max, result.length);
//   }

//   return max;
// }

const count = (input) => {
  const entries = [];

  for (const [startTime, endTime] of input) {
    entries.push({
      time: startTime,
      isEntered: true,
    });

    entries.push({
      time: endTime,
      isEntered: false,
    });
  }

  entries.sort((first, second) => {
    if (first.time === second.time) {
      return first.isEntered ? 1 : -1;
    }

    return first.time - second.time;
  });

  let max = 0;
  let count = 0;

  for (const { isEntered } of entries) {
    isEntered ? count += 1 : count -=1;
    max = Math.max(max, count);
  }

  return max;
}

console.log(count([])) // 0
console.log(count([[1, 5], [5, 10]])) // 1
console.log(count([[1, 5], [0, 1], [4, 5]])) // 2
console.log(count([[1, 10], [2, 3], [5, 6], [7, 8]])) // 2
console.log(count([[1, 2], [1, 10], [4, 9], [5, 6], [8, 16], [8, 15]])) // 4
