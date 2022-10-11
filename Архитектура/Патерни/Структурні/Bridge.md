## Bridge (міст)

Розділяє один або кілька класів на дві окремі ієрархії — абстракцію та реалізацію, дозволяючи змінювати код в одній гілці класів, незалежно від іншої

**Приклад 1 (JavaScript)**

```js
/*
  Input devices
*/
class Gestures {
    constructor(output) {
        this.output = output;
    }

    tap() {
        this.output.click();
    }
    swipe() {
        this.output.move();
    }
    pan() {
        this.output.drag();
    }
    pinch() {
        this.output.zoom();
    }
}

class Mouse {
    constructor(output) {
        this.output = output;
    }

    click() {
        this.output.click();
    }
    move() {
        this.output.move();
    }
    down() {
        this.output.drag();
    }
    wheel() {
        this.output.zoom();
    }
}

/*
  Output devices
*/
class Screen {
    click() {
        console.log("Screen select");
    }
    move() {
        console.log("Screen move");
    }
    drag() {
        console.log("Screen drag");
    }
    zoom() {
        console.log("Screen zoom in");
    }
}

class Audio {
    click() {
        console.log("Sound oink");
    }
    move() {
        console.log("Sound waves");
    }
    drag() {
        console.log("Sound screetch");
    }
    zoom() {
        console.log("Sound volume up");
    }
}

const screen = new Screen();
const audio = new Audio();

const hand = new Gestures(screen);
const mouse = new Mouse(audio);

hand.tap();
hand.swipe();
hand.pinch();

mouse.click();
mouse.move();
mouse.wheel();
```

**Приклад 2 (TypeScript)**

```ts
/**
 * Abstraction визначає інтерфейс для «контрольної» частини
 * двох ієрархій класів. Він підтримує посилання на об'єкт
 * ієрархії Implementation та делегує всю реальну роботу цьому
 * об'єкту.
 */
class Abstraction {
    protected implementation: Implementation;

    constructor(implementation: Implementation) {
        this.implementation = implementation;
    }

    public operation(): string {
        const result = this.implementation.operationImplementation();
        return `Abstraction: Base operation with:\n${result}`;
    }
}

/**
 * Ви можете розширити Abstraction, не змінюючи класи
 * реалізації.
 */
class ExtendedAbstraction extends Abstraction {
    public operation(): string {
        const result = this.implementation.operationImplementation();
        return `ExtendedAbstraction: Extended operation with:\n${result}`;
    }
}

/**
 * Implementation визначає інтерфейс для всіх класів
 * реалізації. Він не повинен відповідати інтерфейсу
 * Abstraction. Насправді ці два інтерфейси можуть бути
 * абсолютно різними. Зазвичай інтерфейс Implementation
 * забезпечує лише примітивні операції, тоді як Abstraction
 * визначає операції вищого рівня на основі цих примітивів.
 */
interface Implementation {
    operationImplementation(): string;
}

/**
 * Кожна конкретна Implementation відповідає певній
 * платформі та реалізує інтерфейс Implementation
 * за допомогою API цієї платформи.
 */
class ConcreteImplementationA implements Implementation {
    public operationImplementation(): string {
        return "ConcreteImplementationA: Here's the result on the platform A.";
    }
}

class ConcreteImplementationB implements Implementation {
    public operationImplementation(): string {
        return "ConcreteImplementationB: Here's the result on the platform B.";
    }
}

/**
 * За винятком фази ініціалізації, де об'єкт Abstraction
 * зв'язується з конкретним об'єктом реалізації,
 * клієнтський код має залежати лише від класу Abstraction.
 * Таким чином клієнтський код може підтримувати будь-яку
 * комбінацію абстракції та реалізації.
 */
function clientCode(abstraction: Abstraction) {
    console.log(abstraction.operation());
}

/**
 * Клієнтський код повинен мати можливість працювати
 * з будь-якою попередньо налаштованою комбінацією
 * абстракції та реалізації.
 */
let implementation = new ConcreteImplementationA();
let abstraction = new Abstraction(implementation);
clientCode(abstraction);

implementation = new ConcreteImplementationB();
abstraction = new ExtendedAbstraction(implementation);
clientCode(abstraction);
```
