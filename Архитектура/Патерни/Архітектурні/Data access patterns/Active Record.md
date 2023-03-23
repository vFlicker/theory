# Active Record (активний запис)

Шаблон проектування що використовується при реалізації доступу до реляційних баз даних. Інтерфейс такого об'єкта включає функції CRUD, а також поля, що більш чи менш прямо відповідають полям відповідної таблиці в базі даних.

Active Record реалізує популярний підхід об'єктно-орієнтованого проекціювання (ORM). Кожен клас AR відображає таблицю (чи представлення) бази даних, екземпляр AR — запис цієї таблиці, а загальні операції CRUD реалізовані як методи AR. В результаті можна працювати з більшою об'єктно-орієнтованістю

**Приклад 1 (TypeScript)**

```ts
class Foo {
    protected db;
    public id;
    public bar;

    constructor(db: PDO) {
        this.db = db;
    }

    public doSomething() {
        this.bar = uniqid();
    }

    public save() {
        if (this.id) {
            const sql = "UPDATE foo SET bar = :bar WHERE id = :id";
            const statement = this.db.prepare(sql);
            statement.bindParam("bar", this.bar);
            statement.bindParam("id", this.id);
            statement.execute();
        } else {
            const sql = "INSERT INTO foo (bar) VALUES (:bar)";
            const statement = this.db.prepare(sql);
            statement.bindParam("bar", this.bar);
            statement.execute();
            this.id = this.db.lastInsertId();
        }
    }
}

/**
 * Код клієнта
 */
const foo = new Foo(db);
foo.bar = "baz";
foo.save();
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

    /**
     * Статичний метод працює як фабрика
     */
    public static getById(id: number): Customer {
        db: Db = ...;
        const record = db.readUser(id);

        return new Customer(record.id, record.name);
    }

    public save(): void {}

    public delete(): void {
        db: Db = ...;
        db.delete(this.id);
    }
}
```
