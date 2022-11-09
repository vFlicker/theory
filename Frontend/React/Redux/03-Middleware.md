## Middleware

Функції, які послідовно викликаються при обробці дій. Здатні перехоплювати action та діяти відповідно до них, перш ніж вони досягнуть reducer

### Переваги

-   Більшість логіки може жити поза бібліотекою інтерфейсу користувача
-   Повторне використання та легка заміна
-   Окремі тести на кожну окрему програму

### Способи використання

-   Одноманітна робота з великими обсягами вхідної інформації (однакова реакція на всі помилки у запитах на сервер)
-   Перевірка action payload перед тим, як action перейде до reducer

### Базова форма middleware

Redux middleware це функція, яка приймає об'єкт з методами getState і dispatch та повертає функцію, яка приймає next як параметр. Потім внутрішня функція повертає іншу функцію, яка приймає дію як параметр і, нарешті, повертає next(action)

```js
function myMiddleware({ getState, dispatch }) {
    return function (next) {
        return function (action) {
            /**
             * Робіть корисну роботу тут.
             */

            /**
             * next(action) переміщує програму вперед,
             * викликаючи наступний middleware в ланцюжку.
             */
            return next(action);
        };
    };
}
```

Якщо вам цікаво прочитати наступний стан програми після запуску middleware, ви можете зафіксувати його за допомогою getState після next(action)

```js
function myMiddleware({ getState, dispatch }) {
    return function (next) {
        return function (action) {
            /**
             * Робіть корисну роботу тут.
             */

            const nextAction = next(action);

            /**
             * Читання наступного стан.
             */
            const state = getState();

            /**
             * Повернутися до наступної дії.
             */
            return nextAction;
        };
    };
}
```

### Приклади

```js
/**
 * Неправильне застосування.
 */
const forbiddenWordsMiddleware = ({ dispatch }) => (next) => (action) => {
  const forbiddenWords = ['spam', 'money']; // винести за межі middleware, щоб не створювався кожен раз.

  if (action.type === ADD_ARTICLE) {
    const foundWord = forbiddenWords
      .filter((word) => action.payload.includes(word));

    if (foundWord) {
      // забув зробите return
      dispatch(titleForbidden());
    } else {
      // це тут не потрібно, достатньо next(action) нижче
      dispatch(addArticle());
    }
  }

  return next(action);
}

/**
 * Правильне застосування.
 */
const forbiddenWords = ['spam', 'money'];

const forbiddenWordsMiddleware = ({ dispatch }) => (next) => (action) => {
  if (action.type === ADD_ARTICLE) {
    const foundWord = forbiddenWords
      .filter((word) => action.payload.includes(word));

    if (foundWord) {
      return dispatch(titleForbidden());
    }
  }

  return next(action);
}
```