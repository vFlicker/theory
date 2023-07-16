/*
  Якщо (n = 5, m = 4).
  Маємо: [
    0 0 0 0 1
    0 0 0 0 0
    0 0 0 0 0
    1 0 0 0 0
  ].
*/
const getPaths = (n, m) => {
  // Якщо вихід знаходиться зліва або справа від початку
  // значить способів добратися до нього немає
  if (n <= 0 || m <= 0) return 0;

  // Якщо вихід знаходиться тем де і вхід
  if (n === 1 && m === 1) return 1;


  const paths = getPaths(n - 1, m) + getPaths(n, m - 1);
  return paths;
};

console.log(getPaths(5, 4));
