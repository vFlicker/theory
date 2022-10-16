## LinkedList (зв'язаний список)

Мережа вузлів, кожен з яких містить дані та покажчик на наступний вузол у ланцюжку. Також є покажчик на перший елемент — head. Якщо список порожній, він вказує на null. Використовуються для реалізації файлових систем, хеш-таблиць та списків суміжності

### Переваги та недоліки

-   Виділення пам'яті — динамічний, відбувається асинхронно під час запуску (виконання)
-   Отримання елементів — пошук по всіх вузлах черги, швидкість невисока
-   Додавання/видалення елементів — у зв'язку з динамічним розподілом пам'яті швидкість висока
-   Структура — однонаправлений, двонаправлений чи циклічний

### Методи

-   size — повернути кількість вузлів
-   head — повернути перший елемент (head)
-   isEmpty — перевірити, чи є елементи у списку
-   add — додати елемент у кінець (tail)
-   remove — видалити кілька вузлів
-   indexOf — повернути індекс вузла
-   elementAt — повернути вузол за індексом
-   addAt — вставити вузол у певне місце (за індексом)
-   removeAt — видалити певний вузол (за індексом)

```js
/**
 * Вузол.
 */
class MyNode {
    /**
     * Дані.
     */
    element = null;

    /**
     * Покажчик на наступний вузол.
     */
    next = null;

    constructor(element) {
        this.element = element;
    }
}

class LinkedList {
    #head = null;
    #length = 0;

    get size() {
        return this.#length;
    }

    get head() {
        return this.#head;
    }

    get isEmpty() {
        return this.#length === 0;
    }

    add(element) {
        const node = new MyNode(element);

        if (!this.#head) {
            this.#head = node;
        } else {
            let currentNode = this.#head;

            while (currentNode.next) {
                currentNode = currentNode.next;
            }

            currentNode.next = node;
        }

        this.#length += 1;
    }

    remove(element) {
        let currentNode = this.#head;
        let previousNode = null;

        if (currentNode.element === element) {
            this.#head = currentNode.next;
        } else {
            console.log({ previousNode, currentNode });
            while (currentNode.element !== element) {
                previousNode = currentNode;
                currentNode = currentNode.next;
            }

            previousNode.next = currentNode.next;
        }

        this.#length -= 1;
    }

    indexOf(element) {
        let currentNode = this.#head;
        let index = -1;

        while (currentNode) {
            index += 1;

            if (currentNode.element === element) return index;

            currentNode = currentNode.next;
        }

        return -1;
    }

    elementAt(index) {
        let currentNode = this.#head;
        let count = 0;

        if (index >= this.#length) return;

        while (count < index) {
            count += 1;
            currentNode = currentNode.next;
        }

        return currentNode.element;
    }

    addAt(index, element) {
        let node = new MyNode(element);
        let currentNode = this.#head;
        let previousNode = null;
        let currentIndex = 0;

        if (index >= this.#length) return false;

        if (index === 0) {
            node.next = currentNode;
            this.#head = node;
        } else {
            while (currentIndex < index) {
                currentIndex += 1;
                previousNode = currentNode;
                currentNode = currentNode.next;
            }

            node.next = currentNode;
            previousNode.next = node;
        }
    }

    removeAt(index) {
        let currentNode = this.#head;
        let previousNode = null;
        let currentIndex = 0;

        if (index > this.#length) return false;

        if (index === 0) {
            this.#head = currentNode.next;
        } else {
            while (currentIndex < index) {
                currentIndex += 1;
                previousNode = currentNode;
                currentNode = currentNode.next;
            }

            previousNode.next = currentNode.next;
        }

        this.#length -= 1;
        return currentNode.element;
    }
}
```
