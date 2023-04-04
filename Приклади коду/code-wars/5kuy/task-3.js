const map = new Map([
  [ 1, '1' ],
  [ 2, '2' ],
  [ 3, '3' ],
  [ 4, '4' ],
  [ 5, '5' ],
  [ 6, '6' ],
  [ 7, '7' ],
  [ 8, '8' ],
  [ 9, '9' ],
  [ 10, 'A' ],
  [ 11, 'B' ],
  [ 12, 'C' ],
  [ 13, 'D' ],
  [ 14, 'E' ],
  [ 15, 'F' ],
]);

const fromBase10ToBase16 = (number) => {
  const rest = [];

  while (number > 16) {
    rest.push(number % 16);
    number = Math.floor(number / 16);
  }

  rest.push(number % 16);

  const hex = [];
  for (const item of rest.reverse()) {
    hex.push(map.get(item));
  }

  return hex.join('');
}

// const normalize = (number) => {
//   if (number <= 0) return '00';
//   if (number >= 255) return 'FF';
//   return number;
// }

// const rgb = (r, g, b) => {
//   const hexR = normalize(r).toString(16).padStart(2, 0).toUpperCase();
//   const hexG = normalize(g).toString(16).padStart(2, 0).toUpperCase();
//   const hexB = normalize(b).toString(16).padStart(2, 0).toUpperCase();

//   return `${hexR}${hexG}${hexB}`
// };

const toHex = (number) => {
  const normalizedNumber = Math.max(Math.min(number, 255), 0);
  return normalizedNumber.toString(16).padStart(2, 0).toUpperCase();
}

const rgb = (r, g, b) => {
  const hexR = toHex(r);
  const hexG = toHex(g);
  const hexB = toHex(b);

  return `${hexR}${hexG}${hexB}`
};

console.log(rgb(-10, 300, 47)); // 00FF2F
