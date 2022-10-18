## Bubble sort (сортування бульбашкою)

Складність алгоритму за часом — O(n^2)
Складність алгоритму за пам'яттю — O(1)

```js
const array = [3, 10, 1, 4, 2, 7, 5, 8, 9, 6];
let iterationsNumber = 0;

const bubbleSort = (array) => {
    const length = array.length;

    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length - i - 1; j++) {
            const current = array[j]; // поточний елемент
            const next = array[j + 1]; // наступний елемент

            // якщо поточний більше наступного, змінюємо їх місцями
            if (current > next) {
                array[j] = next;
                array[j + 1] = current;
            }

            iterationsNumber += 1;
        }
    }

    return array;
};

console.log(bubbleSort(array));
console.log(`Number of iterations: ${iterationsNumber}`);
```
