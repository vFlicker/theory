## Creator (творець)

Створювати екземпляри класу повинен клас, якому вони потрібні

**Приклад порушення**

```ts
class Order {
    private orderItems: OrderItem[];
    private destinationAddress: string;

    public getPrice(): number {
        let result = 0;

        for (const orderItem of this.orderItems) {
            result += orderItem.getPrice();
        }

        return result;
    }
}

class OrderItem {
    private amount: number;
    private good: Good;

    public getPrice(): number {
        return this.amount * this.good.getPrice();
    }
}

class Good {
    private name: string;
    private price: number;
}

/**
 * Клас Client тепер залежить від класу Order і від його
 * нутрощів: OrderItem і Good. Таким чином, ми не можемо
 * перевикористовувати клас Client без зазначених вище
 * класів, які Client'у і не потрібні.
 */
class Client {
    public doSmth(): void {
        const good = new Good("name", 2);
        const orderItem = new OrderItem(good, amount);
        const orderItems: OrderItem[] = [];
        orderItems.push(orderItem);
        order = new Order(orderItems, "abc");
    }
}
```

**Приклад застосування**

```ts
class Order {
    private orderItems: OrderItem[];
    private destinationAddress: string;

    constructor(destinationAddress: string) {
        this.destinationAddress = destinationAddress;
    }

    public getPrice(): number {
        let result = 0;

        for (const orderItem of this.orderItems) {
            result += orderItem.getPrice();
        }

        return result;
    }

    public addOrderItem(amount: number, name: string, price: number): void {
        orderItems.add(new OrderItem(amount, name, price));
    }
}

class OrderItem {
    private amount: number;
    private good: Good;

    constructor(amount: number, name: string, price: number) {
        this.amount = amount;
        this.good = new Good(name, price);
    }

    public getPrice(): number {
        return this.amount * this.good.getPrice();
    }
}

class Good {
    private name: string;
    private price: number;
}

class Client {
    public doSmth(): void {
        const order = new Order("address");
        order.addOrderItem(amount, name, price);
    }
}
```
