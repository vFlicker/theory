## Flyweight (пристосуванець / легковаговик)

Дає змогу вмістити більшу кількість об'єктів у відведеній оперативній пам'яті. Легковаговик заощаджує пам'ять, розподіляючи спільний стан об'єктів між собою, замість зберігання однакових даних у кожному об'єкті

**Приклад 1 (JavaScript)**

```js
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

const books = new Map();
const bookList = [];

const addBook = (title, author, isbn, availability, sales) => {
    const book = {
        ...createBook(title, author, isbn),
        sales,
        availability,
        isbn,
    };

    bookList.push(book);
    return book;
};

const createBook = (title, author, isbn) => {
    const existingBook = books.has(isbn);

    if (existingBook) {
        return books.get(isbn);
    }

    const book = new Book(title, author, isbn);
    books.set(isbn, book);

    return book;
};

addBook("Harry Potter", "JK Rowling", "AB123", false, 100);
addBook("Harry Potter", "JK Rowling", "AB123", true, 50);
addBook("To Kill a Mockingbird", "Harper Lee", "CD345", true, 10);
addBook("To Kill a Mockingbird", "Harper Lee", "CD345", false, 20);
addBook("The Great Gatsby", "F. Scott Fitzgerald", "EF567", false, 20);

console.log("Total amount of copies: ", bookList.length);
console.log("Total amount of books: ", books.size);
```

**Приклад 2 (JavaScript)**

```js
class Flyweight {
    constructor(make, model, processor) {
        this.make = make;
        this.model = model;
        this.processor = processor;
    }
}

class FlyweightFactory {
    static flyweights = {};

    static get(make, model, processor) {
        let type = FlyWeightFactory.flyweights[make + model];

        if (!type) {
            type = new Flyweight(make, model, processor);
            FlyWeightFactory.flyweights[make + model] = type;
        }

        return type;
    }

    static getCount() {
        return Object.keys(FlyweightFactory.flyweights).length;
    }
}

class ComputerCollection {
    #computers = {};
    #count = 0;

    add(make, model, processor, memory, tag) {
        this.#computers[tag] = new Computer(
            make,
            model,
            processor,
            memory,
            tag
        );
        this.#count++;
    }

    get(tag) {
        return this.#computers[tag];
    }

    getCount() {
        return this.#count;
    }
}

class Computer {
    constructor(make, model, processor, memory, tag) {
        this.flyweight = FlyweightFactory.get(make, model, processor);
        this.memory = memory;
        this.tag = tag;
    }

    getMake() {
        return this.flyweight.make;
    }
}

const computers = new ComputerCollection();

computers.add("Dell", "Studio XPS", "Intel", "5G", "Y755P");
computers.add("Dell", "Studio XPS", "Intel", "6G", "X997T");
computers.add("Dell", "Studio XPS", "Intel", "2G", "U8U80");
computers.add("Dell", "Studio XPS", "Intel", "2G", "NT777");
computers.add("Dell", "Studio XPS", "Intel", "2G", "0J88A");
computers.add("HP", "Envy", "Intel", "4G", "CNU883701");
computers.add("HP", "Envy", "Intel", "2G", "TXU003283");

console.log("Computers: " + computers.getCount());
console.log("Flyweights: " + FlyweightFactory.getCount());
```

**Приклад 3 (TypeScript)**

```ts
/**
 * Flyweight зберігає загальну частину стану (так званий
 * внутрішній стан), який належить кільком реальним
 * бізнес-об'єктам. Flyweight приймає решту стану
 * (зовнішній стан, унікальний для кожної сутності)
 * через параметри методу.
 */
class Flyweight {
    private sharedState: any;

    constructor(sharedState: any) {
        this.sharedState = sharedState;
    }

    public operation(uniqueState): void {
        const s = JSON.stringify(this.sharedState);
        const u = JSON.stringify(uniqueState);
        console.log(
            `Flyweight: Displaying shared (${s}) and unique (${u}) state.`
        );
    }
}

/**
 * Flyweight Factory створює та керує об'єктами Flyweight.
 * Це гарантує правильний розподіл ваги. Коли клієнт
 * запитує ваговик, фабрика або повертає наявний екземпляр,
 * або створює новий, якщо він ще не існує.
 */
class FlyweightFactory {
    private flyweights: { [key: string]: Flyweight } = <any>{};

    constructor(initialFlyweights: string[][]) {
        for (const state of initialFlyweights) {
            this.flyweights[this.getKey(state)] = new Flyweight(state);
        }
    }

    /**
     * Повертає хеш рядка Flyweight для заданого стану.
     */
    private getKey(state: string[]): string {
        return state.join("_");
    }

    /**
     * Повертає наявний Flyweight із заданим станом
     * або створює новий.
     */
    public getFlyweight(sharedState: string[]): Flyweight {
        const key = this.getKey(sharedState);

        if (!(key in this.flyweights)) {
            console.log(
                "FlyweightFactory: Can't find a flyweight, creating new one."
            );
            this.flyweights[key] = new Flyweight(sharedState);
        } else {
            console.log("FlyweightFactory: Reusing existing flyweight.");
        }

        return this.flyweights[key];
    }

    public listFlyweights(): void {
        const count = Object.keys(this.flyweights).length;
        console.log(`\nFlyweightFactory: I have ${count} flyweights:`);
        for (const key in this.flyweights) {
            console.log(key);
        }
    }
}

/**
 * Клієнтський код зазвичай створює купу попередньо
 * заповнених вагоподібних елементів на етапі ініціалізації
 * програми.
 */
const factory = new FlyweightFactory([
    ["Chevrolet", "Camaro2018", "pink"],
    ["Mercedes Benz", "C300", "black"],
    ["Mercedes Benz", "C500", "red"],
    ["BMW", "M5", "red"],
    ["BMW", "X6", "white"],
]);
factory.listFlyweights();

function addCarToPoliceDatabase(
    ff: FlyweightFactory,
    plates: string,
    owner: string,
    brand: string,
    model: string,
    color: string
) {
    console.log("\nClient: Adding a car to database.");
    const flyweight = ff.getFlyweight([brand, model, color]);

    // Клієнтський код або зберігає, або обчислює зовнішній
    // стан і передає його методам ваги.
    flyweight.operation([plates, owner]);
}

addCarToPoliceDatabase(factory, "CL234IR", "James Doe", "BMW", "M5", "red");

addCarToPoliceDatabase(factory, "CL234IR", "James Doe", "BMW", "X1", "red");

factory.listFlyweights();
```
