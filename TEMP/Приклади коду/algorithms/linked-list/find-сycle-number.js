const findCycleNumber = (numbers) => {
  let tortoise = 0; // Початковий індекс "Черепахи"
  let hare = 0; // Початковий індекс "Зайця"

  while (true) {
    tortoise = numbers[tortoise]; // Черепаха рухається на одну позицію
    hare = numbers[numbers[hare]]; // Заяць рухається на дві позиції

    if (tortoise === hare) {
      // Заяць доганяє Черепаху, знайдено цикл
      break;
    }
  }

  tortoise = 0; // Переініціалізуємо Черепаху на початок масиву

  while (tortoise !== hare) {
    tortoise = numbers[tortoise];
    hare = numbers[hare];
  }

  return tortoise; // Повертаємо число, що є частиною циклу
};

// Приклад вхідних даних
const input = [1, 2, 3, 4, 5, 6, 7, 3] // Масив з циклом (елемент 3 повторюється)
console.log(findCycleNumber(input)); // Виведе: 3
