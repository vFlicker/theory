## Adapter (адаптер)

Надає змогу об'єктам із несумісними інтерфейсами працювати разом

**Приклад 1 (JavaScript)**

```js
/*
  Old interface
*/
class OldShipping {
    request(zipStart, zipEnd, weight) {
        return "$49.75";
    }
}

/*
  New interface
*/
class NewShipping {
    login(credentials) {}

    setStart(start) {}

    setDestination(destination) {}

    calculate(weight) {
        return "$39.50";
    }
}

/*
  Adapter interface
*/
class ShippingAdapter {
    #shipping = new NewShipping();

    constructor(credentials) {
        this.credentials = credentials;

        this.#shipping.login(credentials);
    }

    request(zipStart, zipEnd, weight) {
        this.#shipping.setStart(zipStart);
        this.#shipping.setDestination(zipEnd);
        return this.#shipping.calculate(weight);
    }
}

/*
  Client code
*/
const shipping = new OldShipping();
const adapter = new ShippingAdapter({ token: "30a8-6ee1" });

const oldShippingCost = shipping.request("78701", "10010", "2 lbs");
console.log(`Old cost: ${oldShippingCost}`);

const newShippingCost = adapter.request("78701", "10010", "2 lbs");
console.log(`New cost: ${newShippingCost}`);
```

**Приклад 2 (TypeScript)**

```ts
/**
 * Target визначає доменно-спеціальний інтерфейс,
 * який використовується кодом клієнта.
 */
class Target {
    public request(): string {
        return "Target: The default target's behavior.";
    }
}

/**
 * Adaptee містить деяку корисну поведінку, але його
 * інтерфейс несумісний з існуючим кодом клієнта.
 * Adaptee потребує певної адаптації, перш ніж код
 * клієнта зможе його використовувати.
 */
class Adaptee {
    public specificRequest(): string {
        return ".eetpadA eht fo roivaheb laicepS";
    }
}

/**
 * Адаптер робить інтерфейс Adaptee сумісним
 * з інтерфейсом Target.
 */
class Adapter extends Target {
    private adaptee: Adaptee;

    constructor(adaptee: Adaptee) {
        this.adaptee = adaptee;
    }

    public request(): string {
        const result = this.adaptee
            .specificRequest()
            .split("")
            .reverse()
            .join("");
        return `Adapter: (TRANSLATED) ${result}`;
    }
}

/**
 * Код клієнта підтримує всі класи, які слідують
 * інтерфейсу Target.
 */
function clientCode(target: Target) {
    console.log(target.request());
}

console.log("Client: I can work just fine with the Target objects:");
const target = new Target();
clientCode(target);

const adaptee = new Adaptee();
console.log(
    "Client: The Adaptee class has a weird interface. See, I don't understand it:"
);
console.log(`Adaptee: ${adaptee.specificRequest()}`);

console.log("Client: But I can work with it via the Adapter:");
const adapter = new Adapter(adaptee);
clientCode(adapter);
```
