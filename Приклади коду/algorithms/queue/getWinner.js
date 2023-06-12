const randomStep = (min, max) => Math.round(Math.random() * (max - min) + min);

const getWinner = (logins) => {
  const eliminated = [];
  let index = 0;

  while (logins.length !== 1) {
    const step = randomStep(1, 3);
    const start = (index + step) % logins.length;

    const login = logins.splice(start, 1)[0];

    eliminated.push({ login, step });

    index = start;
  }

  return eliminated;
};

const getWinnerQueue = (logins) => {
  const step = randomStep(1, 3);
  const eliminated = [];

  while (logins.length !== 1) {
    let remove = step;

    while (remove) {
      const first = logins.shift();

      logins.push(first);

      remove--;
    }

    const login = logins.shift();

    eliminated.push({ login, step })
  }

  return eliminated;
};

const input = ['GottaSaiyan', 'Mountaintrid', 'Rectionom', 'JoshChase', 'DreamLess', 'BlondiePlanet', 'Breakingbing', 'Goldenelox'];

console.log(getWinner(input));
console.log(getWinnerQueue(input));
