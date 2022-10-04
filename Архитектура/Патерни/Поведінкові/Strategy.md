## Strategy

Визначає сімейство схожих алгоритмів і розміщує кожен з них у власному класі. Після цього алгоритми можна заміняти один на інший прямо під час виконання програми

**Приклад 1 (JavaScript)**

```js
class Shipping {
    company = null;

    setStrategy(company) {
        this.company = company;
    }

    calculate(name) {
        return this.company.calculate(name);
    }
}

class UPS {
    calculate(name) {
        // calculations...
        return "$45.95";
    }
}

class USPS {
    calculate(name) {
        // calculations...
        return "$39.40";
    }
}

class Fedex {
    calculate(name) {
        // calculations...
        return "$43.20";
    }
}

const package = { from: "76712", to: "10012", weigth: "lkg" };

// the 3 strategies
const ups = new UPS();
const usps = new USPS();
const fedex = new Fedex();

const shipping = new Shipping();

shipping.setStrategy(ups);
console.log(`UPS Strategy: ${shipping.calculate(package)}`);
shipping.setStrategy(usps);
console.log(`USPS Strategy: ${shipping.calculate(package)}`);
shipping.setStrategy(fedex);
console.log(`Fedex Strategy: ${shipping.calculate(package)}`);
```

**Приклад 2 (TypeScript)**

```ts
/**
 * Контекст визначає інтерфейс, який цікавить клієнтів.
 */
class Context {
    /**
     * @type {Strategy} Контекст підтримує посилання на один
     * із об'єктів стратегії. Контекст не знає конкретного
     * класу стратегії. Він має працювати з усіма стратегіями
     * через інтерфейс стратегії.
     */
    private strategy: Strategy;

    /**
     * Зазвичай контекст приймає стратегію через конструктор,
     * але також надає сетер для її зміни під час виконання.
     */
    constructor(strategy: Strategy) {
        this.strategy = strategy;
    }

    /**
     * Зазвичай контекст дозволяє замінити об'єкт Strategy
     * під час виконання.
     */
    public setStrategy(strategy: Strategy) {
        this.strategy = strategy;
    }

    /**
     * Контекст делегує певну роботу об'єкту Strategy замість
     * реалізації кількох версій алгоритму окремо.
     */
    public doSomeBusinessLogic(): void {
        this.strategy.doAlgorithm(["a", "b", "c", "d", "e"]);
    }
}

/**
 * Інтерфейс Strategy оголошує операції, спільні для всіх
 * підтримуваних версій деякого алгоритму.
 *
 * Контекст використовує цей інтерфейс для виклику
 * алгоритму, визначеного Concrete Strategies.
 */
interface Strategy {
    doAlgorithm(data: string[]): string[];
}

/**
 * Concrete Strategies реалізують алгоритм, дотримуючись
 * базового інтерфейсу стратегії. Інтерфейс робить їх
 * взаємозамінними в контексті.
 */
class ConcreteStrategyA implements Strategy {
    public doAlgorithm(data: string[]): string[] {
        return data.sort();
    }
}

class ConcreteStrategyB implements Strategy {
    public doAlgorithm(data: string[]): string[] {
        return data.reverse();
    }
}

/**
 * Клієнтський код вибирає конкретну стратегію та передає
 * її в контекст. Клієнт повинен знати про відмінності
 * між стратегіями, щоб зробити правильний вибір.
 */
const context = new Context(new ConcreteStrategyA());
console.log("Client: Strategy is set to normal sorting.");
context.doSomeBusinessLogic();

console.log("Client: Strategy is set to reverse sorting.");
context.setStrategy(new ConcreteStrategyB());
context.doSomeBusinessLogic();
```
