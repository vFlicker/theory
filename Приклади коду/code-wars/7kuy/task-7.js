// const generateHashtag = (str) => {
//   const words = str.trim().split('   ').join('').split(' ');

//   let fusionWord = '';
//   for (const word of words) {
//     if (word === '') continue;
//     fusionWord += `${word[0].toUpperCase()}${word.slice(1)}`;
//   }

//   if (fusionWord === '') return false;

//   const hashTeg = `#${fusionWord}`;

//   if (hashTeg.length > 140) return false;

//   return hashTeg;
// }

const generateHashtag = (str) => {
  const words = str.split(' ');

  let fusionWord = '';
  for (const word of words) {
    if (word === '') continue;
    fusionWord += `${word[0].toUpperCase()}${word.slice(1)}`;
  }

  if (fusionWord === '') return false;

  const hashTeg = `#${fusionWord}`;

  if (hashTeg.length > 140) return false;

  return hashTeg;
}

console.log(generateHashtag(" Hello there thanks for trying my Kata")); // "#HelloThereThanksForTryingMyKata"
console.log(generateHashtag("    Hello     World   ")); // "#HelloWorld"
console.log(generateHashtag("code" + " ".repeat(140) + "wars")); // "#Codewars"
console.log(generateHashtag("")); // false