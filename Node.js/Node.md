## Stream (потік)

-   Дозволяє читати дані по частинам
-   Stream є EventEmitter з фіксованою кількістю подій
-   Буває чотирьох видів:
    -   Write (в який можна тільки писати)
    -   Read (з якого можна лише читати)
    -   Duplex (до якого можна і читати та писати)
    -   Transform (який трансформує дані на льоту)

### Read Stream

-   Stream, з якого можна читати дані
-   Основні події
    -   data — частина даних завантажена та готова для читання
    -   end — дані закінчилися
    -   error — під час читання даних сталася помилка
-   Основні методи
    -   pipe(description, options) — дозволяє перенаправити вивід у Write Stream

### Write Stream

-   Stream, в який можна писати дані
-   Основні події
    -   drain — повідомляє, що передані дані були успішно записані та можна продовжити писати дані
    -   error — під час читання даних сталася помилка
-   Основні методи:
    -   write(chunk, encoding, callback) — дозволяє записати частину даних
    -   end(chunk, encoding, callback) — повертає останню частину даних та повідомляє про
        тому, що дані закінчилися

## HTTP

HTTP 1.1 — протокол передачі даних, описує у якому вигляді обмінюються інформацією клієнт та сервер

### HTTP 1.1 Запит

```
GET /index.php HTTP/1.1
Host: example.com
User-Agent: Mozilla/5.0
Accept: text/html
```

### HTTP 1.1 Відповідь

```
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 1270
Cache-Control: max-age=604800
Date: Tue, 24 Oct 2017 11:08:24 GMT
Etag: "359670651+ident"
Expires: Tue, 31 Oct 2017 11:08:24 GMT
Last-Modified: Fri, 09 Aug 2013 23:54:35 GMT
Server: ECS (dca/53DB)
Vary: Accept-Encoding
X-Cache: HIT
<!doctype html>
<html>
<head>
<title>Example Domain</title>
```

### HTTP методи

-   GET — запит на отримання інформації із сервера
-   HEAD — запит для перевірки, чи оновилася інформація на сервері і чи варто заново її завантажити або можна залишити закешовану версію
-   OPTIONS — запит для перевірки, які запити можна робити на цей ресурс

-   POST — запит на створення нового запису на сервері
-   PUT — запит на перезапис наявної інформації на сервері
-   DELETE — запит на видалення наявної інформації на сервері
-   PATCH — запит на частковий перезапис наявної інформації на сервері

### Коди стану HTTP

-   1xx — інформаційні повідомлення
-   2xx — успішні повідомлення
-   3xx — перенаправлення
-   4xx — помилка у запиті клієнта
-   5xx — помилки сервера

### Media Type (MIME Type/Content Type)

Media Type — спеціальний формат для вказівки типу даних. Спочатку з'явився для вказівки типу вкладених файлів в електронних листах (Multipurpose
Internet Mail Extensions)

### Media types (типи даних)

-   top-level type name (назва класу даних) / subtype name (назва типу даних)
-   application / json
-   image / jpeg
-   text / html
-   application / x-www-form-urlencoded
-   multipart / form-data
-   application / octet-stream

### Запуск серверу

```js
const http = require("http");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello World\n");
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});
```

**Примітки**

-   За замовчуванням порт для роботи з http – це порт 80, тобто. якщо в адресі не вказано порт, то браузер за замовчуванням буде використовувати порт 80 для HTTP і порт 443 для HTTPS
-   На деяких операційних системах порти (\*nix) <1024 заборонені для використання з правами звичайного користувача

### Request (об'єкт запиту)

-   Реалізує всі методи та події Read Stream
-   request.headers — заголовки запиту (пари ключ-значення)
-   request.httpVersion — версія протоколу HTTP, яку запросив клієнт
-   request.method — метод, яким звернувся клієнт
-   request.url — локальна адреса, яку запитав клієнт
-   для роботи з URL є модуль url, який дозволяє розпарсити URL з рядка в об'єкт і назад

### Response (об'єкт відповіді)

-   Реалізує всі методи та події Write Stream
-   response.statusCode — поле, що зберігає код відповіді (наприклад: 200, 404, 501)
-   response.statusMessage — поле, що зберігає повідомлення відповідь (наприклад: 'OK', 'Not Found')
-   response.writeHead() — метод, який надсилає заголовок
-   response.write() — метод, який надсилає частину тіла відповіді
-   response.end(data, encoding, callback) — метод, який повідомляє, що відповідь записана
