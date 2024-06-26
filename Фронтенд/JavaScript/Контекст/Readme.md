# Контекст

Контекст в JavaScript визначається значенням змінної `this` всередині функції і може залежати від того, як функція була викликана.

## Значення `this`

Значення `this` вказує на об'єкт, у контексті якого була викликана функція. Варіанти присвоєння значення `this` можуть бути наступними:

1. Глобальний контекст — коли використовується `this` в глобальному контексті, воно посилається на глобальний об'єкт (наприклад, `window` в браузері).
2. Виклик функції — при виклику функції `this` зазвичай посилається на глобальний об'єкт ES3 або на undefined в ES5 strict mode.
3. Виклик методу — коли функція викликається як метод об'єкту, `this` вказує на цей об'єкт.
4. Виклик конструктора — якщо функція викликається за допомогою ключового слова `new`, вона діє як конструктор і `this` вказує на новий об'єкт, який створюється конструктором.
5. Використання методів `call`, `apply` або `bind` — ці методи дозволяють явно вказати значення `this` для виклику функції. Метод `bind` створює нову функцію, де значення `this` зафіксовано і не може бути змінено за допомогою `call` або `apply`.

## `bind` дозволяє фіксувати параметри

```js
const logSum = (left, right) => console.log(`left + right = ${left + right}`);
const addToFive = logSum.bind({}, 5);
const printFivePlusSeven = addToFive.bind({}, 7);
```

## Значення this в eventListener

У контексті eventListener значення `this` зазвичай відповідає значенню `evt.currentTarget`. Це означає, що `this` вказує на елемент, на якому було зареєстровано обробник події.
