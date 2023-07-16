// const disemvowel = (str) => {
//   const vowels = new Set(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']);
//   let result = '';

//   for (const letter of str) {
//     if (!vowels.has(letter)) result += letter;
//   }

//   return result
// }

const disemvowel = (str) => str.replace(/[aeiou]/gi, '');

console.log((disemvowel("This website is for losers LOL!"))); // "Ths wbst s fr lsrs LL!".