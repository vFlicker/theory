// const Direction = {
//   RIGHT: 'right',
//   DOWN: 'down',
//   LEFT: 'left',
//   UP: 'up',
// };

// const createStepDirection = (stepY, stepX, input) => (y, x, coords, result) => {
//   const findCoord = (x, y) => {
//     const res = coords.find(([foundX, foundY]) => x === foundX && y === foundY);
//     return Boolean(res);
//   };

//   const subArray = input[y + stepY];
//   if (!subArray) return false;

//   const number = subArray[x + stepX];
//   if (!number || findCoord(y + stepY, x + stepX)) return false;

//   coords.push([y + stepY, x + stepX]);
//   result.push(number);

//   return true;
// };

// const snail = (input) => {
//   if (!input[0].length) return [];

//   const coords = [[0, 0]];
//   const result = [input[0][0]];
//   const inputLength = input.flat().length;
//   let currentDirection = Direction.RIGHT;

//   const doRightStep = createStepDirection(0, 1, input);
//   const doDownStep = createStepDirection(1, 0, input);
//   const doLeftStep = createStepDirection(0, -1, input);
//   const doUpStep = createStepDirection(-1, 0, input);

//   while (inputLength !== result.length) {
//     const run = (action, nextDirection) => {
//       const [y, x] = coords[coords.length - 1];
//       const success = action(y, x, coords, result);
//       if (!success) currentDirection = nextDirection;
//     };

//     switch(currentDirection) {
//       case Direction.RIGHT:
//         run(doRightStep, Direction.DOWN);
//         break;
//       case Direction.DOWN:
//         run(doDownStep, Direction.LEFT);
//         break;
//       case Direction.LEFT:
//         run(doLeftStep, Direction.UP);
//         break;
//       case Direction.UP:
//         run(doUpStep, Direction.RIGHT);
//         break;
//     }
//   }

//   return result;
// };

// snail = function(array) {
//   var result;
//   while (array.length) {
//     // Steal the first row.
//     result = (result ? result.concat(array.shift()) : array.shift());
//     // Steal the right items.
//     for (var i = 0; i < array.length; i++)
//       result.push(array[i].pop());
//     // Steal the bottom row.
//     result = result.concat((array.pop() || []).reverse());
//     // Steal the left items.
//     for (var i = array.length - 1; i >= 0; i--)
//       result.push(array[i].shift());
//   }
//   return result;
// }

// function snail(array) {
//   var vector = [];
//   while (array.length) {
//     vector.push(...array.shift());
//     array.map(row => vector.push(row.pop()));
//     array.reverse().map(row => row.reverse());
//   }
//   return vector;
// }

// function snail(array) {
//   const result = [];

//   while (array.length > 0) {
//     // extract the top row
//     result.push(...array.shift());

//     // extract the right column
//     for (let i = 0; i < array.length; i++) {
//       result.push(array[i].pop());
//     }

//     // extract the bottom row (in reverse order)
//     if (array.length > 0) {
//       result.push(...array.pop().reverse());
//     }

//     // extract the left column (in reverse order)
//     for (let i = array.length - 1; i >= 0; i--) {
//       if (array[i].length > 0) {
//         result.push(array[i].shift());
//       }
//     }
//   }

//   return result;
// }



// console.log(snail([
//   [
//     805, 316, 119, 231, 543,
//     374, 982, 773, 495, 509,
//     936, 362, 777, 470, 600,
//     716, 149, 619
//   ],
//   [
//     999, 701, 320, 511, 542,
//      71, 941, 178, 655, 810,
//     239, 221, 325, 445, 223,
//     689, 275, 969
//   ],
//   [
//     859, 520, 121, 378, 365,   9,
//     759, 816, 297, 918, 579,  29,
//      85, 788,  65, 495, 877, 591
//   ],
// ]));

/*
Задача: написать функцию для прохождения типового задания с числами в тесте iq — из списка чисел найти то, которое отличается по чётности от остальных, и вернуть его позицию.

Примеры:
iqTest("2 4 7 8 10") => 3
iqTest("1 2 1 1") => 2
*/
