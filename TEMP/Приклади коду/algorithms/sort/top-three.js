/*
  Напишіть функцію, яка з несортованого списку рахунків
  гравців віддає топ-3 найкращих, не вдаючись
  до повного сортування.
*/

const random = (min, max) => {
  const interval = max - min; // Інтервал, в якому можуть бути наші числа
  const shift = min; // Пошук випадкового числа починатиметься не з нуля, а з min

  return Math.round(Math.random() * interval + shift);
};

// Так як у підрозбиттях після рекурсивного виклику сортування
// ми будемо працювати не з цілим масивом а його частинами,
// відразу зробимо додаткові параметри для їх визначення
const partition = (array, left, right) => {
  // Знаходимо значення, навколо якого розміщуватимемо елементи
  const { leaguePoints: pivot } = array[random(left, right)];

  // Будемо сходитися з країв у центр, доки не переглянемо
  // всі елементи
  while (left < right) {
    // Поки зліва зустрічаються лише числа менше поворотного
    while (array[left].leaguePoints < pivot) {
      // Рухаємо лівий покажчик праворуч,
      // адже з цими числами нічого робити не треба
      left++;
    }

    // Поки справа зустрічаються тільки числа більше поворотного
    while (array[right].leaguePoints > pivot) {
      // Рухаємо правий покажчик вліво,
      // адже з цими числами нічого робити не треба
      right--;
    }

    // Як тільки обидва вказівники вказують на елементи,
    // які мають бути в протилежних частинах,
    // і ми все ще не зійшлися до центру
    if (left <= right) {
      // Міняємо їх місцями і не забуваємо рухати обидва вказівники,
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
  if (!array.length) return array; // Якщо масив порожній, його і повернемо

  const sorted = [array[0]]; // Інакше покладемо перший елемент у відсортований масив

  // Якщо у масиві є друге число, то вставимо його у потрібне місце
  // у нашому відсортованому
  if (array[1]) {
    array[1].leaguePoints > array[0].leaguePoints
      ? sorted.push(array[1])
      : sorted.unshift(array[1]);
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
};

/**
 * Складність за часом — `О(n * log(n))`
 * Складність за пам'яттю — `О(log n)`
 */
const topThree = (data) => {
  if (data.length <= 3) return sortThree(data);

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
};

const data = [
  {
    login: "DreamLess",
    leaguePoints: 956,
  },
  {
    login: "cavernous",
    leaguePoints: 1056,
  },
  {
    login: "SaiyanBroadway",
    leaguePoints: 1432,
  },
  {
    login: "BlondiePlanet",
    leaguePoints: 1045,
  },
  {
    login: "Mountaintrid",
    leaguePoints: 1130,
  },
  {
    login: "cathead",
    leaguePoints: 930,
  },
  {
    login: "rstrazir",
    leaguePoints: 356,
  },
  {
    login: "stypeano",
    leaguePoints: 4,
  },
  {
    login: "CzarStories",
    leaguePoints: 568,
  },
  {
    login: "ConspiracyLil",
    leaguePoints: 18,
  },
  {
    login: "GottaSaiyan",
    leaguePoints: 931,
  },
  {
    login: "Goldenelox",
    leaguePoints: 932,
  },
  {
    login: "Breakingbing",
    leaguePoints: 64,
  },
  {
    login: "Rectionom",
    leaguePoints: 42,
  },
  {
    login: "BoostScooby",
    leaguePoints: 1476,
  },
  {
    login: "JoshChase",
    leaguePoints: 931,
  },
];

console.log(topThree(data, 3)); // 1476, 1432, 1130
