const countJumps = (stones) => {
  const map = new Map();

  for (let index = 0; index < stones.length; index++) {
    if (index === 0) map.set(index, { steps: 0, jumps: stones[index] });
    else map.set(index, { steps: Infinity, jumps: stones[index] });
  }

  for (let i = 0; i < stones.length - 1; i++) {
    const { steps, jumps } = map.get(i);

    for (let j = i; j < i + jumps; j++) {
      const nextIndex = j + 1;
      const prevItem = map.get(nextIndex);

      if (prevItem) {
        const updatedSteps = Math.min(steps + 1, prevItem.steps);

        map.set(nextIndex, { steps: updatedSteps, jumps: prevItem.jumps  });
      }
    }
  }

  const lastItem = map.get(stones.length - 1);
  return lastItem.steps;
};

console.log(countJumps([2, 3, 3, 1, 4, 1, 1, 5, 6]));
