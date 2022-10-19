## Big-O Complexity

### Складність алгоритму за часом — O(1)

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

### Складність алгоритму за часом — O(n)

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

### Складність алгоритму за часом — O(n^2)

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
