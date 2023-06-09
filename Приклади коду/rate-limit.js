/**
 * Я використовую два рази цикл, до того ж у другому циклі,
 * я використовую метод find, який ітерується по
 * масиву з помилками для певного повідомлення.
 */
const myLogger = (logs) => {
  const encountered = new Map();
  const rateLimited = [];

  for (const currentLog of logs) {
    const cachedLogs = encountered.get(currentLog.message);
    const error = { ...currentLog, count: 1, prefix: currentLog.timestamp };

    if (cachedLogs) {
      const prevError = cachedLogs[cachedLogs.length - 1];

      if (currentLog.timestamp - prevError.timestamp > 5) {
        cachedLogs.push(error);
      } else {
        prevError.timestamp = currentLog.timestamp;
        prevError.count = prevError.count + 1;
      }
    } else {
      encountered.set(currentLog.message, [error]);
    }
  };


  for (const currentError of logs) {
    const cachedLogs = encountered.get(currentError.message);

    const foundLog = cachedLogs.find((cachedError) => {
      return cachedError.prefix === currentError.timestamp;
    });

    if (foundLog) {
      const { message, count, prefix } = foundLog;

      const item = count > 1
        ? `${prefix} ${message} x${count}`
        : `${prefix} ${message}`;

      rateLimited.push(item)
    }
  }

  return rateLimited;
};

/**
 * 0	Cannot read property 'score' of undefined x2
 * 0	TypeError: 'undefined' is not an object x3
 * 14	Uncaught RangeError: Maximum call stack size exceeded
 * 15	Cannot read property 'score' of undefined
 * 18	ReferenceError: event is not defined x2
 * 21	Cannot read property 'score' of undefined
 */
 const rateLimit = (logs) => {
  const encountered = new Map();
  const rateLimited = [];

  for (const currentLog of logs) {
    const prevLog = encountered.get(currentLog.message);

    if (!prevLog || prevLog.timestamp < currentLog.timestamp - 5) {
      encountered.set(currentLog.message, {
        timestamp: currentLog.timestamp,
        count: 1,
        index: rateLimited.length,
      });

      rateLimited.push(currentLog);
    } else {
      const count = prevLog.count + 1;

      encountered.set(currentLog.message, {
        timestamp: currentLog.timestamp,
        count,
        index: prevLog.index,
      });

      rateLimited[prevLog.index].message = `${currentLog.message} x${count}`;
    }
  };

  return rateLimited;
};
const logs = [
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
console.log(myLogger(logs));
console.log(rateLimit(logs));