## Iterator

Дає змогу послідовно обходити елементи складових об'єктів, не розкриваючи їхньої внутрішньої організації

**Приклад 1 (JavaScript)**

```js
class Cursor {
    constructor(data) {
        this.data = data;
    }

    skip(count) {
        return new Cursor(this.data.slice(count));
    }

    limit(count) {
        return new Cursor(this.data.slice(0, count));
    }

    count() {
        return this.data.length;
    }

    toArray() {
        return this.data;
    }
}
```
**Приклад 2 (TypeScript)**

```ts
/**
 * Дозволяє проходити елементи колекції, не відкриваючи
 * її базове представлення (список, стек, дерево тощо).
 */
interface Iterator<T> {
    // Повернути поточний елемент.
    current(): T;

    // Повернути поточний елемент і перейти до наступного елемента.
    next(): T;

    // Повернути ключ поточного елемента.
    key(): number;

    // Перевіряє, чи дійсна поточна позиція.
    valid(): boolean;

    // Перемотати ітератор до першого елемента.
    rewind(): void;
}

interface Aggregator {
    // Отримання зовнішнього ітератора.
    getIterator(): Iterator<string>;
}

/**
 * Concrete Iterators реалізують різні алгоритми обходу.
 * Ці класи постійно зберігають поточну позицію обходу.
 */

class AlphabeticalOrderIterator implements Iterator<string> {
    private collection: WordsCollection;

    /**
     * Зберігає поточну позицію обходу. Ітератор може мати
     * багато інших полів для зберігання стану ітерації,
     * особливо коли він має працювати з певним видом
     * колекції.
     */
    private position: number = 0;

    /**
     * Ця змінна вказує напрямок проходу.
     */
    private reverse: boolean = false;

    constructor(collection: WordsCollection, reverse: boolean = false) {
        this.collection = collection;
        this.reverse = reverse;

        if (reverse) {
            this.position = collection.getCount() - 1;
        }
    }

    public rewind() {
        this.position = this.reverse ? this.collection.getCount() - 1 : 0;
    }

    public current(): string {
        return this.collection.getItems()[this.position];
    }

    public key(): number {
        return this.position;
    }

    public next(): string {
        const item = this.collection.getItems()[this.position];
        this.position += this.reverse ? -1 : 1;
        return item;
    }

    public valid(): boolean {
        if (this.reverse) {
            return this.position >= 0;
        }

        return this.position < this.collection.getCount();
    }
}

/**
 * Concrete Collections надають один або декілька методів
 * для отримання свіжих екземплярів ітератора,
 * сумісних із класом колекції.
 */
class WordsCollection implements Aggregator {
    private items: string[] = [];

    public getItems(): string[] {
        return this.items;
    }

    public getCount(): number {
        return this.items.length;
    }

    public addItem(item: string): void {
        this.items.push(item);
    }

    public getIterator(): Iterator<string> {
        return new AlphabeticalOrderIterator(this);
    }

    public getReverseIterator(): Iterator<string> {
        return new AlphabeticalOrderIterator(this, true);
    }
}

/**
 * Клієнтський код може знати або не знати про класи
 * Concrete Iterator або Collection, залежно від рівня
 * опосередкованості, який ви хочете зберегти
 * у своїй програмі.
 */
const collection = new WordsCollection();
collection.addItem("First");
collection.addItem("Second");
collection.addItem("Third");

const iterator = collection.getIterator();

console.log("Straight traversal:");
while (iterator.valid()) {
    console.log(iterator.next());
}

console.log("Reverse traversal:");
const reverseIterator = collection.getReverseIterator();
while (reverseIterator.valid()) {
    console.log(reverseIterator.next());
}
```
