const benchmark = (callback) => {
  const start = performance.now();

  const result = callback();

  const end = performance.now();

  const time = (end - start) / 1000;

  console.log(`Get ${result} for ${time.toFixed(5)} seconds`);
}
