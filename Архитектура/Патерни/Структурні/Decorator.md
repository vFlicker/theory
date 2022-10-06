## Decorator (декоратор)

Надає змогу динамічно додавати об'єктам нову функціональність, загортаючи їх у корисні «обгортки»

**Приклад 1 (JavaScript)**

```js
class User {
    constructor(name) {
        this.name = name;
    }

    say() {
        console.log(`User: ${this.name}`);
    }
}

class DecoratedUser {
    constructor(user, street, city) {
        this.user = user;
        this.name = user.name; // забезпечує незмінність інтерфейсу
        this.street = street;
        this.city = city;
    }

    say() {
        console.log(
            `Decorated User: ${this.name}, ${this.street}, ${this.city}`
        );
    }
}

const user = new User("Kelly");
user.say();

const decorated = new DecoratedUser(user, "Broadway", "New York");
decorated.say();
```

**Приклад 2 (TypeScript)**

```ts
/**
 * Інтерфейс базового компонента визначає операції,
 * які можуть бути змінені декораторами.
 */
interface Component {
    operation(): string;
}

/**
 * Concrete Components забезпечують реалізацію операцій
 * за замовчуванням. Може бути кілька варіантів цих класів.
 */
class ConcreteComponent implements Component {
    public operation(): string {
        return "ConcreteComponent";
    }
}

/**
 * Базовий клас Decorator має той самий інтерфейс,
 * що й інші компоненти. Основною метою цього класу
 * є визначення інтерфейсу упаковки для всіх
 * конкретних декораторів. Стандартна реалізація коду
 * упаковки може включати поле для зберігання упакованого
 * компонента та засоби його ініціалізації.
 */
class Decorator implements Component {
    protected component: Component;

    constructor(component: Component) {
        this.component = component;
    }

    /**
     * Декоратор делегує всю роботу загорнутому компоненту.
     */
    public operation(): string {
        return this.component.operation();
    }
}

/**
 * Concrete Decorators викликають об'єкт-обгортку
 * та певним чином змінюють її результат.
 */
class ConcreteDecoratorA extends Decorator {
    /**
     * Декоратори можуть викликати батьківську реалізацію
     * операції, замість безпосереднього виклику
     * упакованого об'єкта. Такий підхід спрощує
     * розширення класів декоратора.
     */
    public operation(): string {
        return `ConcreteDecoratorA(${super.operation()})`;
    }
}

/**
 * Декоратори можуть виконувати свою поведінку до або після
 * виклику загорнутого об'єкта.
 */
class ConcreteDecoratorB extends Decorator {
    public operation(): string {
        return `ConcreteDecoratorB(${super.operation()})`;
    }
}

/**
 * Клієнтський код працює з усіма об'єктами за допомогою
 * інтерфейсу Component. Таким чином він може залишатися
 * незалежним від конкретних класів компонентів,
 * з якими він працює.
 */
function clientCode(component: Component) {
    console.log(`RESULT: ${component.operation()}`);
}

/**
 * Таким чином клієнтський код може підтримувати обидва
 * прості компоненти...
 */
const simple = new ConcreteComponent();
console.log("Client: I've got a simple component:");
clientCode(simple);

/**
 * ...а також декоровані.
 *
 * Зверніть увагу, як декоратори можуть обернути не лише
 * прості компоненти, але й інші декоратори.
 */
const decorator1 = new ConcreteDecoratorA(simple);
const decorator2 = new ConcreteDecoratorB(decorator1);
console.log("Client: Now I've got a decorated component:");
clientCode(decorator2);
```
