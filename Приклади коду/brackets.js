const validate = (_string) => {
  const bracket = {
    '(': ')',
    '{': '}',
    '[': ']',
  }

  const string = _string.trim();
  const stringLength = string.length;

  if (stringLength % 2 !== 0) return false;

  for (let index = 0; index < stringLength / 2; index++) {
    const leftElement = string[index];
    const rightElement = string[stringLength - 1 - index];
    
    if (bracket[leftElement] !== rightElement) return false;
  }

  return true;
};

console.log(validate('([{}])'));