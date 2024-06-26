# Тести

Тести допомагають переконатися, що програми виглядають і працюють так, як описано в технічному завданні.

## Тестування буває

-   Ручне — тестування проводиться людиною.
-   Автоматичне — тестування проводиться програмами.

## Переваги автоматизованого тестування

-   Виявлення помилок на етапі розробки.
-   Підвищення якості коду.
-   Створення живої документації проекту.
-   Скорочення часу тестування.
-   Підвищення якості тестування.
-   Регресійне тестування (впевненість, що новий код не зламав старий).

## Ізоляція тестової одиниці

### Mock (імітація)

Mock-об'єкти або окремі методи, які імітують поведінку певної функції для тестування. Вони зазвичай не містять складної логіки, а лише імітують виклик іншої функції, яку не потрібно тестувати в даному тесті. Інтерфейс має залишатися правильним, навіть якщо використовується мінімальний набір даних. Необхідно враховувати обов'язкові параметри, навіть якщо вони не використовуються в тесті, або робити їх необов'язковими для тестування.

### Stub (заглушка)

Stub-об'єкти, що імітують структури даних. Вони використовуються з такою ж метою, як і моки, але представляють просто дані.

### Mock functions (шпигуни)

У багатьох інструментах автоматизованого тестування є функції-шпигуни. Вони відрізняються від моків і заглушок, оскільки не імітують та не заміщують функціональність. Шпигуни викликають вихідний код залежності і дають змогу змінювати результати цих викликів. Вони корисні для перевірки параметрів, що передаються в залежну функцію, або підрахунку кількості її викликів.

## Підходи до автоматизованого тестування

-   Розробка компонентів через створення тестів для них.
-   Написання тестів для наявних компонентів.

### Розробка через тестування (Test Driven Development — TDD)

Методологія написання програм на основі тестів. Основний принцип TDD полягає в тому, що спочатку пишуться тести, які описують очікувану поведінку програми, а потім пишеться код, на якому ці тести проходять без помилок. Розробка ведеться короткими ітераціями за певним алгоритмом:

1. Написати тест, що описує функціональність (формалізує завдання).
2. Запустити тести і переконатися, що вони не проходять (очікується помилка).
3. Написати код, який вирішує ці тести (не потрібно прагнути до ідеального коду, просто виконати завдання).
4. Запустити тести і переконатися, що вони проходять без помилок.
5. Оптимізувати код (алгоритми, розташування модулів).
6. Повторити кроки 1-5.

### Керована поведінкою розробка (Behavior-Driven Development — BDD)

Набір практик для написання якісних тестів. BDD можна використовувати разом із TDD і методами модульного тестування. Головне правило - тестувати не реалізацію, а поведінку. Погані модульні тести зазвичай залежать від реалізації тестованої функції, а не від її поведінки.

```js
/**
 * Поганий тест.
 *
 * Тест залежить від факту, що лічильник
 * починається з 0, що є деталлю реалізації,
 * не пов'язаною з поведінкою функції tick().
 */
suite("Counter", () => {
    test("tick increases count to 1", () => {
        // arrange (підготовка)
        const counter = new Counter();

        // act (дія)
        counter.tick();

        // assert (перевірка)
        assert.equal(counter.count, 1);
    });
});

/**
 * Хороший тест.
 *
 * Ми порівнюємо counter.count + 1 замість того,
 * щоб покладатися на лічильник, що має більший
 * сенс з точки зору перевірки поведінки.
 */
describe("Counter", () => {
    it("should increase count by 1 after calling tick", () => {
        // given (задано)
        const counter = new Counter();
        const expectedCount = counter.count + 1;

        // when (коли)
        counter.tick();

        // then (тоді)
        expect(equal(counter.count)).toBe(expectedCount);
    });
});
```

### Тестування потім (Test-Last Development)

Розробка, при якій тести пишуться після написання коду. Після написання коду створюються тести, які перевіряють, чи працює програма так, як задумано.
