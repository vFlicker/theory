// const isIsogram = (s) => {
//   const map = new Map();
//   const string = s.toLowerCase();

//   for (const letter of string) {
//     let value = 1;

//     if (map.has(letter)) value += map.get(letter)
//     map.set(letter, value);
//   }

//   const values = map.values();

//   for (const value of values) {
//     if (value > 1) return false;
//   }

//   return true;
// };

const isIsogram = (string) => {
  const { size } = new Set(string.toLowerCase());
  const { length } = string;
  
  return size === length;
}

console.log(isIsogram('Dermatoglyphics'));
console.log(isIsogram('moose'));
console.log(isIsogram(''));
