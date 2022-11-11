## Middleware

Функції, які послідовно викликаються при обробці дій. Забезпечують сторонню точку розширення між моментом коли відбудеться dispatch нашого action та моментом, коли він досягає reducer (можемо перевірити action payload перед тим, як action перейде до reducer)

### Переваги

-   Більшість логіки може жити поза бібліотекою інтерфейсу користувача
-   Повторне використання та легка заміна
-   Окремі тести на кожну окрему програму

### Використання

-   Логування
-   Модифікація action
-   Звітування про збої
-   Спілкування з асинхронним API
-   Маршрутизація

### Обробка actions

Якщо ми маємо 3 middleware, наприклад, print1, print2, print3, тоді action пройде такий шлях

1. print1 middleware
1. print2 middleware
1. print3 middleware
1. Оригінальний store.dispatch
1. rootReducer всередині store

### Базова форма middleware

Redux middleware це функція, яка приймає об'єкт з методами getState і dispatch та повертає функцію, яка приймає next як параметр. Потім внутрішня функція повертає іншу функцію, яка приймає дію як параметр і, нарешті, повертає next(action)

```js
function exampleMiddleware({ getState, dispatch }) {
    return function wrapDispatch(next) {
        return function handleAction(action) {
            /**
             * Робіть корисну роботу тут. Передайте дію
             * далі за допомогою next(action),
             * або перезапустіть конвеєр за допомогою
             * dispatch(action).
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

```js
/**
 * Якщо вам цікаво прочитати наступний стан програми після
 * запуску middleware, ви можете зафіксувати його
 * за допомогою getState після next(action)
 */
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
const forbiddenWords = ["spam", "money"];

const forbiddenWordsMiddleware =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        if (action.type === ADD_ARTICLE) {
            const foundWord = forbiddenWords.filter((word) =>
                action.payload.includes(word)
            );

            if (foundWord.length) {
                /**
                 * Ланцюжок виконання middlewares
                 * перерветься і їх виконання почнеться
                 * з початку, вже з новим action.
                 *
                 * Якби ми пропустили return:
                 *
                 * 1. middlewares почали б своє виконання
                 * з початку з action "TITLE_FORBIDDEN",
                 * який в кінці ланцюжку middlewares
                 * потрапить до reducer.
                 *
                 * 2. Після виклику reducer з action
                 * "TITLE_FORBIDDEN", своє виконання
                 * продовжила поточна функція (виконався б
                 * рядок return next(action))
                 */
                return dispatch(titleForbidden());
            }
        }

        return next(action);
    };
```
