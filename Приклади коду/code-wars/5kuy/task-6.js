const createLettersMap = () => {
  const input = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const output = 'nopqrstuvwxyzabcdefghijklmNOPQRSTUVWXYZABCDEFGHIJKLM';

  const result = new Map();
  for (let index = 0; index < input.length; index++) {
    result.set(input[index], output[index]);
  }

  return result;
}

const rot13 = (message) => {
  const map = createLettersMap();
  let newMessage = '';

  for (let index = 0; index < message.length; index++) {
    const currentLetter = message[index];
    const newLetter = map.get(currentLetter);
    
    if (!newLetter) {
      newMessage += currentLetter;
      continue;
    }

    newMessage += newLetter;
  }

  return newMessage;
};

// const rot13 = (message) => {
//   const input = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
//   const output = 'nopqrstuvwxyzabcdefghijklmNOPQRSTUVWXYZABCDEFGHIJKLM';

//   return message.replace(/[a-z]/gi, c => output[input.indexOf(c)]);
// }

console.log(rot13('abcdefghijklmnopqrstuvwxyz')); // grfg