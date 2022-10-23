## Proxy (Замісник)

Надає змогу підставляти замість реальних об'єктів спеціальні об'єкти-замінники. Ці об'єкти перехоплюють виклики до оригінального об'єкта, дозволяючи зробити щось до чи після передачі виклику оригіналові

**Приклад 1 (JavaScript)**

```js
class GeoCoder {
    getLatLng(address) {
        switch (address) {
            case "Amsterdam":
                return "52.3700° N, 4.8900° E";
            case "London":
                return "51.5171° N, 0.1062° W";
            case "Paris":
                return "48.8742° N, 2.3470° E";
            case "Berlin":
                return "52.5233° N, 13.4127° E";
            default:
                return "";
        }
    }
}

class GeoProxy {
    #geocoder = new GeoCoder();
    #geocache = {};

    getLatLng(address) {
        if (!this.#geocache[address]) {
            this.#geocache[address] = this.#geocoder.getLatLng(address);
        }

        console.log(`${address}: ${this.#geocache[address]}`);
        return this.#geocache[address];
    }

    getCount() {
        return Object.keys(this.#geocache).length;
    }
}

const geo = new GeoProxy();

// Запити геолокації
geo.getLatLng("Paris");
geo.getLatLng("London");
geo.getLatLng("London");
geo.getLatLng("London");
geo.getLatLng("London");
geo.getLatLng("Amsterdam");
geo.getLatLng("Amsterdam");
geo.getLatLng("Amsterdam");
geo.getLatLng("Amsterdam");
geo.getLatLng("London");
geo.getLatLng("London");

console.log(`Cache size: ${geo.getCount()}`);
```

**Приклад 2 (TypeScript)**

```ts
/**
 * Інтерфейс Subject оголошує загальні операції
 * як для RealSubject, так і для Proxy. Поки клієнт працює
 * з RealSubject за допомогою цього інтерфейсу, ви зможете
 * передати йому проксі замість реального суб'єкта.
 */
interface Subject {
    request(): void;
}

/**
 * RealSubject містить деяку основну бізнес-логіку.
 * Зазвичай RealSubjects здатні виконувати певну
 * корисну роботу, яка також може бути дуже повільною
 * або чутливою (коригування вхідних даних).
 * Проксі-сервер може вирішити ці проблеми без будь-яких
 * змін у коді RealSubject.
 */
class RealSubject implements Subject {
    public request(): void {
        console.log("RealSubject: Handling request.");
    }
}

/**
 * Proxy має інтерфейс, ідентичний RealSubject.
 */
class Proxy implements Subject {
    private realSubject: RealSubject;

    /**
     * Проксі підтримує посилання на об'єкт класу
     * RealSubject. Він може бути або відкладено
     * завантажений, або переданий до проксі клієнтом.
     */
    constructor(realSubject: RealSubject) {
        this.realSubject = realSubject;
    }

    /**
     * Найпоширенішими застосуваннями шаблону Proxy
     * є відкладене завантаження, кешування,
     * контроль доступу, журналювання тощо. Proxy
     * може виконувати одну з цих дій, а потім, залежно
     * від результату, передати виконання тому самому
     * методу у зв'язаному об'єкті RealSubject.
     */
    public request(): void {
        if (this.checkAccess()) {
            this.realSubject.request();
            this.logAccess();
        }
    }

    private checkAccess(): boolean {
        // Тут повинні бути якісь справжні перевірки.
        console.log("Proxy: Checking access prior to firing a real request.");

        return true;
    }

    private logAccess(): void {
        console.log("Proxy: Logging the time of request.");
    }
}

/**
 * Передбачається, що код клієнта працюватиме з усіма
 * об'єктами (як суб'єктами, так і проксі) через інтерфейс
 * Subject, щоб підтримувати як реальні суб'єкти,
 * так і проксі. Однак у реальному житті клієнти
 * здебільшого працюють безпосередньо зі своїми реальними
 * суб'єктами. У цьому випадку, щоб легше реалізувати
 * патерн, ви можете розширити свій проксі з реального
 * класу предмета.
 */
function clientCode(subject: Subject) {
    subject.request();
}

console.log("Client: Executing the client code with a real subject:");
const realSubject = new RealSubject();
clientCode(realSubject);

console.log("Client: Executing the same client code with a proxy:");
const proxy = new Proxy(realSubject);
clientCode(proxy);
```
