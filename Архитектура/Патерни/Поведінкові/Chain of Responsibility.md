## Chain of Responsibility (ланцюжок обов'язків)

Дає змогу передавати запити послідовно ланцюжком обробників. Кожен наступний обробник вирішує, чи може він обробити запит сам і чи варто передавати запит далі ланцюжком

**Приклад 1 (JavaScript)**

```js
/** Цей приклад дещо відрізняється від класичного шаблону
 *  ланцюжка відповідальності тим, що в обробці запиту
 *  беруть участь не один, а всі обробники.
 */

class Request {
    constructor(amount) {
        console.log(`Requested: $${amount}`);
        this.amount = amount;
    }

    get(bill) {
        const count = Math.floor(this.amount / bill);
        this.amount -= count * bill;
        console.log(`Dispense ${count} $${bill} bills. $${this.amount} left.`);
        return this;
    }
}

const request = new Request(378);
request.get(100).get(50).get(20).get(10).get(5).get(1);
```

**Приклад 2 (TypeScript)**

```ts
/**
 * Інтерфейс Handler оголошує метод для побудови ланцюжка
 * обробників. Він також оголошує метод для виконання
 * запиту.
 */
interface Handler {
    setNext(handler: Handler): Handler;
    handle(request: string): string | null;
}

/**
 * Поведінка ланцюжка за замовчуванням може бути
 * реалізована всередині базового класу обробника.
 */
abstract class AbstractHandler implements Handler {
    private nextHandler: Handler;

    public setNext(handler: Handler): Handler {
        this.nextHandler = handler;
        /**
         * Повернення обробника звідси дозволить нам
         * зв'язати обробники зручним способом,
         * наприклад:
         * monkey.setNext(squirrel).setNext(dog);
         */
        return handler;
    }

    public handle(request: string): string | null {
        if (this.nextHandler) {
            return this.nextHandler.handle(request);
        }

        return null;
    }
}

/**
 * Усі конкретний Handlers або обробляють запит,
 * або передають його наступному обробнику в ланцюжку.
 */
class MonkeyHandler extends AbstractHandler {
    public handle(request: string): string | null {
        if (request === "Banana") {
            return `Monkey: I'll eat the ${request}.`;
        }

        return super.handle(request);
    }
}

class SquirrelHandler extends AbstractHandler {
    public handle(request: string): string | null {
        if (request === "Nut") {
            return `Squirrel: I'll eat the ${request}.`;
        }

        return super.handle(request);
    }
}

class DogHandler extends AbstractHandler {
    public handle(request: string): string | null {
        if (request === "MeatBall") {
            return `Dog: I'll eat the ${request}.`;
        }

        return super.handle(request);
    }
}

/**
 * Клієнтський код зазвичай підходить для роботи з одним
 * обробником. У більшості випадках він навіть не
 * усвідомлює, що обробник є частиною ланцюжка.
 */
function clientCode(handler: Handler) {
    const foods = ["Nut", "Banana", "Cup of coffee"];

    for (const food of foods) {
        console.log(`Client: Who wants a ${food}?`);

        const result = handler.handle(food);
        if (result) {
            console.log(`${result}`);
        } else {
            console.log(`${food} was left untouched.`);
        }
    }
}

/**
 * Інша частина коду клієнта створює фактичний ланцюжок.
 */
const monkey = new MonkeyHandler();
const squirrel = new SquirrelHandler();
const dog = new DogHandler();

monkey.setNext(squirrel).setNext(dog);

/**
 * Клієнт повинен мати можливість надіслати запит
 * будь-якому обробнику, а не тільки першому у ланцюжку.
 */
console.log("Chain: Monkey > Squirrel > Dog");
clientCode(monkey);

console.log("Subchain: Squirrel > Dog");
clientCode(squirrel);
```
