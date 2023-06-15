/*
  if (n = 5, m = 4):
  [
    0 0 0 0 1
    0 0 0 0 0
    0 0 0 0 0
    1 0 0 0 0
  ]
*/

const getCachedPaths = () => {
  const map = new Map();
  const getMapKey = (n, m) => `${n}, ${m}`;

  const getPaths = (n, m) => {
    // Якщо вихід знаходиться зліва або справа від початку
    // значить способів добратися до нього немає
    if (n <= 0 || m <= 0) return 0;

    // Якщо вихід знаходиться тем де і вхід
    if (n === 1 && m === 1) return 1;

    const cachedPaths = map.get(getMapKey(n, m));
    if (cachedPaths) return cachedPaths;

    const paths = getPaths(n - 1, m) + getPaths(n, m - 1);
    map.set(getMapKey(n, m), paths);

    return paths;
  };

  return getPaths;
};

const cachedPaths = (n, m) => {
  const arrays = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));

  const helper = (n, m, arrays) => {
    if (n <= 0 || m <= 0) return 0;
    if (n === 1 && m === 1) return 1;
  
    if (arrays[n][m] !== 0) return arrays[n][m];
  
    arrays[n][m] = helper(n - 1, m, arrays) + helper(n, m - 1, arrays);
  
    return arrays[n][m];
  };

  return helper(n, m, arrays);
};

console.log(getCachedPaths()(4, 5)); // 35
console.log(cachedPaths(4, 5)); // 35
