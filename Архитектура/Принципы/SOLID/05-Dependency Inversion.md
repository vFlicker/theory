# Dependency Inversion (інверсія залежностей)

Залежність на абстракціях. Немає залежності на щось конкретне. Модулі верхнього рівня не повинні залежати від модулів нижнього рівня, ті та інші повинні залежати від абстракцій. Абстракції не повинні залежати від деталей. Деталі мають залежати від абстракцій. Щоб застосувати інверсію, потрібно винести процес створення об'єктів нагору, тобто забрати їх із зазначених класів. Можливо, це буде контролер, можливо, якийсь прошарок або абстракція. Це не так важливо, головне, що вони не знаходяться усередині стека виклику

## Приклад

Ви можете написати свій шар абстракції для використання дат JavaScript. Тоді якщо у вас зміниться джерело отримання дат, вам потрібно буде внести зміни в одному місці, а не тисячі

## Мінуси прямої залежності класів

-   Ми не можемо підмінити реалізацію класів, тому що всі класи та їх створення прописані прямо усередині тіла методу. Викинути один клас і замінити його іншим стає не так просто. Потрібно зробити купу рухів тіла і переписати реалізації, які вже були протестовані
-   Складно написати unit-тести, оскільки все викликається ланцюжком
-   Бізнес-логіка легко починає розтікатися класами. У результаті стає незрозуміло, який клас та яка абстракція має реалізувати ту чи іншу відповідальність
-   Збільшується залежність класів друг від друга, і слабка зв'язаність втрачається

**Приклад порушення 1**

```ts
class MyPermissions {
    public getMethod() {
        const algorithm = new Algorithm();
    }
}

class Algorithm {
    public getData() {
        const orm = new ORM();
    }
}

class ORM {}

/**
 * Виклик з контролера.
 */
const permissions = new MyPermissions();
permissions.getMethod();
```

**Приклад застосування 1**

```ts
interface IRules {
    getData(dataResolver: IDataResolver);
}

interface IDataResolver {}

class MyPermissions {
    public getMethod(rules: IRules) {}
}

class Algorithm implements IRules {
    public getData(dataResolver: IDataResolver) {}
}

class ORM implements IDataResolver {}

/**
 * Виклик з контролера.
 */
const orm = new ORM();
const algorithm = new Algorithm();
const permissions = new MyPermissions();

algorithm.getData(orm);
permissions.getMethod(algorithm);
```

**Приклад застосування 2**

```ts
interface StoreClient {
    get(): string;
    add(data): void;
}

class DataBaseStorage implements StoreClient {
    get(): string {
        return "Data from DataBaseStorage";
    }

    add(data): void {}
}

class LocalStorage implements StoreClient {
    get(): string {
        return "Data from LocalStorage";
    }

    add(data): void {}
}

class Store {
    private client: StoreClient;

    constructor(client: StoreClient) {
        this.client = client;
    }

    changeClient(client: StoreClient) {
        this.client = client;
    }

    get(): string {
        return this.client.get();
    }

    add(data): void {
        this.client.add(data);
    }
}

/**
 * Клієнтський код.
 */
const store = new Store(new DataBaseStorage());
console.log(store.get());

store.changeClient(new LocalStorage());
console.log(store.get());
```
