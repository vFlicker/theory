## Stack (стопка)

Дотримується принципу LIFO (Last In First Out — останній ввійшов, першим вийшов). Використовується для задач в яких приходиться повертатися до попереднього кроку (синтаксичний розбір, пошук ляху в лабіринті, програмування історії)

### Методи

-   size — повернути кількість елементів у стеці
-   push — додати новий елемент
-   pop — видалити верхній елемент, повернути його
-   peek — повернути верхній елемент

**Приклад 1**

```js
const questions = [
    {
        text: "text 1",
        answers: [
            { title: "title 1.1", isCorrect: false },
            { title: "title 1.2", isCorrect: false },
            { title: "title 1.3", isCorrect: true },
        ],
    },
    {
        text: "text 2",
        answers: [
            { title: "title 2.1", isCorrect: true },
            { title: "title 2.2", isCorrect: false },
            { title: "title 2.3", isCorrect: false },
        ],
    },
];

console.log(questions[0].text);

const history = [];

const changeText = (newText) => {
    const oldText = questions[0].text;
    questions[0].text = newText;
    history.push(() => (questions[0].text = oldText));
};

changeText("new text 1");
console.log(questions[0].text);

changeText("new text 2");
console.log(questions[0].text);

history.pop()();
history.pop()();
console.log(questions[0].text);
```

**Приклад 2**

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
