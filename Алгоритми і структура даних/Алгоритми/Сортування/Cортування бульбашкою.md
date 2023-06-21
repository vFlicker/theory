# Bubble Sort (Сортування бульбашкою)

## Складність алгоритму

Складність алгоритму за часом — `O(n^2)`
Складність алгоритму за пам'яттю — `O(1)`

**Приклад**

```js
const bubbleSort = (array) => {
    const length = array.length - 1;

    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length - i - 1; j++) {
            const current = array[j]; // поточний елемент
            const next = array[j + 1]; // наступний елемент

            // якщо поточний більше наступного, змінюємо їх місцями
            if (current > next) {
                array[j] = next;
                array[j + 1] = current;
            }
        }
    }

    return array;
};

const array = [3, 10, 1, 4, 2, 7, 5, 8, 9, 6];
console.log(bubbleSort(array));
```
