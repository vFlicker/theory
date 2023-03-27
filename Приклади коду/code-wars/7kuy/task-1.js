// const getCount = (str) => {
//   const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
//   let result = 0;

//   for (const letter of str) {
//     if (vowels.has(letter)) result += 1;
//   }

//   return result
// }

const getCount = (str) => (str.match(/[aeiou]/gi) || []).length;

console.log(getCount('FOO bar baz')); // 4