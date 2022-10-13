## Stack (стопка)

Дотримується принципу LIFO (Last In First Out) останній прийшов першим вийшов. Використовується для задач в яких приходиться повертатися до попереднього кроку (синтаксичний розбір, пошук ляху в лабіринті, програмування історії)

### Методи

-   push — додати новий елемент
-   pop — видалити верхній елемент, повернути його
-   peek — повернути верхній елемент
-   length — повернути кількість елементів у стеці

```js
class Stack {
    #count = 0;
    #storage = {};

    push(value) {
        this.#storage[this.#count] = value;
        this.#count++;
    }

    pop() {
        if (this.#count === 0) return undefined;

        this.#count--;

        const result = this.#storage[this.#count];

        delete this.#storage[this.#count];

        return result;
    }

    peek() {
        return this.#storage[this.#count - 1];
    }

    size() {
        return this.#count;
    }
}
```
