## Stack (стопка)

Дотримується принципу LIFO (Last In First Out — останній ввійшов, першим вийшов). Використовується для задач в яких приходиться повертатися до попереднього кроку (синтаксичний розбір, пошук ляху в лабіринті, програмування історії)

### Методи

-   size — повернути кількість елементів у стеці
-   push — додати новий елемент
-   pop — видалити верхній елемент, повернути його
-   peek — повернути верхній елемент

```js
class Stack {
    #count = 0;
    #storage = {};

    /**
     * Додати новий елемент.
     */
    get size() {
        return this.#count;
    }

    /**
     * Видалити верхній елемент, повернути його.
     */
    push(value) {
        this.#storage[this.#count] = value;

        this.#count++;
    }

    /**
     * Повернути верхній елемент.
     */
    pop() {
        if (this.#count === 0) return undefined;

        this.#count--;

        const result = this.#storage[this.#count];

        delete this.#storage[this.#count];

        return result;
    }

    /**
     * Повернути кількість елементів у стеці.
     */
    peek() {
        return this.#storage[this.#count - 1];
    }
}
```
