## Розрахунок DOM

### `requestAnimationFrame`

Якщо ми просто оновлювали DOM в циклі, сторінка б зависла і нічого не було б видно. Браузери не оновлюють сторінку під час роботи JavaScript і не дозволяють у цей час роботу зі сторінкою. Тому нам потрібна `requestAnimationFrame` – вона повідомляє браузеру, що ми поки завершили, і він може займатися своїми браузерними речами, наприклад оновити екран і відповісти на запити користувача

### Розбір документа

Розбір документа — задача складна. З метою швидкої дії браузерні движки не перебудовують документ кожен раз після його зміни, а ждуть так довго, як це можливо. Коли програма JavaScript, яка змінила документ, завершує роботу, браузеру треба просити нову розкладку сторінки, щоб вивести змінений документ на екран. Коли програма запрошує позицію або розмір чого-небудь, читає властивості типу `offsetHeight` або викликає `getBoundingClientRect`, для надання коректної інформації також необхідно розрахувати розкладку

Програма, яка періодично розраховує розкладку DOM і змінює DOM, змушує браузерів багато раз перерахувати розкладку, і в зв'язку з цим буде працювати повільно. В наступному прикладі є дві різні програми, які будують лінію із символів X шириною в `2000px`, і вимірюють час роботи

```html
<p><span id="one"></span></p>
<p><span id="two"></span></p>

<script>
    const time = (name, action) => {
        const start = Date.now();
        action();
        console.log(`${name} зайняло ${Date.now() - start} ms`);
    };

    time("bad", () => {
        const target = document.getElementById("one");

        while (target.offsetWidth < 2000) {
            target.appendChild(document.createTextNode("X"));
        }
    }); // -> зайняло 32 ms

    time("good", () => {
        const target = document.getElementById("two");
        target.appendChild(document.createTextNode("XXXXX"));

        const total = Math.ceil(2000 / (target.offsetWidth / 5));

        for (let i = 5; i < total; i++) {
            target.appendChild(document.createTextNode("X"));
        }
    });
    // -> зайняло 1 ms
</script>
```
