/*
  Напишіть функцію, за допомогою якої можна буде додати
  новий елемент у вже відсортований масив із цін акцій.
*/

/**
 * Складність за часом — `О(n)`
 * Складність за пам'яттю — `О(1)`
 */
const sortPush = (array, element) => {
  // Спочатку припустимо, що елемент піде прямо на початок масиву
  let index = 0;

  // Поки не зустрінемо елемент, якій більше того який вставляємо,
  // або кінець масиву
  while (index < array.length && element.price > array[index].price) {
      // рухаємо покажчик на місце вставки
      index++;
  }

  index === 0 ? array.unshift(element) : array.splice(index, 0, element);

  return array;
};

const data = [
  {
      ticker: "WISH",
      price: 5.14,
  },
  {
      ticker: "SPCE",
      price: 20.1,
  },
  {
      ticker: "AAPL",
      price: 151.86,
  },
  {
      ticker: "QCOM",
      price: 155.98,
  },
  {
      ticker: "ABNB",
      price: 178.06,
  },
];

const loaded = {
  ticker: "BABA",
  price: 166.99,
};

console.log(sortPush(data, loaded));