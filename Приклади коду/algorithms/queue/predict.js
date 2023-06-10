const badImplementationPredict = (queue, slots) => {
  const total = queue.reduce((acc, item) => acc + item, 0);
  let hours = 0;

  while (hours <= total) {
    for (let index = 0; index < slots; index++) {
      queue[index] -= 1;
    }

    queue = queue.filter((item) => item !== 0);

    hours += 1;

    if (queue.length < slots) return hours;
  }

  return total;
};

const goodImplementationPredict = (queue, slots) => {
  const cards = Array(slots).fill(0);

  while (queue.length) {
    const current = queue.shift();

    const min = Math.min(...cards);
    const minIndex = cards.indexOf(min);

    cards[minIndex] += current;
  }

  return Math.min(...cards);
};

console.log(predict([1, 2, 3], 1)); // 6
console.log(predict([1, 2, 3], 2)); // 2
console.log(predict([1, 2, 3], 3)); // 1
console.log(predict([3, 2, 3], 3)); // 2
console.log(predict([4, 5, 3, 3], 2)); // 7
