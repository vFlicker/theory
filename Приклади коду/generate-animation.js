const generateAnimation = (string) => {
  const stack = [];
  const animation = [];

  for (const character of string) {
    if (character === '#') {
      stack.pop();
    } else {
      stack.push(character);
    }

    animation.push(`${stack.join('')}`)
  }

  return animation;
};

console.log(generateAnimation('vlaf#d')); // ['v', 'vl', 'vla', 'vlaf', 'vla', 'vlad'];
