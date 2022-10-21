## Information Expert (інформаційний експерт)

Інформація має оброблятися там, де вона міститься

**Приклад порушення**

```ts
class Order {
    private orderItems: OrderItem[];
    private destinationAddress: string;
}

class OrderItem {
    private amount: number;
    private good: Good;
}

class Good {
    private name: string;
    private price: number;
}

/**
 * До клієнту витягнуто всю бізнес-логіку по роботі
 * з класами. Це означає, що якщо ми захочемо
 * перевикористовувати OrderItem або Good окремо від Order
 * (наприклад, для підрахунку ціни товарів на складах),
 * ми просто не зможемо цього зробити, адже бізнес-логіка
 * лежить у клієнтському коді, що призведе до неминучого
 * дублювання коду.
 *
 * Тут порушено принцип Information Expert, адже обробляє
 * інформацію клієнтський код, а містить її Order.
 */
class Client {
    public doSmth(): void {}

    private getOrderPrice(order: Order): number {
        const orderItems = order.getOrderItems();

        let result = 0;
        for (const orderItem of orderItems) {
            const amount = orderItem.getAmount();
            const good = orderItem.getGood();
            const price = good.getPrice();

            result += price * amount;
        }

        return result;
    }
}
```

**Приклад застосування**

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

class Client {
    public doSmth(): void {
        const order = new Order();
        order.getPrice();
    }
}
```
