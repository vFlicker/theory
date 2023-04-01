const getIsEven = (integer) => integer % 2 === 0;

// const findOutlier = (integers) => {
//   const [firstInt, secondInt, thirdInt] = integers;

//   /** 
//    * Просто використовуй slice integers.slice(0, 3)
//    * замість цього:
//    */
//   const isFirstIntEven = getIsEven(firstInt);
//   const isSecondIntEven = getIsEven(secondInt);
//   const isThirdIntEven = getIsEven(thirdInt);

//   const isFindEven = [
//     isFirstIntEven,
//     isSecondIntEven,
//     isThirdIntEven
//   ].filter((item) => item === true).length >= 2;

//   for (const integer of integers) {
//     const currentInteger = getIsEven(integer);
//     if (currentInteger !== isFindEven) return integer;
//   }
// };

// const findOutlier = (integers) => {
//   const firstThreeIntegers = integers.slice(0, 3);
//   const isFindEven = firstThreeIntegers.filter((item) => item === true).length >= 2;

//   for (const integer of integers) {
//     if (getIsEven(integer) !== isFindEven) return integer;
//   }
// };

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
