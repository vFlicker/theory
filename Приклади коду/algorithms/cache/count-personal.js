/*
  Отримати максимальну кількість співробітників,
  що одночасно перебувають в офісі.
*/

/**
 * Якщо час буде зберігатися у мілісекундах, дана функція
 * буде працювати занадто довго. Витрати за часом будуть
 * дуже великі, і за пам'яттю теж, через те, що у мапі
 * будь зберігатися безліч ключів.
 *
 * Краще змінити структуру даних.
 */
const countPersonal = (input) => {
  if (input.length === 0) return 0;

  const map = new Map();

  for (const [start, end] of input) {
    for (let current = start; current < end; current++) {
      let count = 1;
      if (map.has(current)) count += map.get(current);
      map.set(current, count);
    }
  }

  return Math.max(...map.values());
};
