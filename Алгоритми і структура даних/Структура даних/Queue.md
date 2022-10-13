## Queue (черга)

Дотримується принципу FIFO (first in first out) перший прийшов першим вийшов. Використовується для задач в яких потрібно описати послідовне виконання якоїсь дії

### Методи

-   enqueue — увійти в чергу, додати елемент до кінця
-   dequeue — залишити чергу, видалити перший елемент та повернути його
-   front — отримати перший елемент
-   isEmpty — перевірити, чи порожня черга
-   size — отримати кількість елементів у черзі

```js
class Queue {
    #collection = [];

    print() {
        console.log(this.#collection);
    }

    enqueue(element) {
        this.#collection.push(element);
    }

    dequeue() {
        return this.#collection.shift();
    }

    front() {
        return this.#collection[0];
    }

    isEmpty() {
        return this.#collection.length === 0;
    }

    size() {
        return this.#collection.length;
    }
}
```
