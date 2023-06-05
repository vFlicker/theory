# Hash Table (хеш-таблиця)

Хешування — це процес, що використовується для унікальної ідентифікації об'єктів та зберігання кожного з них у попередньому обчисленому унікальному індексі — ключі. Отже, об'єкт зберігається як пари ключ-значення, а колекція таких елементів називається словником. Кожен об'єкт можна знайти за допомогою ключа. Існує кілька структур, що базуються на хешуванні, але найчастіше використовується хеш-таблиця, яка зазвичай реалізується за допомогою масивів. Час пошуку значення ключа може досягати `O(1)`

## Методи

-   `add` — додати пару ключ/значення
-   `remove` — видалити пару
-   `lookup` — знайти значення за ключем

```js
const hash = (string, max = 4) => {
    let hash = 0;

    for (const letter of string) {
        hash += string.charCodeAt(letter);
    }

    return hash % max;
};

class HashTable {
    #storage = [];

    add(key, value) {
        const hashIndex = hash(key);

        if (!this.#storage[hashIndex]) {
            this.#storage[hashIndex] = [key, value];
            return;
        }

        const obj = this.#storage[hashIndex];

        if (obj[0] === key) obj[1] = value;
    }

    remove(key) {
        const hashIndex = hash(key);

        if (!this.#storage[hashIndex]) return;

        const [storedKey] = this.#storage[hashIndex];

        if (storedKey === key) delete this.#storage[hashIndex];
    }

    lookup(key) {
        const hashIndex = hash(key);

        if (!this.#storage[hashIndex]) return;

        const [storedKey, storedValue] = this.#storage[hashIndex];

        if (storedKey === key) return storedValue;
    }
}
```
