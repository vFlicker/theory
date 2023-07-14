# SuperTest

SuperTest — це бібліотека для Node.js, яка допомагає розробникам тестувати API. Вона надає зручний інтерфейс для відправки HTTP-запитів до сервера і перевірки відповіді. SuperTest можна використовувати як окрему бібліотеку або в поєднанні з фреймворками тестування JavaScript, такими як Mocha або Jest.

Основні особливості SuperTest:

-   Дозволяє зручно виконувати HTTP-запити до сервера і отримувати відповіді.
-   Надає зручний синтаксис для перевірки відповідей, що спрощує написання тестів.
-   Забезпечує можливість тестування різних HTTP-методів (GET, POST, PUT, DELETE) і роботу зі змінними середовища.
-   Є популярним вибором для тестування API у Node.js проектах.

## Порівняння використання Axios і SuperTest

```js
/**
 * Axios.
 */
import assert from "assert/strict"; // assert (вбудований модуль Node.js)

axios(whereAppIs + "/endpoint").then((res) => {
    assert.equal(res.statusCode, 200);
});

/**
 * SuperTest.
 */
request(app).get("/endpoint").expect(200);
```

## Приклади використання SuperTest

```js
/**
 * Приклад 1.
 *
 * Без використання додаткових бібліотек.
 */
request("https://dog.ceo")
    .get("/api/breeds/image/random")
    .expect(200)
    .expect("Content-Type", "application/json")
    .expect((res) => {
        if (!res.body.hasOwnProperty("status")) {
            throw new Error("Expected 'status' key!");
        }

        if (!res.body.hasOwnProperty("message")) {
            throw new Error("Expected 'message' key!");
        }
    })
    .end((err, res) => {
        if (err) throw err;
    });

/**
 * Приклад 2.
 *
 * З використанням assert (вбудованого модуля у Node.js).
 */
import assert from "node:assert/strict";

request("https://dog.ceo")
    .get("/api/breeds/image/random")
    .expect(200)
    .expect("Content-Type", "application/json")
    .expect((res) => {
        assert(res.body.hasOwnProperty("status"));
        assert(res.body.hasOwnProperty("message"));
    })
    .end((err, res) => {
        if (err) throw err;
    });

/**
 * Приклад 3.
 *
 * З використанням Jest.
 */
describe("Random Dog Image", () => {
    it("responds with expected JSON structure", async () => {
        const response = await request("https://dog.ceo").get(
            "/api/breeds/image/random"
        );

        expect(response.status).toBe(200);
        expect(response.header["content-type"]).toBe("application/json");

        const { status, message } = response.body;

        expect(status).toBe("success");
        expect(message).toBe("*");
    });
});
```
