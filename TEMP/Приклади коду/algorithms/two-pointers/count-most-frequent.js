/*
  Визначити, скільки разів зустрічається найчастіший
  елемент у поєднанні двох відсортованих за зростанням
  масивів. Елементи можуть повторюватись.
*/

const countDuplicates = (array, startPosition) => {
  // Спочатку припустимо, що число зустрічається лише один раз
  let lastPosition = startPosition;

  // Останнє перевірене число — те саме, що й на початку повторень.
  // І ми не пройшли масив повністю
  while (array[startPosition] === array[lastPosition] && lastPosition < array.length) {
      // Посуваємо покажчик на останнє однакове число
      lastPosition++;
  }

  // Як тільки числа перестали збігатися, повернемо довжину відрізка з дублікатами
  return lastPosition - startPosition;
};

/**
 * Складність за часом — `О(n + m)`
 * Складність за пам'яттю — `О(1)`
 * 
 * Якщо будемо використовувати мапу для зберігання
 * елементів і збільшувати значення для відповідного
 * елементу, коли отримаємо його знову, складність
 * за пам'яттю зросте до `О(n)`
 */
const countMostFrequent = (firstArray, secondArray) => {
  let result = 0;
  // Зберігаємо покажчики на поточні елементи в масиві
  let firstPointer = 0;
  let secondPointer = 0;

  // Поки не закінчився один із наших масивів
  while (firstPointer < firstArray.length && secondPointer < secondArray.length) {
    // Якщо у першому масиві поточне число менше, ніж у другому,
    // потрібно спочатку порахувати кількість цих чисел
    if (firstArray[firstPointer] < secondArray[secondPointer]) {
      // Порахуємо дублікати, починаючи з поточного покажчика
      const dup1 = countDuplicates(firstArray, firstPointer);

      // Якщо вийшло більше дублікатів, ніж було,
      // то запам'ятаємо це число як поточний результат
      result = Math.max(result, dup1);
      // Рухаємо покажчик усередині першого масиву
      firstPointer += dup1;
    // Якщо в масивах числа збігаються
    } else if (firstArray[firstPointer] === secondArray[secondPointer]) {
      // Порахуємо їх кількість у кожному масиві
      const dup1 = countDuplicates(firstArray, firstPointer);
      const dup2 = countDuplicates(secondArray, secondPointer);

      // Якщо потрібно, оновимо результат
      result = Math.max(result, dup1 + dup2);
      // Рухаємо кожен із покажчиків
      firstPointer += dup1;
      secondPointer += dup2;
    // Якщо ж у другому масиві число більше, ніж у першому,
    // то зробимо над ним ті самі операції, що над першим масивом
    } else {
      const dup2 = countDuplicates(secondArray, secondPointer);

      result = Math.max(result, dup2);
      secondPointer += dup2;
    }
  }

  // Якщо один з масивів закінчився, значить потрібно дорахувати дублікати в масиві,
  // що залишився подібним чином, поки не закінчиться і другий
  while (firstPointer < firstArray.length) {
    const dup1 = countDuplicates(firstArray, firstPointer);

    result = Math.max(result, dup1);
    firstPointer += dup1;
  }

  while (secondPointer < secondArray.length) {
    const dup2 = countDuplicates(secondArray, secondPointer);

    result = Math.max(result, dup2);
    secondPointer += dup2;
  }

  return result;
};

console.log(countMostFrequent([1, 2, 2, 3], [0, 2, 4, 4])); // 3
