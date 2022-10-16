## Алгоритм

Скінчена послідовність указівок на виконання дій, спрямованих на розв'язування задачі

### Складність алгоритму

Як зростатиме витрата ресурсів (часу та пам'яті) із збільшенням розміру вхідних даних

### Нотація Big O

Функція, яка описує зростання складності алгоритму

### Лінійна складність O(n)

Подвоєння розміру задачі подвоїть і необхідний час (додавання/віднімання чисел з n цифр; лінійний пошук в масиві з n елементів)

**Приклад 1**

```js
const calculate = (array) => {
    let sum = 0;

    array.forEach((number) => (sum += number));

    return sum;
};
```

**Приклад 2**

```js
const calculate = (array) => {
    const a = 1 + 2;
    const b = 3 + 4;
    let additionalNumber = 0;

    array.forEach((num) => (additionalNumber += num));

    return b - a + additionalNumber;
};
```

### Постійна (константна) складність О(1)

Сталий час роботи, незалежно від розміру задачі (очікуваний час пошуку в хеші)

**Приклад 1**

```js
const calculate = () => {
    const a = 1 + 2;
    const b = 3 + 4;

    console.log("calculating...");

    return b - a;
};
```

**Приклад 2**

```js
const calculate = (array) => {
    const a = 1 + 2;
    const b = 3 + 4;
    const additionalNumber = array.length;

    return b - a + additionalNumber;
};
```

### Квадратичне складність O(n^2)

Подвоєння розміру задачі вчетверо збільшує необхідний час (сортування вибіркою, бульбашкове сортування)

**Приклад 1**

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

**Приклад 2**

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

### Квадратична складність O(log \* n)

Логарифмічне зростання — подвоєння розміру задачі збільшує час роботи на сталу величину (двійковий пошук в масиві з n елементів)

### O(log2n) - бінарний

### O(log2n \* n)

(швидке сортування)

### O(n!)
