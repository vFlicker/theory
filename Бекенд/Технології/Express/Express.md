# Router

Router (маршрутизатор) — окремий випадок оброблювача (middleware), який відповідає за конкретний результат та обробляє конкретний запит із конкретним методом

## `app.method(path, handler)`

-   app — екземпляр поточної програми express
-   method — метод, що обробляється запит (get, post, put, delete)
-   path — шлях (реєстронезалежний за умовчанням), який обробляє обробник ('/user', '/profile/admin')
-   handler — обробник, який спрацює при збігу шляху та методу запиту

## Методи

-   Підтримка всіх базових методів — GET, HEAD, POST, PUT, DELETE
-   Підтримка додаткових методів — OPTIONS, PATCH
-   Усі методи записуються з маленької літери — get, post, put, delete
-   Спеціальний метод all дозволяє обробити запит вручну

## Request extends http.IncomingMessage

-   Розширює стандартні можливості http.IncomingMessage
-   Автоматично розбирає query в об'єкт — req.query
-   Додаткові методи та поля для роботи з кодуванням, параметрами шляхів тощо.

## Request.body

-   За замовчуванням req.body дорівнює undefined
-   Express не читає тіло запиту за замовчуванням, для цього йому потрібно знати у якому форматі знаходяться дані та як їх читати
-   Для керування автоматичним читанням даних із запиту використовуються сторонні бібліотеки (body parsers)

## Body parser

-   Бібліотека body-parser працює з наступними форматами даних
    -   application/json
    -   text/plain
    -   application/x-www-form-urlencoded
-   Бібліотеки multer, busboy, multiparty працюють із даними у форматі форми
    -   multipart/form-data

## Response extends http.ServerResponse

-   Розширює стандартні можливості http.ServerResponse
-   Автоматично підбирає правильну відповідь відповідно до вмісту в res.send
-   Додає додаткові методи для роботи з файлами, частковим надсиланням даних і т.д.

## Шляхи

```js
/*
    Статичні
*/

app.get(`/`, (req, res) => res.send());
app.get(`/about`, (req, res) => res.send());
```

```js
/*
    Динамічні
*/

app.get(`/te?st`, (req, res) => res.send());
app.get(`/te+st`, (req, res) => res.send());

app.get(`/user/:name`, (req, res) => res.send(req.params.name));

app.get(/keks/, (req, res) => res.send(`keks`));
app.get(/.\*keks$/, (req, res) => res.send(`keks`));
```

## express.static

-   Роздає статику з диска
-   Слідкує за правильним кешуванням файлів
-   Надає index.html як кореневий ресурс

## Асинхронна обробка запиту

```js
/*
    Bad
*/

const app = require(`express`)();
const WIZARDS = [];
const NOT_FOUND_CODE = 404;

app.get(`/wizards/:name`, (req, res) => {
    const wizardName = req.params.name;
    (async () => {
        const found = WIZARDS.find((it) => it.name === wizardName);
        if (!found) {
            res.status(NOT_FOUND_CODE).send(
                `Wizard with name "${wizardName}" not found`
            );
        }
        res.send(found);
    })().catch((e) => res.status(500).send(e.message));
});
```

```js
/*
    Good
*/

const app = require(`express`)();
const WIZARDS = [];
const NOT_FOUND_CODE = 404;

const async = (fn) => (req, res, next) => fn(req, res, next).catch(next);

app.get(
    `/wizards/:name`,
    async(async (req, res) => {
        const wizardName = req.params.name;
        const found = WIZARDS.find((it) => it.name === wizardName);
        if (!found) {
            res.status(NOT_FOUND_CODE).send(
                `Wizard with name "${wizardName}" not found`
            );
        }
        res.send(found);
    })
);
```
