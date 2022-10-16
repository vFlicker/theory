## Алгоритм

Скінчена послідовність указівок на виконання дій, спрямованих на розв'язування задачі

### Нотація Big O

Функція, яка описує зростання складності алгоритму

### Складність алгоритму

Як зростатиме витрата ресурсів (часу та пам'яті) із збільшенням розміру вхідних даних

-   **Постійна (константна) складність О(1)** — сталий час роботи, незалежно від розміру задачі (очікуваний час пошуку в хеші)

```js
const calculate = () => {
    const a = 1 + 2;
    const b = 3 + 4;

    console.log("calculating...");

    return b - a;
};
```

```js
const calculate = (array) => {
    const a = 1 + 2;
    const b = 3 + 4;
    const additionalNumber = array.length;

    return b - a + additionalNumber;
};
```

-   **Логарифмічна складність O(log \* n)** — подвоєння розміру задачі збільшує час роботи на сталу величину (бінарний пошук в масиві з `n` елементів)

-   **Лінійна складність O(n)** — подвоєння розміру задачі подвоїть і необхідний час (додавання/віднімання чисел з `n` елементів, лінійний пошук в масиві з `n елементів)

```js
const calculate = (array) => {
    let sum = 0;

    array.forEach((number) => (sum += number));

    return sum;
};
```

```js
const calculate = (array) => {
    const a = 1 + 2;
    const b = 3 + 4;
    let additionalNumber = 0;

    array.forEach((num) => (additionalNumber += num));

    return b - a + additionalNumber;
};
```

-   **Лінеаритмічна складність O(n \* log \* n)** — подвоєння розміру задачі збільшить необхідний час трохи більше ніж вдвічі (сортування злиттям)

-   **Квадратичне складність O(n^2)** — подвоєння розміру задачі вчетверо збільшує необхідний час (сортування вибіркою, бульбашкове сортування)

```js
const calculate = (array) => {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length; j++) {
            array[i] = array[i] + array[j];
        }
    }

    return array;
};
```

```js
const calculate = (array) => {
    let total = 0;

    array.forEach((num) => {
        const additional = array.indexOf(num) > 5 ? 5 : 1;
        total = total + num + additional;
    });

    return array;
};
```

-   **O(log2n \* n)** — (швидке сортування)
