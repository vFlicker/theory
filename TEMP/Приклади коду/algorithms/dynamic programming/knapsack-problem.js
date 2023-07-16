const getBestParts1 = (filePartSizes, chunkSize) => {
  // Створюємо таблицю
  const table = Array.from({ length: filePartSizes.length }, () => {
    return Array.from({ length: chunkSize }, () => 0);
  });

  // Заповнюємо кожний рядок послідовно
  for (let rowIndex = 0; rowIndex < filePartSizes.length; rowIndex++) {
    for (let cellIndex = 0; cellIndex < chunkSize; cellIndex++) {
      // Чанки починаються з 1 МБ, а не з 0, тому додаємо 1
      const currentChunkSize = cellIndex + 1;
      const currentFilePartSize = filePartSizes[rowIndex];

      const prevValue = table[rowIndex - 1] && table[rowIndex - 1][cellIndex];

      // Рахуємо максимальну кількість місця, яку ми можемо зайняти частинами поточного розміру
      const maximumCurrent = Math.floor(currentChunkSize / currentFilePartSize) * currentFilePartSize;
      // Максимальна кількість даних, яку ми можемо покласти в кількість місця, що залишилася.
      // Беремо максимум рішення попередньої підзадачі для місця, що залишилося, якщо воно є, або 0
      const maximumRest = table[rowIndex - 1] && table[rowIndex - 1][cellIndex - maximumCurrent] || 0;
      const byFormula = maximumCurrent + maximumRest;

      table[rowIndex][cellIndex] = rowIndex > 0
        ? Math.max(prevValue, byFormula)
        : byFormula;
    }
  }

  return table[filePartSizes.length - 1][chunkSize - 1];
};

const getBestParts2 = (filePartSizes, chunkSize) => {
  // Будуємо таблицю і закладаємо місце на пусті клітинки
  const table = Array.from({ length: filePartSizes.length + 1 }, () => {
    return Array.from({ length: chunkSize }, () => 0);
  });

  // Для кожного нашого файлу
  for (let rowIndex = 0; rowIndex <= filePartSizes.length; rowIndex++) {
    // Проходимо по всім можливим чанкам
    for (let cellIndex = 0; cellIndex < chunkSize; cellIndex++) {
      // Потрапляємо у пусту клітинку
      if (rowIndex === 0 || cellIndex === 0) continue;

      const prevValue = table[rowIndex - 1][cellIndex];

      // Якщо розмір поточного файлу більше розміру пачки
      if (filePartSizes[rowIndex - 1] > cellIndex) {
        // Візьмемо значення з рядка з гори
        table[rowIndex][cellIndex] = prevValue;
      } else {
        const currentChunkSize = cellIndex + 1;
        const currentFilePartSize = filePartSizes[rowIndex - 1];
        const maximumCurrent = Math.floor(currentChunkSize / currentFilePartSize) * currentFilePartSize;

        // Значення по вертикалі: ряд вгору,
        // Значення по горизонталі: розмір чанку мінус розмір поточного файлу
        const maximumRest = table[rowIndex - 1][cellIndex - maximumCurrent] || 0;
 
        // Розмір поточного файлу плюс розмір файлу з рядка згори
        const byFormula = maximumCurrent + maximumRest;

        table[rowIndex][cellIndex] = Math.max(prevValue, byFormula);
      }
    }
  }

  return table[filePartSizes.length][chunkSize - 1];
};

console.log(getBestParts1([2, 5, 7], 13));
console.log(getBestParts2([2, 5, 7], 13));
