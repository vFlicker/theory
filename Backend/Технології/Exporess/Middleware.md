## Middleware

Middleware (проміжне програмне забезпечення) — абстракція, яка дозволяє обробити запит і повернути відповідь або передати запит далі

### Види middleware

-   Фільтруючі — витягують якусь інформацію із запиту та передають управління далі
-   Обробні — обробляють конкретний запит та повертають відповідь користувачу
-   Коригувальні — обробляють виняткові ситуації, помилки тощо. Потрібні для обробки непередбачених чи очікуваних помилок

```js
/**
 * Middleware у Express реалізують патерн
 * Chain of Responsibility
 */
import express from "express";

const app = express();

app.use(
    "/",
    /**
     * Додає заголовок до запиту, якщо користувач натискає
     * кореневий '/'. Ми можемо додати цей заголовок у
     * зворотний виклик middleware.
     */
    (req, res, next) => {
        req.headers["test-header"] = 1234;
        next();
    },
    /**
     * перевіряє, чи правильно було додано
     * тестовий заголовок.
     */
    (req, res, next) => {
        console.log(
            `Request has test header: ${Boolean(req.headers["test-header"])}`
        );
        next();
    }
);

app.get("/", (req, res) => {
    res.set("Content-Type", "application/json");
    res.send(JSON.stringify({ key: "value" }));
});

app.listen(8080, function () {
    console.log("Server is running on 8080");
});
```
