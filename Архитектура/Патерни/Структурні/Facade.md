## Facade (фасад)

Надає простий (але урізаний) інтерфейс до складної системи об'єктів, бібліотеки або фреймворку

**Приклад 1 (JavaScript)**

```js
class Bank {
    verify(name, amount) {
        return true;
    }
}

class Credit {
    get(name) {
        return true;
    }
}

class Background {
    check(name) {
        return true;
    }
}

class Mortgage {
    constructor(name) {
        this.name = name;
    }

    applyFor(amount) {
        let result = "approved";

        if (!new Bank().verify(this.name, amount)) {
            result = "denied";
        } else if (!new Credit().get(this.name)) {
            result = "denied";
        } else if (!new Background().check(this.name)) {
            result = "denied";
        }

        return `${this.name} has been ${result} for a ${amount} mortgage`;
    }
}

const mortgage = new Mortgage("Joan Templeton");
const result = mortgage.applyFor("$100,000");

console.log(result);
```

**Приклад 2 (TypeScript)**

```ts
/**
 * Клас Facade забезпечує простий інтерфейс для складної
 * логіки однієї або кількох підсистем. Фасад делегує
 * клієнтські запити відповідним об'єктам у підсистемі.
 * Фасад також відповідає за керування їхнім життєвим
 * циклом. Усе це захищає клієнта від небажаної
 * складності підсистеми.
 */
 class Facade {
    protected subsystem1: Subsystem1;

    protected subsystem2: Subsystem2;

    /**
     * Залежно від потреб вашої програми, ви можете надати
     * Facade існуючі об'єкти підсистеми або змусити Facade
     * створити їх самостійно.
     */
    constructor(subsystem1?: Subsystem1, subsystem2?: Subsystem2) {
        this.subsystem1 = subsystem1 || new Subsystem1();
        this.subsystem2 = subsystem2 || new Subsystem2();
    }

    /**
     * Методи Facade — це зручні ярлики для доступу
     * до складної функціональності підсистем. Однак
     * клієнти отримують лише частину можливостей
     * підсистеми.
     */
    public operation(): string {
        let result = 'Facade initializes subsystems:\n';
        result += this.subsystem1.operation1();
        result += this.subsystem2.operation1();
        result += 'Facade orders subsystems to perform the action:\n';
        result += this.subsystem1.operationN();
        result += this.subsystem2.operationZ();

        return result;
    }
}

/**
 * Підсистема може приймати запити як від фасаду,
 * так і безпосередньо від клієнта. У будь-якому випадку,
 * для підсистеми Facade — це ще один клієнт,
 * і він не є частиною підсистеми.
 */
class Subsystem1 {
    public operation1(): string {
        return 'Subsystem1: Ready!\n';
    }

    // ...

    public operationN(): string {
        return 'Subsystem1: Go!\n';
    }
}

/**
 * Деякі фасади можуть працювати з кількома підсистемами
 * одночасно.
 */
class Subsystem2 {
    public operation1(): string {
        return 'Subsystem2: Get ready!\n';
    }

    public operationZ(): string {
        return 'Subsystem2: Fire!';
    }
}

/**
 * Клієнтський код працює зі складними підсистемами через
 * простий інтерфейс, наданий Facade. Коли фасад керує
 * життєвим циклом підсистеми, клієнт може навіть не знати
 * про існування підсистеми. Такий підхід дозволяє тримати
 * складність під контролем.
 */
function clientCode(facade: Facade) {
    console.log(facade.operation());
}

/**
 * У коді клієнта можуть бути вже створені деякі з об'єктів
 * підсистеми. У цьому випадку, можливо, варто
 * ініціалізувати Facade цими об'єктами замість того,
 * щоб дозволяти Facade створювати нові екземпляри.
 */
const subsystem1 = new Subsystem1();
const subsystem2 = new Subsystem2();
const facade = new Facade(subsystem1, subsystem2);
clientCode(facade);
```