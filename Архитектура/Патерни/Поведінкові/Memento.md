## Mediator (знімок)

Дає змогу зберігати та відновлювати минулий стан об'єктів, не розкриваючи подробиць їхньої реалізації

**Приклад 1 (JavaScript)**

```js
class Person {
    constructor(name, street, city, state) {
        this.name = name;
        this.street = street;
        this.city = city;
        this.state = state;
    }

    hydrate() {
        const memento = JSON.stringify(this);
        return memento;
    }

    dehydrate(memento) {
        const m = JSON.parse(memento);
        this.name = m.name;
        this.street = m.street;
        this.city = m.city;
        this.state = m.state;
    }
}

class CareTaker {
    #mementos = {};

    add(key, memento) {
        this.#mementos[key] = memento;
    }

    get(key) {
        return this.#mementos[key];
    }
}

const mike = new Person("Mike Foley", "1112 Main", "Dallas", "TX");
const john = new Person("John Wang", "48th Street", "San Jose", "CA");
const caretaker = new CareTaker();

/*
  save state
*/
caretaker.add(1, mike.hydrate());
caretaker.add(2, john.hydrate());

/*
  mess up their names
*/
mike.name = "King Kong";
john.name = "Superman";

/*
  restore original state
*/
mike.dehydrate(caretaker.get(1));
john.dehydrate(caretaker.get(2));

console.log(mike.name); // Mike Foley
console.log(john.name); // John Wang
```

**Приклад 2 (TypeScript)**

```ts
/**
 * Originator має певний важливий стан, який може
 * змінюватися з часом. Він також визначає метод
 * для збереження стану всередині memento та інший метод
 * для відновлення стану з нього.
 */
class Originator {
    /**
     * Для простоти стан ініціатора зберігається
     * в одній змінній.
     */
    private state: string;

    constructor(state: string) {
        this.state = state;
        console.log(`Originator: My initial state is: ${state}`);
    }

    /**
     * Бізнес-логіка Originator's може вплинути на його
     * внутрішній стан. Таким чином, клієнт повинен
     * створити резервну копію стану перед запуском
     * методів бізнес-логіки через метод save().
     */
    public doSomething(): void {
        console.log("Originator: I'm doing something important.");
        this.state = this.generateRandomString(30);
        console.log(`Originator: and my state has changed to: ${this.state}`);
    }

    private generateRandomString(length: number = 10): string {
        const charSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

        return Array.apply(null, { length })
            .map(() =>
                charSet.charAt(Math.floor(Math.random() * charSet.length))
            )
            .join("");
    }

    /**
     * Зберігає поточний стан у пам'ятці.
     */
    public save(): Memento {
        return new ConcreteMemento(this.state);
    }

    /**
     * Відновлює Originator's стан за memento об'єкту.
     */
    public restore(memento: Memento): void {
        this.state = memento.getState();
        console.log(`Originator: My state has changed to: ${this.state}`);
    }
}

/**
 * Інтерфейс Memento надає спосіб отримати метадані
 * memento, наприклад дату створення або назву.
 * Однак це не розкриває стан творця.
 */
interface Memento {
    getState(): string;

    getName(): string;

    getDate(): string;
}

/**
 * The Concrete Memento містить інфраструктуру для
 * зберігання стану Originator's.
 */
class ConcreteMemento implements Memento {
    private state: string;

    private date: string;

    constructor(state: string) {
        this.state = state;
        this.date = new Date().toISOString().slice(0, 19).replace("T", " ");
    }

    /**
     * Originator використовує цей метод під час
     * відновлення свого стану.
     */
    public getState(): string {
        return this.state;
    }

    /**
     * Решта методів використовуються Caretaker
     * для відображення метаданих.
     */
    public getName(): string {
        return `${this.date} / (${this.state.substr(0, 9)}...)`;
    }

    public getDate(): string {
        return this.date;
    }
}

/**
 * Caretaker не залежить від класу Concrete Memento.
 * Таким чином, він не має доступу до стану творця,
 * що зберігається всередині momento. Він працює з усіма
 * momentos через базовий інтерфейс Memento.
 */
class Caretaker {
    private mementos: Memento[] = [];

    private originator: Originator;

    constructor(originator: Originator) {
        this.originator = originator;
    }

    public backup(): void {
        console.log("\nCaretaker: Saving Originator's state...");
        this.mementos.push(this.originator.save());
    }

    public undo(): void {
        if (!this.mementos.length) {
            return;
        }
        const memento = this.mementos.pop();

        console.log(`Caretaker: Restoring state to: ${memento.getName()}`);
        this.originator.restore(memento);
    }

    public showHistory(): void {
        console.log("Caretaker: Here's the list of mementos:");
        for (const memento of this.mementos) {
            console.log(memento.getName());
        }
    }
}

/**
 * Код клієнта.
 */
const originator = new Originator("Super-duper-super-puper-super.");
const caretaker = new Caretaker(originator);

caretaker.backup();
originator.doSomething();

caretaker.backup();
originator.doSomething();

caretaker.backup();
originator.doSomething();

caretaker.showHistory();

console.log("\nClient: Now, let's rollback!\n");
caretaker.undo();

console.log("\nClient: Once more!\n");
caretaker.undo();
```
