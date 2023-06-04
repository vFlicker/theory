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


const random = (min, max) => {
  // Інтервал, в якому можуть бути наші числа
  const interval = max - min;

  // Пошук випадкового числа починатиметься не з нуля, а з min
  const shift = min;

  return Math.round(Math.random() * interval + shift);
};

// Так як у підрозбиттях після рекурсивного виклику сортування
// ми будемо працювати не з цілим масивом а його частинами,
// відразу зробимо додаткові параметри для їх визначення
const partition = (array, left, right) => {
  // Знаходимо значення, навколо якого розміщуватимемо елементи
  const { leaguePoints: pivot } = array[random(left, right)];

  // будемо сходитися з країв у центр, доки не переглянемо
  // всі елементи
  while (left < right) {
      // Поки зліва зустрічаються лише числа менше поворотного
      while (array[left].leaguePoints < pivot) {
          // рухаємо лівий покажчик праворуч,
          // адже з цими числами нічого робити не треба
          left++;
      }

      // Поки справа зустрічаються тільки числа більше поворотного
      while (array[right].leaguePoints > pivot) {
          // рухаємо правий покажчик вліво,
          // адже з цими числами нічого робити не треба
          right--;
      }

      // Як тільки обидва вказівники вказують на елементи,
      // які мають бути в протилежних частинах,
      // і ми все ще не зійшлися до центру
      if (left <= right) {
          // міняємо їх місцями і не забуваємо рухати обидва вказівники,
          // тому що тепер обидва числа на своєму місці
          [array[left], array[right]] = [array[right], array[left]];
          left++;
          right--;
      }
  }

  // Повертаємо місце, де виявився елемент,
  // що дорівнює нашій точці повороту
  return left;
};

// Просте сортування, яке може працювати тільки з масивами з трьох
// і менш елементів, яка через ліміт на вхідні дані працює за O(1)
const sortThree = (array) => {
  // Якщо масив порожній, його і повернемо
  if (!array.length) {
    return array;
  }

  // Інакше покладемо перший елемент у відсортований масив
  const sorted = [array[0]];

  // Якщо у масиві є друге число, то вставимо його у потрібне місце
  // у нашому відсортованому
  if (array[1]) {
    if (array[1].leaguePoints > array[0].leaguePoints) {
      sorted.push(array[1]);
    } else {
      sorted.unshift(array[1]);
    }
  }

  // Якщо масиві є і третє число, то також вставимо і його
  if (array[2]) {
    // Або на початок, якщо він менший за початок відсортованого масиву
    if (array[2].leaguePoints < sorted[0].leaguePoints) {
      sorted.unshift(array[2]);
    // Або в кінці, якщо він більше початку відсортованого масиву
    } else if (array[2].leaguePoints > sorted[1].leaguePoints) {
      sorted.push(array[2]);
    // Або в середину в іншому випадку
    } else {
      sorted.splice(1, 0, array[2]);
    }
  }

  return sorted.reverse();
}

const topThree = (data) => {
  if (data.length <= 3) {
    return sortThree(data);
  }

  // Ми дуже хочемо, щоб наша точка повороту виявилася
  // рівно на початку трійці, яку нам потрібно повернути,
  // щоб не сортувати зайвих підмасивів
  const desiredPivot = data.length - 3;

  // Будемо зберігати останню точку повороту, яку нам дав поділ
  let pivot = partition(data, 0, data.length - 1);

  // Ще збережемо мінімальну точку повороту, починаючи з якої
  // нам буде нецікаво, що відбувається ліворуч — нам все-таки треба
  // відсортувати лише праву частину масиву. При тому,
  // якщо ми відразу перескочили потрібну нам точку повороту,
  // то нам таки доведеться подивитися на ліві елементи.
  let minimalPivot = pivot > desiredPivot ? 0 : pivot;

  // Поки точка повороту не в тому місці, яке нам необхідно,
  // намагаємось зрушити її туди.
  while (pivot !== desiredPivot) {
    // Якщо ми правіше, ніж потрібно, значить треба зрушити ліворуч
    if (pivot > desiredPivot) {
      // Ми знаємо, з якого елемента нам сортування нецікаве,
      // тому там сортувати і не будемо
      pivot = partition(data, minimalPivot, pivot);
    // А інакше рухаємося вправо
    } else {
      pivot = partition(data, minimalPivot, data.length - 1);
    }

    // Обновимо мінімально цікавий нам підмасив
    // за аналогією з його ініціалізацією
    minimalPivot = pivot > desiredPivot ? minimalPivot : pivot;
  }

  return sortThree(data.slice(-3));
}

const data = [
  {
    "login": "DreamLess",
    "leaguePoints": 956
  },
  {
    "login": "cavernous",
    "leaguePoints": 1056
  },
  {
    "login": "SaiyanBroadway",
    "leaguePoints": 1432
  },
  {
    "login": "BlondiePlanet",
    "leaguePoints": 1045
  },
  {
    "login": "Mountaintrid",
    "leaguePoints": 1130
  },
  {
    "login": "cathead",
    "leaguePoints": 930
  },
  {
    "login": "rstrazir",
    "leaguePoints": 356
  },
  {
    "login": "stypeano",
    "leaguePoints": 4
  },
  {
    "login": "CzarStories",
    "leaguePoints": 568
  },
  {
    "login": "ConspiracyLil",
    "leaguePoints": 18
  },
  {
    "login": "GottaSaiyan",
    "leaguePoints": 931
  },
  {
    "login": "Goldenelox",
    "leaguePoints": 932
  },
  {
    "login": "Breakingbing",
    "leaguePoints": 64
  },
  {
    "login": "Rectionom",
    "leaguePoints": 42
  },
  {
    "login": "BoostScooby",
    "leaguePoints": 1476
  },
  {
    "login": "JoshChase",
    "leaguePoints": 931
  },
]
console.log(topThree(data, 3)); // 1476, 1432, 1130
