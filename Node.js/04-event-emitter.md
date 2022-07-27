### Паттерн EventEmitter

-   Поділяє концепції слухача та емітента
-   Emitter (емітент) — той, хто надає дані
-   Listener (слухач) — той, хто зацікавлений у даних

### Інтерфейс EventEmitter

-   Метод emit — каже, що з'явилися нові дані
-   Метод on — підписує слухача на отримання нових даних
-   Якщо в якості слухача використовується функція з контекстом, то контекст буде підмінений під час виклику на об'єкт самого EventEmitter

### Event Emitter

-   Підписки на події:
    -   addListener/on/prependListener — підписатися/підписатися перед всіма
    -   removeListener/removeAllListeners — видалити слухача
    -   once/prependOnceListener — виконати 1 раз
-   Методи та поля EventEmitter:
    -   emit — подія сталася
    -   eventNames — всі події які вже виконались
-   Події EventEmitter:
    -   Event: 'newListener'
    -   Event: 'removeListener'

### Особливості

-   EventEmitter завжди синхронний та викликає всіх своїх слухачів у порядку підписки
-   EventEmitter має спеціальну подію error, якщо вона сталася і немає жодного обробника error, то буде викинуто виняток
-   У EventEmitter є обмеження на максимальну кількість обробників для одного події (10 за замовчуванням)

```js
const EventEmitter = require("events");

class MyEmitter extends EventEmitter {
    constructor() {
        super();

        // використовуйте nextTick, щоб випромінити подію після призначення обробника
        process.nextTick(() => {
            this.emit("event");
        });
    }
}

const myEmitter = new MyEmitter();
myEmitter.on("event", () => {
    console.log("an event occurred!");
});
```

```js
/*
    Якщо не використовувати process.nextTick, в консолі отримаємо: 1, 3
    З process.nextTick вивід буде: 1, 2, 3
*/

class MyEmitter {
    print() {}

    static create(defaultValue = 2) {
        const emitter = new NumberPrinter();
        // emitter.print(defaultValue);
        process.nextTick(() => emitter.print(defaultValue));
        return emitter;
    }
}

const printer = MyEmitter.create();
printer.print = (number) => console.log(number);

printer.print(1);

setImmediate(() => {
    printer.print(3);
});
```
