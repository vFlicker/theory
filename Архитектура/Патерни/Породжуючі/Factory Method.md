## Factory Method (фабричний метод)

Визначає загальний інтерфейс для створення об'єктів у суперкласі, дозволяючи підкласам змінювати тип створюваних об'єктів

**Приклад 1 (TypeScript)**

```ts
abstract class Department {
    public abstract createEmployee($id);

    public fire(id) {
        const employee = this.createEmployee(id);
        employee.paySalary();
        employee.dismiss();
    }
}

class ITDepartment extends Department {
    public createEmployee(id) {
        return new Programmer(id);
    }
}

class AccountingDepartment extends Department {
    public createEmployee(id) {
        return new Accountant(id);
    }
}
```

**Приклад 2 (TypeScript)**

```ts
/**
 * Клас Creator оголошує фабричний метод, який має
 * повертати об'єкт класу Product. Підкласи Creator
 * зазвичай надають реалізація цього методу.
 */
abstract class Creator {
    /**
     * Зауважте, що Creator також може надати певну
     * реалізацію фабричного методу за замовчуванням.
     */
    public abstract factoryMethod(): Product;

    /**
     * Також зауважте, що, незважаючи на назву, основним
     * обов'язком Creator є не створення продуктів.
     * Зазвичай він містить певну основну бізнес-логіку, яка
     * покладається на об'єкти Product, повернуті фабричним
     * методом. Підкласи можуть опосередковано змінювати цю
     * бізнес-логіку, перекриваючи фабричний метод
     * і повертаючи з нього інший тип продукту.
     */
    public someOperation(): string {
        // Викличте фабричний метод, щоб створити об'єкт Product.
        const product = this.factoryMethod();
        // Тепер використовуйте продукт.
        return `Creator: The same creator's code has just worked with ${product.operation()}`;
    }
}

/**
 * Творці Concrete замінюють фабричний метод, щоб змінити
 * тип отриманого продукту.
 */
class ConcreteCreator1 extends Creator {
    /**
     * Зверніть увагу, що в сигнатурі методу все ще
     * використовується абстрактний тип продукту,
     * незважаючи на те, що конкретний продукт фактично
     * повертається з методу. Таким чином Creator може
     * залишатися незалежним від конкретних класів продуктів.
     */
    public factoryMethod(): Product {
        return new ConcreteProduct1();
    }
}

class ConcreteCreator2 extends Creator {
    public factoryMethod(): Product {
        return new ConcreteProduct2();
    }
}

/**
 * Інтерфейс продукту оголошує операції, які мають
 * реалізовувати всі конкретні продукти.
 */
interface Product {
    operation(): string;
}

/**
 * Concrete Products надають різні реалізації інтерфейсу Product.
 */
class ConcreteProduct1 implements Product {
    public operation(): string {
        return "{Result of the ConcreteProduct1}";
    }
}

class ConcreteProduct2 implements Product {
    public operation(): string {
        return "{Result of the ConcreteProduct2}";
    }
}

/**
 * Клієнтський код працює з екземпляром конкретного творця,
 * хоча й через його базовий інтерфейс. Поки клієнт
 * продовжує працювати з творцем через базовий інтерфейс,
 * ви можете передати йому будь-який підклас творця.
 */
function clientCode(creator: Creator) {
    console.log(
        "Client: I'm not aware of the creator's class, but it still works."
    );
    console.log(creator.someOperation());
}

/**
 * Програма вибирає тип творця залежно від конфігурації
 * чи середовища.
 */
console.log("App: Launched with the ConcreteCreator1.");
clientCode(new ConcreteCreator1());

console.log("App: Launched with the ConcreteCreator2.");
clientCode(new ConcreteCreator2());
```
