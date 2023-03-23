# Low Coupling and High Cohesion

Система має складатися із слабко пов'язаних класів, які міститимуть пов'язану бізнес логіку. Дотримання цих принципів дозволяє зручно перевикористовувати створені класи, не втрачаючи розуміння їх зони відповідальності

## Low Coupling (низька зв'язаність)

Необхідно розподілити відповідальності між класами так щоб забезпечити мінімальну пов'язаність. Чим менше зв'язків між класами — тим краще. Класичний приклад слабкої зв'язаності — патерн MVC, де є три компоненти, на які діляться всі програмні модулі. Слабка пов'язаність тут виражена в тому, що можна викинути один або два компоненти із системи та написати нову реалізацію, залишивши інші частини без змін. Щоб це працювало, зв'язок між компонентами має бути мінімальним

**Приклад порушення 1**

```ts
/**
 * Створюємо продукт, з'єднуємося з базою даних,
 * використовуємо клас для роботи зі знижками.
 */
class Order {
    db: IDB;
    discount: IDiscount;

    constructor(db: IDB, discount: IDiscount) {
        this.db = db;
        this.discount = discount;
    }

    public calculate() {
        const product = new Product();
        const promo = new Promo();
        const warehouse = new Warehouse();
        const email = new Notification();
    }
}
```

**Приклад застосування 1**

```ts
/**
 * Тут кількість зв'язків менша за рахунок того, що ми
 * створюємо додаткові абстракції, які переносять роботу
 * в інші прошарки. Нові сутності, дають просту колекцію
 * з продуктами та передають її до класу Order.
 */
class Order {
    productCollection: IProductCollection;
    discount: IDiscount;

    constructor(productCollection: IProductCollection, discount: IDiscount) {
        this.productCollection = productCollection;
        this.discount = discount;
    }

    public calculate() {
        const promo = new Promo();
    }
}
```

**Приклад порушення 2**

```ts
/** Ми не можемо віддати клас A без класу B, як і клас B
 * без класу A: їх не можна перевикористовувати окремо,
 * тільки разом.
 */
class Foo {
    private a: number;
    private bar: Bar;

    constructor(a: number) {
        this.a = a;
        this.bar = new Bar(this);
    }
}

class Bar {
    private foo: Foo;

    constructor(foo: Foo) {
        this.foo = foo;
    }
}
```

## High Cohesion (високе зачеплення)

Класи повинні містити пов'язану бізнес-логіку

**Приклад порушення**

```ts
/**
 * Клас містить бізнес логіку роботи як з температурою,
 * так і з часом. Вони не мають нічого спільного,
 * за винятком того, що збираються з одного датчика.
 * Якщо ми захочемо перевикористовувати бізнес логіку,
 * пов'язану з роботою тільки з температурою,
 * то здійснити це легко не вийде.
 */
class Data {
    private temperature: number;
    private time: number;

    private calculateTimeDifference(time: number): number {
        return this.time - time;
    }

    private calculateTemperatureDifference(temperature: number): number {
        return this.temperature - temperature;
    }
}
```

**Приклад застосування**

```ts
/**
 * Має сенс створити 2 класи: один для температури,
 * інший для часу.
 *
 * Таким чином, бізнес-логіка в кожному із класів
 * є «сильно зачепленою», ці класи легко
 * перевикористовувати, утворюючи будь-які комбінації.
 */
class Data {
    private temperatureData: TemperatureData;
    private timeData: TimeData;

    constructor(time: number, temperature: number) {
        this.temperatureData = new TemperatureData(temperature);
        this.timeData = new TimeData(time);
    }
}

class TimeData {
    private time: number;

    private calculateTimeDifference(time: number): number {
        return this.time - time;
    }
}

class TemperatureData {
    private temperature: number;

    private calculateTemperatureDifference(temperature: number): number {
        return this.temperature - temperature;
    }
}
```
