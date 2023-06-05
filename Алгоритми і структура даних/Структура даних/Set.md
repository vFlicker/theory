# Set (множина)

Множина (Set) - це структура даних, яка схожа на масив, але має важливі відмінності. Головна відмінність множини полягає в тому, що вона містить лише унікальні значення. Друга відмінність полягає у відсутності індексації: ми не можемо отримати конкретний елемент з множини, знаючи його положення в ній. Крім того, всі операції (крім перебору) виконуються на множині за час O(1), включаючи видалення, вставку та перевірку наявності елемента.

Найчастіше на практиці множина використовуються саме для швидкої перевірки на входження до якогось величезного списку або для запобігання появі дублікатів.

## Особливості

-   Порядок елементів не має значення
-   Одне і те саме значення може зустрічатися тільки один раз
-   Елементи можна додавати/вилучати
-   Доступ до елементів здійснюється по значенню

## Методи

-   `size` — повернути кількість елементів
-   `values` — повернути всі елементи до колекції
-   `has` — перевірити, чи є елемент у колекції
-   `add` — додати елемент
-   `remove` — видалити елемент
-   `union` — повернути область перетину двох колекцій
-   `intersection` — повернути схожість двох колекцій
-   `difference` — повернути відмінності двох колекцій
-   `subset` — перевірити, чи є одна колекція підмножиною інший

**Приклад 1 (вбудована реалізація)**

```js
const products1 = new Set();
products.add("bread");
products.add("tea");

const products2 = new Set(["bread", "tea"]);
```

**Приклад 2 (самописна реалізація)**

```js
class MySet {
    #collection = [];

    get size() {
        return this.#collection.length;
    }

    get values() {
        return this.#collection;
    }

    has(element) {
        const hasElement = this.#collection.indexOf(element) !== -1;
        return hasElement;
    }

    add(element) {
        if (!this.has(element)) {
            this.#collection.push(element);
        }
    }

    remove(element) {
        if (this.has(element)) {
            const index = this.#collection.indexOf(element);
            this.#collection.splice(index, 1);
        }
    }

    union(otherSet) {
        const unionSet = new MySet();
        const firstSet = this.values();
        const secondSet = otherSet.values();

        firstSet.forEach((element) => unionSet.add(element));
        secondSet.forEach((element) => unionSet.add(element));
    }

    intersection(otherSet) {
        const intersectionSet = new MySet();
        const firstSet = this.values();

        firstSet.forEach((element) => {
            if (otherSet.has(element)) intersectionSet.add(element);
        });

        return intersectionSet;
    }

    difference(otherSet) {
        const differenceSet = new MySet();
        const firstSet = this.values();

        firstSet.forEach((element) => {
            if (!otherSet.has(element)) differenceSet.add(element);
        });

        return differenceSet;
    }

    subset(otherSet) {
        const firstSet = this.values();
        return firstSet.every((element) => otherSet.has(element));
    }
}
```
