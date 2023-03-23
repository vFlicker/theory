# Liskov Substitution Principle (принцип підстановки Лісків)

Об'єкти старших класів повинні бути замінені об'єктами підкласів, і додаток за такої заміни повинен працювати так, як очікується

**Приклад порушення**

```ts
class Database {
    connect() {}
    read() {}
    write() {}
    joinTables() {}
}

class MySQLDatabase extends Database {
    connect() {}
    read() {}
    write() {}
    joinTables() {}
}

class MongoDatabase extends Database {
    connect() {}
    read() {}
    write() {}
    createIndex() {}
    joinTables() {
        throw new Error("MongoDB has't tables");
    }
}
```

**Приклад застосування**

```ts
class Database {
    connect() {}
    read() {}
    write() {}
}

class SQLDatabase extends Database {
    connect() {}
    read() {}
    write() {}
    joinTables() {}
}

class NOSQLDatabase extends Database {
    connect() {}
    read() {}
    write() {}
    createIndex() {}
}

class MySQLDatabase extends SQLDatabase {
    connect() {}
    read() {}
    write() {}
    joinTables() {}
}

class MongoDatabase extends NOSQLDatabase {
    connect() {}
    read() {}
    write() {}
    createIndex() {}
    mergeDocuments() {}
}

/**
 * Клієнтський код.
 */
const startApp = (database: Database) => {
    database.connect();
};

startApp(new MongoDatabase());
startApp(new MySQLDatabase());
```
