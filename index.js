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

const MINIMUM_TIMEOUT = 5000;

class MyCache {
  constructor(size) {
    this.size = size;
    this._map = new Map();
  }

  get(key) {
    return this._map.get(key);
  }

  set(key, value) {
    if (this._map.size === this.size) {
      this.delete(this.#getFirst());
    }

    this._map.set(key, value);
  }

  delete(key) {
    this._map.delete(key);
  }

  #getFirst() {
    return this._map.keys().next().value;
  }
}

// 0	Cannot read property 'score' of undefined x2
// 0	TypeError: 'undefined' is not an object x3
// 14	Uncaught RangeError: Maximum call stack size exceeded
// 15	Cannot read property 'score' of undefined
// 18	ReferenceError: event is not defined x2
// 21	Cannot read property 'score' of undefined

const getLogger = () => {
  const cache = new MyCache(100);

  const logger = (errors) => {
    for (const currentError of errors) {
      const cachedLogs = cache.get(currentError.message);
      const error = { ...currentError, count: 1, prefix: currentError.timestamp };

      if (cachedLogs) {
        const prevError = cachedLogs[cachedLogs.length - 1];

        if (currentError.timestamp - prevError.timestamp > 5) {
          cachedLogs.push(error);
        } else {
          prevError.timestamp = currentError.timestamp;
          prevError.count = prevError.count + 1;
        }
      } else {
        cache.set(currentError.message, [error]);
      }
    };

    const result = [];
  
    for (const currentError of errors) {
      const cachedLogs = cache.get(currentError.message);

      const foundLog = cachedLogs.find((cachedError) => {
        return cachedError.prefix === currentError.timestamp;
      });

      if (foundLog) {
        const { message, count, prefix } = foundLog;

        const item = count > 1
          ? `${prefix} ${message} x${count}`
          : `${prefix} ${message}`;

        result.push(item)
      }
    }

    return result;
  };

  return logger;
};

const errors = [
  {
    "message": "Cannot read property 'score' of undefined",
    "timestamp": 0,
  },
  {
    "message": "TypeError: 'undefined' is not an object",
    "timestamp": 0,
  },
  {
    "message": "Cannot read property 'score' of undefined",
    "timestamp": 3,
  },
  {
    "message": "TypeError: 'undefined' is not an object",
    "timestamp": 5,
  },
  {
    "message": "TypeError: 'undefined' is not an object",
    "timestamp": 10,
  },
  {
    "message": "Uncaught RangeError: Maximum call stack size exceeded",
    "timestamp": 14,
  },
  {
    "message": "Cannot read property 'score' of undefined",
    "timestamp": 15,
  },
  {
    "message": "ReferenceError: event is not defined",
    "timestamp": 18,
  },
  {
    "message": "Cannot read property 'score' of undefined",
    "timestamp": 21,
  },
  {
    "message": "ReferenceError: event is not defined",
    "timestamp": 22,
  },
];
const logger = getLogger();
console.log(logger(errors));
