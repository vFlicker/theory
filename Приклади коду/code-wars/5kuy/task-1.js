// const pigIt = (string) => {
//   const words = string.split(' ');
//   const punctuationMarks = new Set([',', '.', '!', '?']);
//   const ending = 'ay';

//   const result = words.map((word) => {
//     if (punctuationMarks.has(word)) return word;

//     const firstChar = word[0];
//     const restWord = word.slice(1);

//     return `${restWord}${firstChar}${ending}`;
//   });

//   return result.join(' ');
// };

const pigIt = (string) => string.replace(/(\w)(\w*)(\s|$)/g, "\$2\$1ay\$3")

console.log(pigIt('Pig latin is cool !')); // igPay atinlay siay oolcay !