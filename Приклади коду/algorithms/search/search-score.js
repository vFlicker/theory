/*
  Реалізувати функцію для пошуку за таблицею лідерів,
  яка на вхід приймає кількість очок та безпосередньо таблицю,
  а повертає об'єкт: { "league": 1, "placement": 1}.
*/

/**
 * За часом — `О(log(n)`
 * За пам'яттю — `О(1)`
 */
 const searchLeagueByScore = (leaderBoard, leaguePoints) => {
  let left = 0;
  let right = leaderBoard.length - 1;

  const firstPlacePoints = leaderBoard[right][leaderBoard[right].length - 1].leaguePoints;
  const lastPlacePoints = leaderBoard[0][0].leaguePoints;

  // Якщо кількість очок взагалі не входить до проміжків
  // у таблиці (менше мінімального або більше максимального)
  if (lastPlacePoints > leaguePoints || firstPlacePoints < leaguePoints) {
    return null; // значить такої ліги точно немає
  }

  // Поки кінці проміжку, в якому ми шукаємо, не зійшлися
  while (left <= right) {
    const middleIndex = Math.floor((right + left) / 2);
    const middle = leaderBoard[middleIndex];

    const firstPlayerPoints = middle[middle.length - 1].leaguePoints;
    const lastPlayerPoints = middle[0].leaguePoints;

    // Якщо очки входять у лігу посередині, то це те, що ми шукаємо
    if (lastPlayerPoints <= leaguePoints && leaguePoints <= firstPlayerPoints) {
      return middleIndex;
    }

    // Якщо очок для цієї ліги надто мало
    if (lastPlayerPoints > leaguePoints) {
      // Рухається правий край нашого пошуку до середини
      // (шукаємо від початку до поточної середини)
      right = middleIndex - 1;
    // Якщо очок для цієї ліги надто багато
    } else if (leaguePoints > firstPlayerPoints) {
      // Шукаємо праворуч
      left = middleIndex + 1;
    }
  }

  // Якщо краї таки зійшлися, значить, такої ліги немає
  return null;
}

/**
 * За часом — `О(log(m)`
 * За пам'яттю — `О(1)`
 */
const searchInLeague = (league, leaguePoints) => {
  let left = 0;
  let right = league.length - 1;

  while (left <= right) {
    const middleIndex = Math.floor((right + left) / 2);
    const { leaguePoints: middleLeaguePoints } = league[middleIndex];

    if (middleLeaguePoints === leaguePoints) return middleIndex;

    if (middleLeaguePoints > leaguePoints) {
      right = middleIndex - 1;
    } else if (leaguePoints > middleLeaguePoints) {
      left = middleIndex + 1;
    }
  }

  return null;
};

/**
 * За часом — `О(log(n + m))`
 * За пам'яттю — `О(1)`
 */
const searchScore = (leaderBoard, leaguePoints) => {
  const leagueIndex = searchLeagueByScore(leaderBoard, leaguePoints);

  if (leagueIndex === null) return null;

  const placementIndex = searchInLeague(leaderBoard[leagueIndex], leaguePoints);

  if (placementIndex === null) return null;

  const league = leagueIndex + 1;
  const placement = leaderBoard[leagueIndex].length - placementIndex;

  return { league, placement };
}

const log = (points, placement) => {
  if (!placement) {
    console.log(`You are the only player with ${points}`);
  } else {
    console.log(`Your score is ${points}. You will most likely be placed in the league ${placement.league} and place ${placement.placement} there`);
  }
}

const data = [
  [
    {
      "login": "stypeano",
      "leaguePoints": 4
    },
    {
      "login": "rstrazir",
      "leaguePoints": 45
    },
    {
      "login": "cathead",
      "leaguePoints": 143
    },
    {
      "login": "cavernous",
      "leaguePoints": 324
    }
  ],
  [
    {
      "login": "ConspiracyLil",
      "leaguePoints": 356
    },
    {
      "login": "CzarStories",
      "leaguePoints": 568
    },
    {
      "login": "GottaSaiyan",
      "leaguePoints": 598
    },
    {
      "login": "Mountaintrid",
      "leaguePoints": 785
    }
  ],
  [
    {
      "login": "Rectionom",
      "leaguePoints": 930
    },
    {
      "login": "JoshChase",
      "leaguePoints": 931
    },
    {
      "login": "DreamLess",
      "leaguePoints": 956
    },
    {
      "login": "BlondiePlanet",
      "leaguePoints": 1045
    }
  ],
  [
    {
      "login": "Breakingbing",
      "leaguePoints": 1056
    },
    {
      "login": "Goldenelox",
      "leaguePoints": 1130
    },
    {
      "login": "SaiyanBroadway",
      "leaguePoints": 1432
    },
    {
      "login": "BoostScooby",
      "leaguePoints": 1476
    }
  ]
]

log(4, searchScore(data, 4));
log(14, searchScore(data, 14));
