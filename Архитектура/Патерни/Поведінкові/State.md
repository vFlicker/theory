## State (стан)

Дає змогу об'єктам змінювати поведінку в залежності від їхнього стану. Ззовні створюється враження, ніби змінився клас об'єкта

**Приклад 1 (JavaScript)**

```js
class AbstractState {
    constructor(trafficLight) {
        if (new.target === AbstractState) {
            throw new Error("Can't instantiate Abstract, only concrete one.");
        }

        this._trafficLight = trafficLight;
    }

    go() {
        throw new Error(`Abstract method not implemented: ${this.go.name}`);
    }
}

class RedState extends AbstractState {
    go() {
        console.log("Red --> for 1 minute");
        this._trafficLight.changeState(new GreenState(light));
    }
}

class YellowState extends AbstractState {
    go() {
        console.log("Yellow --> for 10 seconds");
        this._trafficLight.changeState(new RedState(light));
    }
}

class GreenState extends AbstractState {
    go() {
        console.log("Green --> for 1 minute");
        this._trafficLight.changeState(new YellowState(light));
    }
}

class TrafficLight {
    #count = 0;
    #state = new RedState(this);

    changeState(state) {
        if (this.#count++ >= 10) return;
        this.#state = state;
        this.#state.go();
    }

    start() {
        this.#state.go();
    }
}

const light = new TrafficLight();
light.start();
```

**Приклад 2 (TypeScript)**

```ts
/**
 * Context визначає інтерфейс, який цікавить клієнтів.
 * Він також підтримує посилання на екземпляр підкласу
 * стану, який представляє поточний стан контексту.
 */
class Context {
    /**
     * @type {State} Посилання на поточний стан контексту.
     */
    private state: State;

    constructor(state: State) {
        this.transitionTo(state);
    }

    /**
     * Context дозволяє змінювати об'єкт State під час
     * виконання.
     */
    public transitionTo(state: State): void {
        console.log(`Context: Transition to ${(<any>state).constructor.name}.`);
        this.state = state;
        this.state.setContext(this);
    }

    /**
     * Context делегує частину своєї поведінки поточному
     * об'єкту стану.
     */
    public request1(): void {
        this.state.handle1();
    }

    public request2(): void {
        this.state.handle2();
    }
}

/**
 * Базовий клас State оголошує методи, які має реалізувати
 * весь Concrete State, а також надає зворотне посилання
 * на об'єкт Context, пов'язаний із State. Це зворотне
 * посилання може використовуватися державами для переходу
 * контексту в інший стан.
 */
abstract class State {
    protected context: Context;

    public setContext(context: Context) {
        this.context = context;
    }

    public abstract handle1(): void;

    public abstract handle2(): void;
}

/**
 * Concrete States реалізують різні поведінки, пов'язані
 * зі станом Context.
 */
class ConcreteStateA extends State {
    public handle1(): void {
        console.log("ConcreteStateA handles request1.");
        console.log("ConcreteStateA wants to change the state of the context.");
        this.context.transitionTo(new ConcreteStateB());
    }

    public handle2(): void {
        console.log("ConcreteStateA handles request2.");
    }
}

class ConcreteStateB extends State {
    public handle1(): void {
        console.log("ConcreteStateB handles request1.");
    }

    public handle2(): void {
        console.log("ConcreteStateB handles request2.");
        console.log("ConcreteStateB wants to change the state of the context.");
        this.context.transitionTo(new ConcreteStateA());
    }
}

/**
 * Код клієнта.
 */
const context = new Context(new ConcreteStateA());
context.request1();
context.request2();
```
