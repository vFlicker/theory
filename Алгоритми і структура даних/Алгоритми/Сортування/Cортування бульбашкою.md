# Bubble Sort (Сортування бульбашкою)

## Складність алгоритму

Складність алгоритму за часом — `O(n^2)`
Складність алгоритму за пам'яттю — `O(1)`

**Приклад**

```js
const bubbleSort = (array) => {
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - 1 - i; j++) {
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
