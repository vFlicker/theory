# Single Responsibility Principle (принцип єдиної відповідальності)

Кожен об'єкт, клас та метод повинні відповідати лише за щось одне. Якщо об'єкт/клас/метод робить занадто багато, ви отримаєте спагетті-код. Ще один побічний ефект такого коду — проблеми із тестуванням (заплутаний функціонал тестувати складно)

**Приклад порушення 1**

```js
/**
 * Цей метод робить занадто багато
 */
const saveTodo = async () => {
    try {
        // Зберігає об'єкт
        await saveTodoApi();

        // Обробляє повідомлення у UI
        showSuccessPop("Success");

        // Виконує навігацію
        window.location.href = "/successPage";
    } catch (error) {
        // Обробляє повідомлення у UI
        showErrorPopup(`Error: ${error} `);
    }
};
```

**Приклад застосування 1**

```js
class HttpClient {
    get(url: string) {}
    post() {}
    put() {}
    delete() {}
}

class UserService {
    #client: HttpClient;

    constructor(client) {
        this.#client = client;
    }

    getOneUser(id: number) {}
    getAllUsers() {}
}

class RequisitesService {
    #client: HttpClient;

    constructor(client) {
        this.#client = client;
    }

    createRequisites() {}
    getRequisites() {}
    updateRequisites() {}
}
```

**Приклад застосування 2**

```js
class News {
    constructor(title, text) {
        this.title = title;
        this.text = text;
        this.modified = false;
    }

    update(text) {
        this.text = text;
        this.modified = true;
    }
}

class NewsPrinter {
    #news = null;

    constructor(news) {
        this.#news = news;
    }

    html() {
        return `
            <div class="news">
                <h1>${this.news.title}</h1>
                <p>${this.news.text}</p>
            </div>
        `;
    }

    json() {
        return JSON.stringify(
            {
                title: this.news.title,
                text: this.news.text,
                modified: this.news.modified,
            },
            null,
            2
        );
    }

    xml() {
        return `
            <news>
                <title>${this.news.title}</title>
                <text>${this.news.text}</text>
            </news>
        `;
    }
}

/**
 * Клієнтський код.
 */
const printer = new NewsPrinter(new News("Title", "Text"));

console.log(printer.html());
console.log(printer.xml());
console.log(printer.json());
```
