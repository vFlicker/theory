/*
  Провалідувати, що це дужки коректно розставлені.
*/

/**
 * Складність за часом — `О(n)`
 * Складність за пам'яттю — `О(1)`
 */
 const validate = (_string) => {
  const bracket = {
    '(': ')',
    '{': '}',
    '[': ']',
  }

  const string = _string.trim();
  const stringLength = string.length;

  for (let index = 0; index < stringLength / 2; index++) {
    const leftElement = string[index];
    const rightElement = string[stringLength - 1 - index];
    
    if (bracket[leftElement] !== rightElement) return false;
  }

  return true;
};
