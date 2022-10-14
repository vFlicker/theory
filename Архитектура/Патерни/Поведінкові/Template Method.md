## Template Method (шаблонний метод)

Визначає кістяк алгоритму, перекладаючи відповідальність за деякі його кроки на підкласи. Патерн дозволяє підкласам перевизначати кроки алгоритму, не змінюючи його загальної структури

**Приклад 1 (JavaScript)**

```js
class Datastore {
    process() {
        this.connect();
        this.select();
        this.disconnect();
        return true;
    }
}

class MySQL extends Datastore {
    connect() {
        console.log("MySQL: connect step");
    }

    select() {
        console.log("MySQL: select step");
    }

    disconnect() {
        console.log("MySQL: disconnect step");
    }
}

const mySql = new MySQL();
mySql.process();
```

**Приклад 2 (TypeScript)**

```ts
/**
 * AbstractClass визначає шаблонний метод, який містить
 * скелет деякого алгоритму, що складається із викликів
 * (зазвичай) абстрактних примітивних операцій.
 *
 * ConcreteClass підкласи повинні реалізовувати ці
 * операції, але залишати сам метод шаблону недоторканим.
 */
abstract class AbstractClass {
    /**
     * Шаблонний метод визначає скелет алгоритму.
     */
    public templateMethod(): void {
        this.baseOperation1();
        this.requiredOperations1();
        this.baseOperation2();
        this.hook1();
        this.requiredOperation2();
        this.baseOperation3();
        this.hook2();
    }

    /**
     * Ці операції вже реалізовані.
     */
    protected baseOperation1(): void {
        console.log("AbstractClass says: I am doing the bulk of the work");
    }

    protected baseOperation2(): void {
        console.log(
            "AbstractClass says: But I let subclasses override some operations"
        );
    }

    protected baseOperation3(): void {
        console.log(
            "AbstractClass says: But I am doing the bulk of the work anyway"
        );
    }

    /**
     * Ці операції мають бути реалізовані в підкласах.
     */
    protected abstract requiredOperations1(): void;

    protected abstract requiredOperation2(): void;

    /**
     * Це «гачки». Підкласи можуть замінити їх,
     * але це не є обов'язковим, оскільки хуки вже мають
     * стандартну (але порожню) реалізацію. Хуки надають
     * додаткові точки розширення в деяких ключових місцях
     * алгоритму.
     */
    protected hook1(): void {}

    protected hook2(): void {}
}

/**
 * ConcreteClass повинні реалізовувати всі абстрактні
 * операції базового класу. Вони також можуть перевизначати
 * деякі операції за допомогою реалізації за замовчуванням.
 */
class ConcreteClass1 extends AbstractClass {
    protected requiredOperations1(): void {
        console.log("ConcreteClass1 says: Implemented Operation1");
    }

    protected requiredOperation2(): void {
        console.log("ConcreteClass1 says: Implemented Operation2");
    }
}

/**
 * Зазвичай ConcreteClass перевизначають лише частину
 * операцій базового класу.
 */
class ConcreteClass2 extends AbstractClass {
    protected requiredOperations1(): void {
        console.log("ConcreteClass2 says: Implemented Operation1");
    }

    protected requiredOperation2(): void {
        console.log("ConcreteClass2 says: Implemented Operation2");
    }

    protected hook1(): void {
        console.log("ConcreteClass2 says: Overridden Hook1");
    }
}

/**
 * Код клієнта викликає метод шаблону для виконання
 * алгоритму. Код клієнта не повинен знати конкретний клас
 * об'єкта, з яким він працює, якщо він працює з об'єктами
 * через інтерфейс їх базового класу.
 */
function clientCode(abstractClass: AbstractClass) {
    abstractClass.templateMethod();
}

console.log("Same client code can work with different subclasses:");
clientCode(new ConcreteClass1());

console.log("Same client code can work with different subclasses:");
clientCode(new ConcreteClass2());
```
