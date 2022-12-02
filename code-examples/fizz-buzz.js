const range = (start, end) => {
  const length = end - start + 1;
  return Array.from({ length }, (_current, index) => index + start);
};

const fizzBuzz = (start, end) => {
  return range(start, end).map((number) => {
    if (number % 15 === 0) return 'FizzBuzz';
    if (number % 5 === 0) return 'Buzz';
    if (number % 3 === 0) return 'Fizz';
    return number;
  });
}