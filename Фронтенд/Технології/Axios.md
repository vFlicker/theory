# Axios

Бібліотека для мережевих запитів, яка надає додаткові корисні можливості

-   Відображення прогресу завантаження
-   Автоматична трансформація відповіді у JSON
-   Зручний інтерфейс для написання мережевих запитів
-   Всі запити зі статусами відмінними від 200-299 визначає як error
-   Має наявність «перехоплювачів» запитів (middleware), здатних обробляти однакові запити, наприклад, всі помилки
-   Надає mock для зручнішого тестування
-   Не потребує складного конфігурування

```js
import axios from "axios";

const URL_API = "https://jsonplaceholder.typicode.com/posts";

const newPost = {
    title: "foo",
    body: "bar",
    userId: 1,
};

axios
    .post(URL_API, newPost, { timeout: 1000 })
    .then((response) => {
        console.log(`Status code ${response.status}`);
        console.log(response.data);
    })
    .catch((err) => {
        console.log(`Error: ${err.message}`);
    });
```

## withCredentials

`withCredentials: true` — означає, що якщо ми авторизовані на сервері на який ми робимо запит з нашого додатку, тобто ми вже маємо cookie з
серверу, на який робимо запит, тоді цей сайт установить нам cookie і ми будемо авторизовані у нашому додатку

## Interseptors

```js
// Перехоплювач відповіді. Тут можна логувати помилки сервера.
axios.interceptors.response.use(
    // Будь-який код стану, що лежить у діапазоні 2xx, спричиняє запуск цієї функції
    (response) => response,

    // Будь-які коди стану, які виходять за межі діапазону 2xx, спричиняють запуск цієї функції
    // Тут можна логувати помилки сервера
    (error) => Promise.reject(error)
);
```
