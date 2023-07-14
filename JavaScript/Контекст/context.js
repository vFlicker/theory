function guitarStore() {
  this.guitarCount = 2;

  (function() {
    this.guitarCount = 1;
  })();

  console.log(this.guitarCount);
};

const guitarShop = {
  guitarCount: 3,
  showMeAnswer() {
    console.log(this.guitarCount);
  }
};

/**
 * Під час виклику ф-ції guitarStore, у глобального об'єкта
 * (`window` в браузері) властивість `guitarCount` буде
 * `undefined`. На 2 рядку коду ця властивість зміниться на `2`,
 * на 5 рядку коду, ця властивість перепишеться і стане `1`.
 * 
 * Результат виклику — `1`.
 */
// guitarStore();

/**
 * Під час створення екземпляр ф-ціх конструктора
 * `guitarStore`, створиться пустий об'єкт. На 2 рядку
 * коду у цей об'єкт запишеться нова властивість
 * `guitarCount` зі значення `2`. На 5 рядку коду,
 * відбудеться виклик IIFE, для глобального об'єкту
 * встановиться нова властивість `guitarCount` зі значенням
 * `1`.
 * 
 * Результат виклику — `2`.
 */
// new guitarStore();

/**
 * Під час виклику методу showMeAnswer об'єкта `guitarShop`,
 * значення властивості `guitarCount` буде `3`.
 * 
 * Результат виклику — `3`.
 */
// guitarShop.showMeAnswer();

/**
 * Під час спроби отримання екземпляру об'єкту отримаємо
 * помилку.
 * 
 * Результат виклику — помилка.
 */
// new guitarShop.showMeAnswer;

/**
 * У цьому випадку як контекст встановиться ф-ція
 * `guitarStore`, далі все буде як у випадку
 * `new guitarStore()`.
 * 
 * Результат виклику — `2`.
 */
// guitarStore.apply(guitarStore);

/**
 * У цьому випадку для контексту як контекст методу
 * `showMeAnswer` ми встановимо ф-цію `guitarStore`.
 * У цієї ф-ції спробуємо знайти властивість `guitarCount`
 * якої не буде.
 *
 * Результат виклику — `undefined`.
 */
// guitarShop.showMeAnswer.apply(guitarStore);

/**
 * У цьому випадку, як контекст встановиться пустий об'єкт.
 * Все буде відбуватися як у випадку `new guitarStore()`.
 * 
 * Результат виклику — `2`.
 */
// guitarStore.bind({})();
