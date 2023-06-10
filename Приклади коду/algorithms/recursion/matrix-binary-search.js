/*
  // top: 0, left: 0, bottom: 3, right: 3
  [
    [ 4, 356,  930, 1056]
    [18, 568,  931, 1130]
    [42, 931,  956, 1045]
    [64, 932, 1432, 1476]
  ]

  // top: 2, left: 0, bottom: 3, right: 1
  const topRightCoords = [
    [930, 1056]
    [931, 1130]
  ]

  // top: 0, left: 2, bottom: 1, right: 3
  const bottomLeftCoords = [
    [42, 931]
    [64, 932]
  ]

  // top: 2, left: 2, bottom: 3, right: 3
  const bottomRightCoords = [
    [ 956, 1045]
    [1432, 1476]
  ]

  // top: 0, left: 0, bottom: 1, right: 1
  const topLeftCoords = [
    [ 3, 356]
    [18, 568]
  ]
*/
const searchSubtask = (leaderBoard, leaguePoints, coords) => {
  const { topBorder, leftBorder, bottomBorder, rightBorder } = coords;

  // Якщо межі зійшлися - нічого не знайшлося
  if (leftBorder > rightBorder || topBorder > bottomBorder) {
    return null;
  }

  // Якщо межі зійшлися до єдиного елементу, то перевіряємо, чи він підходить нам
  if (leftBorder === rightBorder && topBorder === bottomBorder) {
    const candidate = leaderBoard[topBorder][leftBorder];

    if (candidate.leaguePoints === leaguePoints) {
      return {
        guild: candidate.guild,
        placement: leaderBoard[topBorder].length - leftBorder,
      };
    }

    return null;
  }

  const middleY = Math.floor((topBorder + bottomBorder) / 2);
  const middleX = Math.floor((leftBorder + rightBorder) / 2);
  const candidate = leaderBoard[middleY][middleX];
  const { leaguePoints: candidateLeaguePoints } = candidate;

  const topRightCoords = {
    topBorder,
    leftBorder: middleX + 1,
    bottomBorder: middleY,
    rightBorder,
  };

  const bottomLeftCoords = {
    topBorder: middleY + 1,
    leftBorder,
    bottomBorder,
    rightBorder: middleX,
  };

  const bottomRightCoords = {
    topBorder: middleY + 1,
    leftBorder: middleX + 1,
    bottomBorder,
    rightBorder,
  };

  const topLeftCoords = {
    topBorder,
    leftBorder,
    bottomBorder: middleY,
    rightBorder: middleX,
  }

  // Якщо нам потрібно знайти частини, де кількість очок більша, ніж посередині
  if (candidateLeaguePoints < leaguePoints) {
    return searchSubtask(leaderBoard, leaguePoints, topRightCoords)
      || searchSubtask(leaderBoard, leaguePoints, bottomLeftCoords)
      || searchSubtask(leaderBoard, leaguePoints, bottomRightCoords);
  }

  // якщо менше
  return searchSubtask(leaderBoard, leaguePoints, topRightCoords)
    ||searchSubtask(leaderBoard, leaguePoints, bottomLeftCoords)
    || searchSubtask(leaderBoard, leaguePoints, topLeftCoords);
}

const searchScore = (leaderBoard, leaguePoints) => {
  // Якщо матриця порожня, повертаємо null
  if (!(leaderBoard.length && leaderBoard[0].length)) {
    return null;
  }

  const bottomBorder = leaderBoard.length - 1;
  const rightBorder = leaderBoard[0].length - 1;

  // Початкові координати coords, які охоплюють всю матрицю.
  const coords = {
    topBorder: 0,
    leftBorder: 0,
    bottomBorder,
    rightBorder,
  }

  return searchSubtask(leaderBoard, leaguePoints, coords);
}

const data = [
  [
    {
      "login": "stypeano",
      "leaguePoints": 4,
      "guild": "seabass"
    },
    {
      "login": "rstrazir",
      "leaguePoints": 356,
      "guild": "seabass"
    },
    {
      "login": "cathead",
      "leaguePoints": 930,
      "guild": "seabass"
    },
    {
      "login": "cavernous",
      "leaguePoints": 1056,
      "guild": "seabass"
    }
  ],
  [
    {
      "login": "ConspiracyLil",
      "leaguePoints": 18,
      "guild": "goldfish"
    },
    {
      "login": "CzarStories",
      "leaguePoints": 568,
      "guild": "goldfish"
    },
    {
      "login": "GottaSaiyan",
      "leaguePoints": 931,
      "guild": "goldfish"
    },
    {
      "login": "Mountaintrid",
      "leaguePoints": 1130,
      "guild": "goldfish"
    }
  ],
  [
    {
      "login": "Rectionom",
      "leaguePoints": 42,
      "guild": "catfish"
    },
    {
      "login": "JoshChase",
      "leaguePoints": 931,
      "guild": "catfish"
    },
    {
      "login": "DreamLess",
      "leaguePoints": 956,
      "guild": "catfish"
    },
    {
      "login": "BlondiePlanet",
      "leaguePoints": 1045,
      "guild": "catfish"
    }
  ],
  [
    {
      "login": "Breakingbing",
      "leaguePoints": 64,
      "guild": "bream"
    },
    {
      "login": "Goldenelox",
      "leaguePoints": 932,
      "guild": "bream"
    },
    {
      "login": "SaiyanBroadway",
      "leaguePoints": 1432,
      "guild": "bream"
    },
    {
      "login": "BoostScooby",
      "leaguePoints": 1476,
      "guild": "bream"
    }
  ]
];
console.log(searchScore(data, 4)); // { "guild": "seabass", "placement": 4 }
console.log(searchScore(data, 14)); // null
console.log(searchScore(data, 568)); // { "guild": "goldfish", "placement": 3 }
console.log(searchScore(data, 1476)); // { "guild": "bream", "placement": 1 }

