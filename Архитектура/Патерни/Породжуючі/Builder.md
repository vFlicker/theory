## Builder (будівельник)

Дає змогу створювати складні об'єкти крок за кроком. Будівельник дає можливість використовувати один і той самий код будівництва для отримання різних відображень об'єктів

**Приклад 1 (JavaScript)**

```js
class Shop {
    construct(builder) {
        builder.step1();
        builder.step2();
        return builder.get();
    }
}

class Car {
    doors = 0;

    addParts() {
        this.doors = 4;
    }

    say() {
        console.log("I am a " + this.doors + "-door car");
    }
}

class Truck {
    doors = 0;

    addParts() {
        this.doors = 2;
    }

    say() {
        console.log("I am a " + this.doors + "-door truck");
    }
}

class CarBuilder {
    car = null;

    step1() {
        this.car = new Car();
    }

    step2() {
        this.car.addParts();
    }

    get() {
        return this.car;
    }
}

class TruckBuilder {
    truck = null;

    step1() {
        this.truck = new Truck();
    }

    step2() {
        this.truck.addParts();
    }

    get() {
        return this.truck;
    }
}

const shop = new Shop();
const carBuilder = new CarBuilder();
const truckBuilder = new TruckBuilder();
const car = shop.construct(carBuilder);
const truck = shop.construct(truckBuilder);

car.say();
truck.say();
```

**Приклад 2 (TypeScript)**

```ts
/**
 * Інтерфейс Builder визначає методи для створення різних
 * частин об'єктів Product.
 */
interface Builder {
    producePartA(): void;
    producePartB(): void;
    producePartC(): void;
}

/**
 * Класи Concrete Builder слідують інтерфейсу Builder
 * і забезпечують конкретні реалізації етапів будівництва.
 * Ваша програма може мати кілька варіантів Builders,
 * реалізованих по-різному.
 */
class ConcreteBuilder1 implements Builder {
    private product: Product1;

    /**
     * Свіжий екземпляр конструктора повинен містити
     * порожній об'єкт продукту, який використовується
     * в подальшій збірці.
     */
    constructor() {
        this.reset();
    }

    public reset(): void {
        this.product = new Product1();
    }

    /**
     * Усі етапи виробництва працюють з одним екземпляром
     * продукту.
     */
    public producePartA(): void {
        this.product.parts.push("PartA1");
    }

    public producePartB(): void {
        this.product.parts.push("PartB1");
    }

    public producePartC(): void {
        this.product.parts.push("PartC1");
    }

    /**
     * Передбачається, що Concrete Builders нададуть власні
     * методи для отримання результатів. Це тому, що різні
     * типи конструкторів можуть створювати абсолютно різні
     * продукти, які не мають однакового інтерфейсу.
     * Таким чином, такі методи не можуть бути оголошені
     * в базовому інтерфейсі Builder (принаймні у статично
     * типізованій мові програмування).
     *
     * Зазвичай після повернення кінцевого результату
     * клієнту очікується, що екземпляр конструктора буде
     * готовий розпочати виробництво іншого продукту.
     * Ось чому зазвичай викликається метод reset у кінці
     * тіла методу `getProduct`. Однак така поведінка
     * не є обов'язковою, і ви можете зробити так, щоб ваші
     * розробники чекали явного виклику скидання
     * з клієнтського коду, перш ніж позбутися попереднього
     * результату.
     */
    public getProduct(): Product1 {
        const result = this.product;
        this.reset();
        return result;
    }
}

/**
 * Використовувати шаблон Builder має сенс лише тоді,
 * коли ваші продукти досить складні та вимагають великої
 * конфігурації.
 *
 * На відміну від інших шаблонів створення, різні
 * Concrete Builders можуть виробляти непов'язані продукти.
 * Іншими словами, результати різних конструкторів можуть
 * не завжди мати однаковий інтерфейс.
 */
class Product1 {
    public parts: string[] = [];

    public listParts(): void {
        console.log(`Product parts: ${this.parts.join(", ")}\n`);
    }
}

/**
 * Director відповідає лише за виконання будівельних етапів
 * у певній послідовності. Це зручно при виготовленні
 * виробів за певним замовленням або конфігурацією.
 * Строго кажучи, клас Director необов'язковий, оскільки
 * клієнт може безпосередньо керувати конструкторами.
 */
class Director {
    private builder: Builder;

    /**
     * Director працює з будь-яким екземпляром
     * конструктора, який клієнтський код передає йому.
     * Таким чином, код клієнта може змінити кінцевий
     * тип щойно зібраного продукту.
     */
    public setBuilder(builder: Builder): void {
        this.builder = builder;
    }

    /**
     * Director може побудувати кілька варіантів продукту,
     * використовуючи однакові етапи побудови.
     */
    public buildMinimalViableProduct(): void {
        this.builder.producePartA();
    }

    public buildFullFeaturedProduct(): void {
        this.builder.producePartA();
        this.builder.producePartB();
        this.builder.producePartC();
    }
}

/**
 * Код клієнта створює об'єкт builder, передає його
 * директору, а потім ініціює процес побудови.
 * Кінцевий результат отримується з об'єкта builder.
 */
function clientCode(director: Director) {
    const builder = new ConcreteBuilder1();
    director.setBuilder(builder);

    console.log("Standard basic product:");
    director.buildMinimalViableProduct();
    builder.getProduct().listParts();

    console.log("Standard full featured product:");
    director.buildFullFeaturedProduct();
    builder.getProduct().listParts();

    // Remember, the Builder pattern can be used without a Director class.
    console.log("Custom product:");
    builder.producePartA();
    builder.producePartC();
    builder.getProduct().listParts();
}

const director = new Director();
clientCode(director);
```
