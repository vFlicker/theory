## Prototype (прототип / клон)

Дає змогу копіювати об'єкти, не вдаючись у подробиці їхньої реалізації

**Приклад 1 (JavaScript)**

```js
class CustomerPrototype {
    constructor(proto) {
        this.proto = proto;
    }

    clone() {
        const customer = new Customer();

        customer.first = proto.first;
        customer.last = proto.last;
        customer.status = proto.status;

        return customer;
    }
}

class Customer {
    constructor(first, last, status) {
        this.first = first;
        this.last = last;
        this.status = status;
    }

    say() {
        console.log(`name: ${this.first} ${this.last}, status: ${this.status}`);
    }
}

const proto = new Customer("n/a", "n/a", "pending");
const prototype = new CustomerPrototype(proto);

const customer = prototype.clone();
customer.say();
```

**Приклад 2 (TypeScript)**

```ts
/**
 * Приклад класу, який має можливість клонування.
 * Ми побачимо, як будуть клонуватися значення поля
 * з різними типами.
 */
class Prototype {
    public primitive: any;
    public component: object;
    public circularReference: ComponentWithBackReference;

    public clone(): this {
        const clone = Object.create(this);

        clone.component = Object.create(this.component);

        /**
         * Клонування об'єкта, який має вкладений об'єкт
         * із зворотним посиланням, вимагає спеціального
         * лікування. Після завершення клонування вкладений
         * об'єкт має вказувати на клонований об'єкт, а не
         * на оригінальний об'єкт. У цьому випадку може
         * бути корисним оператор Spread.
         */
        clone.circularReference = {
            ...this.circularReference,
            prototype: { ...this },
        };

        return clone;
    }
}

class ComponentWithBackReference {
    public prototype;

    constructor(prototype: Prototype) {
        this.prototype = prototype;
    }
}

/**
 * Код клієнта.
 */
function clientCode() {
    const p1 = new Prototype();
    p1.primitive = 245;
    p1.component = new Date();
    p1.circularReference = new ComponentWithBackReference(p1);

    const p2 = p1.clone();

    if (p1.primitive === p2.primitive) {
        console.log(
            "Primitive field values have been carried over to a clone. Yay!"
        );
    } else {
        console.log("Primitive field values have not been copied. Booo!");
    }

    if (p1.component === p2.component) {
        console.log("Simple component has not been cloned. Booo!");
    } else {
        console.log("Simple component has been cloned. Yay!");
    }

    if (p1.circularReference === p2.circularReference) {
        console.log("Component with back reference has not been cloned. Booo!");
    } else {
        console.log("Component with back reference has been cloned. Yay!");
    }

    if (p1.circularReference.prototype === p2.circularReference.prototype) {
        console.log(
            "Component with back reference is linked to original object. Booo!"
        );
    } else {
        console.log(
            "Component with back reference is linked to the clone. Yay!"
        );
    }
}

clientCode();
```
