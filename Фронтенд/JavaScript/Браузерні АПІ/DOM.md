# Document Object Model (об'єктна модель документа)

Об'єктна модель документа. DOM надає інтерфейси, що дозволяють програмісту взаємодіяти з розміткою сторінки: створювати та видаляти елементи, змінювати існуючі, а також виконувати інші завдання

## Жива колекція

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

## Видалення addEventListener

Якщо потрібно використовувати addEventListener 1 раз і видалити, можна у 3 аргументі передати `{ once: true }`
