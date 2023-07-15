# Document Object Model (DOM)

Об'єктна модель документа (Document Object Model або DOM) — це інтерфейс, який представляє структуру та зміст веб-сторінки або документа. Вона надає програмістам можливість взаємодіяти з елементами HTML, CSS та JavaScript на сторінці.

## Жива колекція

При видаленні елементів з «живої» колекції (наприклад, отриманої з властивості `children` або `childNodes`), елементи можуть видалятися з колекції неочікувано. Це відбувається через те, що колекція змінюється під час видалення. Щоб уникнути цієї проблеми, рекомендується видаляти елементи з кінця колекції:

```html
<ul class="books">
    <li class="book book--one"></li>
    <li class="book book--two"></li>
    <li class="book book--three"></li>
</ul>

<script>
    const booksList = document.querySelector(".books");
    const liveBooks = booksList.children;

    for (let index = liveBooks.length - 1; index >= 0; index--) {
        liveBooks[index].remove();
    }
</script>
```

Цей підхід гарантує правильне видалення елементів з колекції.

## Видалення addEventListener

Якщо потрібно додати подію до елемента та видалити її після першого спрацювання, можна використовувати третій аргумент { once: true } під час виклику addEventListener. Це забезпечить автоматичне видалення обробника подій після його виконання:

```js
element.addEventListener("click", eventHandler, { once: true });
```

Цей підхід особливо корисний, коли потрібно встановити тимчасову функціональність, яка повинна бути виконана тільки один раз.
