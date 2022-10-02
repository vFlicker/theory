## Abstract Factory

Дає змогу створювати сімейства пов'язаних об'єктів, не прив'язуючись до конкретних класів створюваних об'єктів

**Приклад 1 (JavaScript)**

```js
class Employee {
    constructor(name) {
        this.name = name;
    }

    say() {
        console.log(`I am employee ${this.name}`);
    }
}

class EmployeeFactory {
    create(name) {
        return new Employee(name);
    }
}

class Vendor {
    constructor(name) {
        this.name = name;
    }

    say() {
        console.log(`I am vendor ${this.name}`);
    }
}

class VendorFactory {
    create(name) {
        return new Vendor(name);
    }
}

const persons = [];
const employeeFactory = new EmployeeFactory();
const vendorFactory = new VendorFactory();

persons.push(employeeFactory.create("Joan DiSilva"));
persons.push(employeeFactory.create("Tim O'Neill"));
persons.push(vendorFactory.create("Gerald Watson"));
persons.push(vendorFactory.create("Nicole McNight"));

for (const person of persons) {
    person.say();
}
```

**Приклад 1 (TypeScript)**

```ts
/**
 * Інтерфейс Abstract Factory оголошує набір методів,
 * які повертають різні абстрактні продукти. Ці продукти
 * називаються сімейством і пов'язані темою або концепцією
 * високого рівня. Вироби одного сімейства, як правило,
 * можуть взаємодіяти між собою. Сімейство продуктів
 * може мати кілька варіантів, але продукти одного
 * варіанту несумісні з продуктами іншого.
 */
interface AbstractFactory {
    createProductA(): AbstractProductA;

    createProductB(): AbstractProductB;
}

/**
 * Concrete Factories виробляють сімейство продуктів,
 * які належать до одного варіанту. Фабрика гарантує
 * сумісність отриманих продуктів. Зауважте, що сигнатури
 * методів Concrete Factory повертають абстрактний продукт,
 * а всередині методу створюється конкретний продукт.
 */
class ConcreteFactory1 implements AbstractFactory {
    public createProductA(): AbstractProductA {
        return new ConcreteProductA1();
    }

    public createProductB(): AbstractProductB {
        return new ConcreteProductB1();
    }
}

/**
 * Кожна Concrete Factory має відповідний варіант
 * продукції.
 */
class ConcreteFactory2 implements AbstractFactory {
    public createProductA(): AbstractProductA {
        return new ConcreteProductA2();
    }

    public createProductB(): AbstractProductB {
        return new ConcreteProductB2();
    }
}

/**
 * Кожен окремий продукт сімейства продуктів повинен мати
 * базовий інтерфейс. Усі варіанти продукту мають
 * реалізовувати цей інтерфейс.
 */
interface AbstractProductA {
    usefulFunctionA(): string;
}

/**
 * Ці Concrete Products створені відповідними
 * Concrete Factories.
 */
class ConcreteProductA1 implements AbstractProductA {
    public usefulFunctionA(): string {
        return "The result of the product A1.";
    }
}

class ConcreteProductA2 implements AbstractProductA {
    public usefulFunctionA(): string {
        return "The result of the product A2.";
    }
}

/**
 * Ось базовий інтерфейс іншого продукту. Всі продукти
 * можуть взаємодіяти один з одним, але правильна взаємодія
 * можлива лише між продуктами одного конкретного варіанту.
 */
interface AbstractProductB {
    /**
     * Продукт Б здатний виконувати свої дії...
     */
    usefulFunctionB(): string;

    /**
     * ...але він також може співпрацювати з ProductA.
     *
     * Abstract Factory гарантує, що всі продукти, які вона
     * створює, мають однаковий варіант і, отже, сумісні.
     */
    anotherUsefulFunctionB(collaborator: AbstractProductA): string;
}

/**
 * Ці Concrete Products створені відповідними
 * Concrete Factories
 */
class ConcreteProductB1 implements AbstractProductB {
    public usefulFunctionB(): string {
        return "The result of the product B1.";
    }

    /**
     * Варіант продукту B1 може правильно працювати лише
     * з варіантом продукту A1. Тим не менш, він приймає
     * будь-який екземпляр AbstractProductA як аргумент..
     */
    public anotherUsefulFunctionB(collaborator: AbstractProductA): string {
        const result = collaborator.usefulFunctionA();
        return `The result of the B1 collaborating with the (${result})`;
    }
}

class ConcreteProductB2 implements AbstractProductB {
    public usefulFunctionB(): string {
        return "The result of the product B2.";
    }

    /**
     * Варіант продукту B2 може правильно працювати лише
     * з варіантом продукту A2. Тим не менш, він приймає
     * будь-який екземпляр AbstractProductA як аргумент.
     */
    public anotherUsefulFunctionB(collaborator: AbstractProductA): string {
        const result = collaborator.usefulFunctionA();
        return `The result of the B2 collaborating with the (${result})`;
    }
}

/**
 * Клієнтський код працює з фабриками та продуктами лише
 * через абстрактні типи: AbstractFactory
 * та AbstractProduct. Це дозволяє вам передати будь-яку
 * фабрику або підклас продукту в код клієнта,
 * не порушуючи його.
 */
function clientCode(factory: AbstractFactory) {
    const productA = factory.createProductA();
    const productB = factory.createProductB();

    console.log(productB.usefulFunctionB());
    console.log(productB.anotherUsefulFunctionB(productA));
}

/**
 * Клієнтський код може працювати з будь-яким конкретним
 * фабричним класом.
 */
console.log("Client: Testing client code with the first factory type...");
clientCode(new ConcreteFactory1());

console.log(
    "Client: Testing the same client code with the second factory type..."
);
clientCode(new ConcreteFactory2());
```
