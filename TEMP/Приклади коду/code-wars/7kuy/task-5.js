// const accum = (string) => {
//   const letters = string.split('').map((letter) => letter.toLowerCase());

//   return letters.reduce((acc, letter, index) => {
//     acc += letter.toUpperCase();
//     acc += letter.repeat(index);

//     if (index !== string.length - 1) acc += '-';

//     return acc;
//   }, '');
// }

const accum = (string) => {
  return string
    .split('')
    .map((letter, i) => letter.toUpperCase() + letter.toLowerCase().repeat(i))
    .join('-');
}

console.log(accum("ZpglnRxqenU")); // "A-Bb-Ccc-Dddd";