## Singleton (одинак)

Гарантує, що клас має лише один екземпляр, та надає глобальну точку доступу до нього

**Приклад 1 (TypeScript)**

```ts
/**
 * Клас Singleton визначає метод getInstance, який надає
 * доступ клієнтам унікальний одиночний екземпляр.
 */
class Singleton {
    private static instance: Singleton;

    /**
     * Конструктор Singleton завжди повинен бути закритим,
     * щоб запобігти прямому виклику конструктора
     * з оператором `new`.
     */
    private constructor() {}

    /**
     * Статичний метод, який контролює доступ до екземпляру
     * Singleton.
     *
     * Ця реалізація дозволяє створити підклас класу
     * Singleton, зберігаючи лише один екземпляр кожного
     * підкласу.
     */
    public static getInstance(): Singleton {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }

        return Singleton.instance;
    }

    /**
     * Нарешті, будь-який Singleton повинен визначати
     * певну бізнес-логіку, яку можна бути використати
     * з його екземпляром.
     */
    public someBusinessLogic() {
        // ...
    }
}

/**
 * Код клієнта.
 */
function clientCode() {
    const s1 = Singleton.getInstance();
    const s2 = Singleton.getInstance();

    if (s1 === s2) {
        console.log(
            "Singleton works, both variables contain the same instance."
        );
    } else {
        console.log("Singleton failed, variables contain different instances.");
    }
}

clientCode();
```
