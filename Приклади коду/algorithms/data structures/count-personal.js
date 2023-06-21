/*
  Отримати максимальну кількість співробітників,
  що одночасно перебувають в офісі.
*/

/**
 * Складність за часом — `О(n * log(n))`
 * Складність за пам'яттю — `О(n)`
 */
const countPersonal = (input) => {
  const entries = [];
  let max = 0;
  let count = 0;

  for (const [startTime, endTime] of input) {
    entries.push({
      time: startTime,
      isEntered: true,
    });

    entries.push({
      time: endTime,
      isEntered: false,
    });
  }

  entries.sort((first, second) => {
    if (first.time === second.time) {
      return first.isEntered ? 1 : -1;
    }

    return first.time - second.time;
  });

  for (const { isEntered } of entries) {
    isEntered ? count += 1 : count -=1;
    max = Math.max(max, count);
  }

  return max;
}

console.log(countPersonalGood([])) // 0
console.log(countPersonalGood([[1, 2], [1, 10], [4, 9], [5, 6], [8, 16], [8, 15]])) // 4
