# Асинхронність

Асинхронність в JavaScript дозволяє виконувати операції без блокування основного процесу програми. Це дозволяє реагувати на події та виконувати багатозадачні операції.

## async/await

Конструкції мови (являє собою додатковий рівень абстракції для генераторів) для роботи з `Promise`, мета якого спростити використання `Promise`, що дозволяють привести асинхронний код для синхронного вигляду. **Важливо**, що це лише представлення коду, сам код залишається асинхронним за своєю природою

### async

-   Ключове слово для функції чи методу
-   Функція, позначена як async, завжди повертає `Promise`
-   Коли результат був отриманий, `Promise` завершується, повертаючи отримане значення.
-   Коли функція кидає виняток, `Promise` відповість відмовою з викинутим значенням
-   Async функцію ніколи не має сенсу викликати всередині `try_catch` блоку

### await

-   Ключове слово, доступне всередині async-функції
-   Зупиняє виконання функції і чекає відповіді від переданого `Promise`
-   Якщо в результаті `await` роботи `Promise` викинув виняток, то його можна обробити за допомогою блоку `try_catch`
-   Ключове слово `await` допустиме лише в асинхронних функціях, в іншому контексті ви отримаєте помилку `SyntaxError`

### Особливості

-   Будь-яка функція, яка повертає `Promise` працює так само, як async-функція
-   Під час виклику async-функції завжди потрібно стежити за тим, щоб оброблявся результат `Promise`
-   `await` ніколи не замикається - не може бути вкладений в іншу функцію
-   Конструктори не можуть бути асинхронними
-   Гетери та сетери не можуть бути асинхронними

```js
/*
    Якщо використовувати await біля функцій resolveAfter2Seconds,
    виконання методу sum займе ~4 секунди
*/
const sum = async (x) => {
    const a = resolveAfter2Seconds(1);
    const b = resolveAfter2Seconds(2);
    return x + (await a) + (await b);
};
```

```js
/*
    Якщо не перевіряти initialized, є ймовірність,
    що відбудеться створення нового інстансу
*/
class Singleton {
    constructor() {
        this.order = order++;
        console.log("I'm the first one");
    }

    static async init() {
        await resolveAfter2Seconds(); // simulate async loading
        return new Singleton();
    }
}

let instance;

const getInstance = async () => {
    if (instance) return instance;

    const initialized = await Singleton.init();
    if (!initialized) instance = initialized;

    return instance;
};

getInstance().then((i) => console.log(i.order));
getInstance().then((i) => console.log(i.order));
getInstance().then((i) => console.log(i.order));
```

```js
/*
    Виконання такого коду займе ~20 секунд
*/
const iterate = async (num) => {
    let sum = 0;
    for (let i = 0; i < 10>; i++) {
        sum += await resolveAfter2Seconds(10);
    }
    return sum;
};
```

```js
/**
 * Функція створення черги для асинхронних функцій.
 * Корисна, коли перед наступним запитом потрібно дочекатися виконання попереднього.
 */
const createQueue = (asyncFunction) => {
    // Створюємо чергу, зберігатимемо у ній аргументи для функції
    const queue = [];

    const dequeue = async () => {
        // Беремо аргументи з початку масиву та викликаємо функцію
        const args = queue[0];

        await asyncFunction(...args);

        // Як тільки проміс нашої функції виконається,
        // видаляємо виконання цього завдання з черги
        queue.shift();

        // А якщо в черзі щось залишилося — виконуємо
        if (queue.length) {
            dequeue();
        }
    };

    // Викликаємо функцію, обернуту в чергу, як завжди
    return (...args) => {
        // Кладемо в чергу аргументи, необхідні для виконання
        queue.push(args);

        // Якщо в черзі є тільки наше завдання — беремо і виконуємо її
        if (queue.length === 1) {
            dequeue();
        }
    };
};

const fetchData = async (data) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`Fetched: ${data}`);
            resolve();
        }, 1000);
    });
};

const queuedFetch = createQueue(fetchData);

// Додаємо запити до черги
queuedFetch("Request 1");
queuedFetch("Request 2");
queuedFetch("Request 3");
```

## Література

<a href="https://habr.com/ru/company/mailru/blog/269465">У нас проблеми із промісами</a>
