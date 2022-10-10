## Command (команда)

Перетворює запити на об'єкти, дозволяючи передавати їх як аргументи під час виклику методів, ставити запити в чергу, логувати їх, а також підтримувати скасування операцій

**Приклад 1 (JavaScript)**

```js
class OrderManager {
    constructor() {
        this.orders = [];
    }

    execute(command, ...args) {
        return command.execute(this.orders, ...args);
    }
}

class Command {
    constructor(execute) {
        this.execute = execute;
    }
}

function PlaceOrderCommand(order, id) {
    return new Command((orders) => {
        orders.push(id);
        console.log(`You have successfully ordered ${order} (${id})`);
    });
}

function CancelOrderCommand(id) {
    return new Command((orders) => {
        orders = orders.filter((order) => order.id !== id);
        console.log(`You have canceled your order ${id}`);
    });
}

function TrackOrderCommand(id) {
    return new Command(() =>
        console.log(`Your order ${id} will arrive in 20 minutes.`)
    );
}

const manager = new OrderManager();

manager.execute(new PlaceOrderCommand("Pad Thai", "1234"));
manager.execute(new TrackOrderCommand("1234"));
manager.execute(new CancelOrderCommand("1234"));
```

**Приклад 2 (JavaScript)**

```js
const add = (x, y) => x + y;
const sub = (x, y) => x - y;
const mul = (x, y) => x * y;
const div = (x, y) => x / y;

class Command {
    constructor(execute, undo, value) {
        this.execute = execute;
        this.undo = undo;
        this.value = value;
    }
}

class AddCommand {
    constructor(value) {
        return new Command(add, sub, value);
    }
}

class SubCommand {
    constructor(value) {
        return new Command(sub, add, value);
    }
}

class MulCommand {
    constructor(value) {
        return new Command(mul, div, value);
    }
}

class DivCommand {
    constructor(value) {
        return new Command(div, mul, value);
    }
}

class Calculator {
    #current = 0;
    #commands = [];

    execute(command) {
        this.#current = command.execute(this.#current, command.value);
        this.#commands.push(command);
        console.log(`${this.#getActionName(command)}: ${command.value}`);
    }

    undo() {
        const command = this.#commands.pop();
        this.#current = command.undo(this.#current, command.value);
        console.log(`Undo ${this.#getActionName(command)}: ${command.value}`);
    }

    getCurrentValue() {
        return this.#current;
    }

    #getActionName(command) {
        const name = command.execute.name;
        return name.charAt(0).toUpperCase() + name.slice(1);
    }
}

const calculator = new Calculator();

calculator.execute(new AddCommand(100));
calculator.execute(new SubCommand(24));
calculator.execute(new MulCommand(6));
calculator.execute(new DivCommand(2));

calculator.undo();
calculator.undo();

console.log("\nValue: " + calculator.getCurrentValue());
```

```ts
/**
 * Командний інтерфейс оголошує метод для виконання
 * команди.
 */
interface Command {
    execute(): void;
}

/**
 * Деякі команди можуть виконувати прості операції
 * самостійно.
 */
class SimpleCommand implements Command {
    private payload: string;

    constructor(payload: string) {
        this.payload = payload;
    }

    public execute(): void {
        console.log(
            `SimpleCommand: See, I can do simple things like printing (${this.payload})`
        );
    }
}

/**
 * Однак деякі команди можуть делегувати більш складні
 * операції іншим об'єктам, які називаються «одержувачами».
 */
class ComplexCommand implements Command {
    private receiver: Receiver;

    /**
     * Контекстні дані, необхідні для запуску методів приймача.
     */
    private a: string;

    private b: string;

    /**
     * Складні команди можуть приймати один або декілька
     * об'єктів-одержувачів разом із будь-якими
     * контекстними даними через конструктор.
     */
    constructor(receiver: Receiver, a: string, b: string) {
        this.receiver = receiver;
        this.a = a;
        this.b = b;
    }

    /**
     * Команди можна делегувати будь-яким методам приймача.
     */
    public execute(): void {
        console.log(
            "ComplexCommand: Complex stuff should be done by a receiver object."
        );
        this.receiver.doSomething(this.a);
        this.receiver.doSomethingElse(this.b);
    }
}

/**
 * Класи Receiver містять деяку важливу бізнес-логіку.
 * Вони вміють виконувати всілякі операції, пов'язані
 * з виконанням запиту. Фактично будь-який клас може
 * служити як Receiver.
 */
class Receiver {
    public doSomething(a: string): void {
        console.log(`Receiver: Working on (${a}.)`);
    }

    public doSomethingElse(b: string): void {
        console.log(`Receiver: Also working on (${b}.)`);
    }
}

/**
 * Invoker пов'язаний з однією або кількома командами.
 * Він надсилає запит до команди.
 */
class Invoker {
    private onStart: Command;

    private onFinish: Command;

    /**
     * Ініціалізація команд.
     */
    public setOnStart(command: Command): void {
        this.onStart = command;
    }

    public setOnFinish(command: Command): void {
        this.onFinish = command;
    }

    /**
     * Invoker не залежить від конкретної команди або класу
     * отримувача. Invoker передає запит одержувачу
     * опосередковано, виконуючи команду.
     */
    public doSomethingImportant(): void {
        console.log(
            "Invoker: Does anybody want something done before I begin?"
        );
        if (this.isCommand(this.onStart)) {
            this.onStart.execute();
        }

        console.log("Invoker: ...doing something really important...");

        console.log(
            "Invoker: Does anybody want something done after I finish?"
        );
        if (this.isCommand(this.onFinish)) {
            this.onFinish.execute();
        }
    }

    private isCommand(object): object is Command {
        return object.execute !== undefined;
    }
}

/**
 * Код клієнта може параметризувати засіб виклику
 * будь-якими командами.
 */
const invoker = new Invoker();
invoker.setOnStart(new SimpleCommand("Say Hi!"));
const receiver = new Receiver();
invoker.setOnFinish(new ComplexCommand(receiver, "Send email", "Save report"));

invoker.doSomethingImportant();
```
