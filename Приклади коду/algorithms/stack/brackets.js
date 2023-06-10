// const validate = (_string) => {
//   const string = _string.trim();
//   let parenthesisCount = 0;

//   for (const character of string) {
//     if (character === '(') parenthesisCount++;

//     if (character === ')') {
//       if (parenthesisCount === 0) return false;
//       parenthesisCount--;
//     }
//   }

//   return parenthesisCount === 0;
// };

// const validate = (_string) => {
//   const bracket = {
//     '(': ')',
//     '{': '}',
//     '[': ']',
//   }

//   const string = _string.trim();
//   const stringLength = string.length;

//   if (stringLength % 2 !== 0) return false;

//   for (let index = 0; index < stringLength / 2; index++) {
//     const leftElement = string[index];
//     const rightElement = string[stringLength - 1 - index];
    
//     if (bracket[leftElement] !== rightElement) return false;
//   }

//   return true;
// };

const validate = (_string) => {
  const string = _string.trim();

  const bracket = {
    '(': ')',
    '{': '}',
    '[': ']',
  }

  const openBrackets = new Set(Object.keys(bracket));
  const closeBrackets = new Set(Object.values(bracket));

  const stack = [];

  for (const character of string) {
    if (openBrackets.has(character)) stack.push(character);

    if (closeBrackets.has(character)) {
      const open = stack.pop();
      if (bracket[open] !== character) return false;
    }
  }

  return stack.length === 0;
};
