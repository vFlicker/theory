const getIsEven = (integer) => integer % 2 === 0;

const findOutlier = (integers) => {
  const [firstInt, secondInt, thirdInt] = integers;

  /** 
   * Просто використовуй slice integers.slice(0, 3)
   * замість цього:
   */
  const isFirstIntEven = getIsEven(firstInt);
  const isSecondIntEven = getIsEven(secondInt);
  const isThirdIntEven = getIsEven(thirdInt);

  const isFindEven = [
    isFirstIntEven,
    isSecondIntEven,
    isThirdIntEven
  ].filter((item) => item === true).length >= 2;

  for (const integer of integers) {
    const currentInteger = getIsEven(integer);
    if (currentInteger !== isFindEven) return integer;
  }
};

const findOutlier = (integers) => {
  const firstThreeIntegers = integers.slice(0, 3);
  const isFindEven = firstThreeIntegers.filter((item) => item === true).length >= 2;

  for (const integer of integers) {
    if (getIsEven(integer) !== isFindEven) return integer;
  }
};

const findOutlier = (integers) => {
  let evenCount = 0;
  let evenInteger;
  let oddInteger;

  for (const integer of integers) {
    if (getIsEven(integer)) {
      evenCount += 1;
      evenInteger = integer;
    } else {
      oddInteger = integer;
    }
  }

  return evenCount > 1 ? oddInteger : evenInteger;
};


console.log(findOutlier([2, 4, 0, 100, 4, 11, 2602, 36, 34, 32, 30, 102, 1000, 6, 8, 14])); // 11
console.log(findOutlier([160, 3, 1719, 19, 11, 13, -21])); // 160


const iqTest = (numbers) => {
  const remainders = numbers.split(" ").map(x => x % 2);
  const sum = remainders.reduce((a, b) => a + b);
  const target = sum > 1 ? 0 : 1;

  return remainders.indexOf(target) + 1;
}

const iqTest = (string) => {
  const numbers = string.split(' ');

  let even;
  let odd;
  let eventCount = 0;
  let position = 1;
  
  for (const number of numbers) {
    if (number % 2 === 0) {
      eventCount += 1;
      even = position;
    } else {
      odd = position;
    }

    position += 1;
  }

  return eventCount > 1 ? odd : even;
}

console.log(iqTest("2 4 7 8 10"));
console.log(iqTest("1 2 1 1"));
