## Simple Factory

Клас, у якому є один метод із великим умовним оператором, який вибирає продукт для створення. Цей метод викликають із певним параметром, за яким визначається продукт, що необхідно створити

**Приклад 1 (JavaScript)**

```js
class UserFactory {
    static create(type) {
        switch (type) {
            case "user":
                return new User();
                break;
            case "customer":
                return new Customer();
                break;
            case "admin":
                return = new TempAdminorary();
                break;
            default:
                throw new Error("Wrong user type passed.");
        }
    }
}

const users = [];
const factory = new Factory();

users.push(factory.createEmployee("user"));
users.push(factory.createEmployee("customer"));
users.push(factory.createEmployee("admin"));

for (const user of users) {
    user.say();
}
```
