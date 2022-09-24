## JavaScript 1

### Перерахування, словник, константа

#### Enum (перерахування) — набір однотипних констант, що виносяться на початок модуля

```ts
const StatusCode = {
    OK: 200,
    NOT_FOUND: 404,
    BAD_REQUEST: 400,
};

enum StatusCode {
    Ok = 200,
    NotFound = 404,
    BadRequest = 400,
}
```

#### Словник це просто об'єкт, де щось зберігається

```js
const valueToAnotherValue = {
    one: "class-one",
    two: "class-two",
    three: "class-three",
};
```

#### А є просто об'єкт, який може бути константою

```js
const BLANK = {
    description: "",
    task: "",
    isArchive: false,
    isFavorite: false,
};
```

### `String`, `.toString`, `Number`, `.parseInt`

-   Краще використовувати `.toString`, ніж `String`
-   Перед використанням методів `Number` та `.parseInt` потрібно обрізати пробіли `value.trim('12345')`
-   Гарним тоном вважається передавати другий аргумент у `.parseInt('12345', 10)`

### Живої колекція

Якщо видаляти елементи циклом з живої колекції, вони видалятимуться через один, тому що на місце видаленого буде елемент який був поряд, щоб вирішити цю проблему, треба видаляти елементи з кінця

```html
<ul class="books">
    <li class="book book--one"></li>
    <li class="book book--two"></li>
    <li class="book book--three"></li>
</ul>

<script>
    const booksList = document.querySelector(`.books`);
    const liveBooks = booksList.children;

    for (index = liveBooks.length - 1; index >= 0; index--) {
        liveBooks[index].remove();
    }
</script>
```

### Видалення addEventListener

Якщо потрібно використовувати addEventListener 1 раз і видалити, можна у 3 аргументі передати `{ once: true }`

### Debounce і Throttle

`Debounce` буде викликатись через певний час після виконання роботи програми. Зручно застосовувати там, де потрібно порахувати результат після виконання.
Наприклад, зміна мантії у схожих магів

`Throttle` буде виконуватися не частіше, ніж заданий час. Зручно використовувати при ресайзі браузера

### Numeric separators (цифрові роздільники)

```js
console.log(1_000_000 === 1000000); // true
```

### `Array.at()`

```js
const colors = ["red", "green", "blue"];

console.log(colors[colors.length - 2] === colors.at(-2)); // true
```
