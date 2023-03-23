# Command and Query Responsibility Segregation (розподіл відповідальності за команди та запити)

Підхід проектування програмного забезпечення, при якому код, що змінює стан, відокремлюється від коду, що просто читає цей стан. Подібний поділ може бути логічним і ґрунтуватися на різних рівнях. Крім того, воно може бути фізичним і включати різні ланки (tiers) або рівні. В основі цього підходу лежить принцип Command-query separation (Поділ команди-запиту). Основна ідея CQS у тому, що в об'єкті методи можуть бути двох типів

-   Queries — методи повертають результат, не змінюючи стан об'єкта. Інакше кажучи, у Query немає побічних ефектів
-   Commands — методи змінюють стан об'єкта, не повертаючи значення

**Приклад порушення**

```ts
class User {
    public email: string;

    public isEmailValid(email: string): boolean {
        const isMatch = new RegExp("email pattern").test(email);

        if (isMatch) {
            this.email = email; // Command
        }

        return isMatch; // Query
    }
}
```

**Приклад застосування**

```ts
class User {
    public email: string;

    /**
     * Query
     */
    public isEmailValid(email: string): boolean {
        return new RegExp("email pattern").test(email);
    }

    /**
     * Command
     */
    public changeEmail(email: string): void {
        if (!this.isEmailValid(email)) {
            throw new ArgumentOutOfRangeException(email);
        }

        this.email = email;
    }
}
```

### Література

<a href="https://habr.com/ru/company/simbirsoft/blog/329970/">Основи CQRS</a>
