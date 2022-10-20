## Data Mapper (перетворювач даних)

Шаблон проектування взаємодії з базою даних. Згідно з цим шаблоном інтерфейс об'єкта повинен містити методи CRUD, на противагу безпосередній взаємодії з базою даних.

Data mapper — це прошарок доступу до бази даних, що забезпечує двосторонню конвертацію даних з об'єкта (в оперативній пам'яті) до бази даних, і з бази даних знов у об'єкт. Шаблон повністю відповідає своїй назві - він полягає у створенні мапи відповідності між полями властивостей об'єкта та полем у БД, у якому зберігається значення властивостей. Таким чином зміна структури в БД вимагає лише зміни самої мапи й не зачіпає основний код проекту, так само програміст може змінити структуру об'єкта (в певних межах), залишивши базу даних незмінною

**Приклад 1 (TypeScript)**

```ts
class Foo {
    public id;
    public bar;

    public doSomething() {
        this.bar = uniqid();
    }
}

class FooMapper {
    protected db;

    constructor(db: PDO) {
        this.db = db;
    }

    public saveFoo(foo: Foo) {
        if (foo.id) {
            const sql = "UPDATE foo SET bar = :bar WHERE id = :id";
            const statement = this.db.prepare(sql);
            statement.bindParam("bar", foo.bar);
            statement.execute();
        } else {
            const sql = "INSERT INTO foo (bar) VALUES (:bar)";
            const statement = this.db.prepare(sql);
            statement.bindParam("bar", foo.bar);
            statement.execute();
            foo.id = this.db.lastInsertId();
        }
    }
}

/**
 * Код клієнта
 */

const foo = new Foo();
foo.bar = "baz";
const mapper = new FooMapper(db);
mapper.saveFoo(foo);
```

**Приклад 2 (TypeScript)**

```ts
class Customer {
    public id: number;
    public name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}

class CustomerMapper {
    public getById(id: number): Customer {
        const db: Db = ...;
        const record = db.readUser(id);

        return new Customer(record.id, record.name);
    }

    public save(customer: Customer): void {
        /**
         * враховуємо те що структура об'єкта та його
         * представлення у сховищі можуть відрізнятись
         */
    }

    public delete(id: number): void {
        const db: Db = ...;
        db.delete(id);
    }
}
```
