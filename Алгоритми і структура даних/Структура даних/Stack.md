# Stack (стопка)

Стек — це структура даних, яка працює за принципом LIFO (останній ввійшов, першим вийшов). Він працює лише з кінцем масиву, додаючи елементи в його кінець і вилучаючи їх також з кінця. Стек використовується в задачах, де необхідно повертатися до попереднього кроку, наприклад, при синтаксичному розборі, пошуку шляху в лабіринті або програмуванні історії.

## Методи

-   `size` — повернути кількість елементів у стеці
-   `push` — додати новий елемент
-   `pop` — видалити верхній елемент, повернути його
-   `peek` — повернути верхній елемент

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
const generateAnimation = (string) => {
    const stack = [];
    const animation = [];

    for (const character of string) {
        if (character === "#") {
            stack.pop();
        } else {
            stack.push(character);
        }

        animation.push(`${stack.join("")}`);
    }

    return animation;
};

console.log(generateAnimation("vlaf#d")); // ['v', 'vl', 'vla', 'vlaf', 'vla', 'vlad'];
```

**Приклад 3**

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
