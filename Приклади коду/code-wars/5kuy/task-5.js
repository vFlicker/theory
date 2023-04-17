// const bracketsOpen = new Set(['(', '[', '{']);
// const bracketsClose = new Set([')', ']', '}']);

// const isNextCharNumber = (char) => Number(char);

// const isNextCharLower = (char) => {
//   const isNextBigLetter = char.toUpperCase() === char;
//   const isNextCharBracket = bracketsOpen.has(char) || bracketsClose.has(char);

//   return !isNextCharNumber(char) && !isNextBigLetter && !isNextCharBracket;
// };

// const transformData = (string) => {
//   let data = [];

//   let index = 0;
//   while (index < string.length) {
//     const char = string[index];
//     let nextChar = string[index + 1];

//     if (nextChar && isNextCharLower(nextChar)) {
//       const atom = `${char}${nextChar}`;
//       data.push(atom)
//       index += 2;
//       continue;
//     }

//     if (Number(char) && Number(nextChar)) {
//       const koeff = `${char}${nextChar}`;
//       data.push(Number(koeff))
//       index += 2;
//       continue;
//     }
//     if (Number(char)) {
//       data.push(Number(char))
//       index += 1;
//       continue;
//     }

//     data.push(char)

//     index += 1;
//   }

//   return data;
// };

// const parseMolecule = (string) => {
//   const array = transformData(string);
//   const result = [];
//   const longKoeffs = [];
//   let koeff = 1;

//   for (let index = 0; index < array.length - 1; index++) {
//     const char = array[index];
//     if (bracketsOpen.has(char) || bracketsClose.has(char) || Number.isInteger(char)) {
//       continue
//     }

//     const idx = result.findIndex((obj) => {
//       const [key] = Object.keys(obj);
//       return key === char;
//     });

//     if (idx === -1) {
//       result.push({[char]: 0});
//     }
//   }

//   for (let index = array.length - 1; index >= 0; index--) {
//     const char = array[index];
//     const nextChar = array[index - 1];

//     if (Number(char)) {
//       if (bracketsClose.has(nextChar)) {
//         longKoeffs.push(char)
//         continue;
//       } else {
//         koeff = char;
//         continue;
//       }
//     }

//     if (bracketsClose.has(char)) {
//       continue;
//     };

//     if (bracketsOpen.has(char)) {
//       longKoeffs.pop();
//       continue;
//     };

//     let currentCoeff = koeff * longKoeffs.reduce((acc, current) => acc * current, 1);
//     const idx = result.findIndex((obj) => {
//       const [key] = Object.keys(obj);
//       return key === char;
//     });

//     if (idx === -1) {
//       result.push({[char]: currentCoeff});
//     } else {
//       const [prevCoeff] = Object.values(result[idx]);
//       result.splice(idx, 1, {[char]: currentCoeff + prevCoeff})
//     }
 
//     if (koeff !== 1) koeff = 1;
//   }

//   return result.reduce((acc, currentItem) => {
//     const [[key, value]] = Object.entries(currentItem);
//     acc[key] = value;
//     return acc;
//   }, {});
// };

function parseMolecule(formula) {
  const stack = [{}];
  let i = 0;
  
  while (i < formula.length) {
    if (/[A-Z]/.test(formula[i])) {
      // match element symbol
      let element = formula[i];
      i++;
      while (i < formula.length && /[a-z]/.test(formula[i])) {
        element += formula[i];
        i++;
      }
      // match element count
      let count = "";
      while (i < formula.length && /[0-9]/.test(formula[i])) {
        count += formula[i];
        i++;
      }
      count = count === "" ? 1 : parseInt(count);
      // add element count to top of stack
      const top = stack[stack.length - 1];
      top[element] = (top[element] || 0) + count;

      console.log(top);
    } else if (formula[i] === "(" || formula[i] === "[" || formula[i] === "{") {
      // push new object to stack
      stack.push({});
      i++;
    } else if (formula[i] === ")" || formula[i] === "]" || formula[i] === "}") {
      // multiply object on top of stack by index and pop it
      const top = stack.pop();
      let count = "";
      i++;
      while (i < formula.length && /[0-9]/.test(formula[i])) {
        count += formula[i];
        i++;
      }
      count = count === "" ? 1 : parseInt(count);
      const prev = stack[stack.length - 1];
      for (let element in top) {
        prev[element] = (prev[element] || 0) + top[element] * count;
      }
    }
  }
  
  return stack[0];
}

console.log(parseMolecule("H2O")); // { H: 2, O: 1 }
console.log(parseMolecule("Mg(OH)2")); // { Mg: 1, O: 2, H: 2 }
console.log(parseMolecule("K4[ON(SO3)2]2")); // { K: 4, O: 14, N: 2, S: 4 }
console.log(parseMolecule("C6H12O6")); // { C: 6, H12, O: 6}
console.log(parseMolecule("As2{Be4C5[BCo3(CO2)3]2}4Cu5")); // { As: 2, Be: 16, C: 44, B: 8, Co: 24, O: 48, Cu: 5 }
