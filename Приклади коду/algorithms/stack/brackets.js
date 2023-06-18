/*
  Провалідувати, що це дужки коректно розставлені.
*/

/**
 * За часом — `О(n)`
 * За пам'яттю — `О(n)`
 */
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
