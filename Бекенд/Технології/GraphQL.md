# GraphQL

GraphQL — це мова запитів та середовище виконання для серверних застосунків, яке дозволяє клієнтам запитувати тільки ті дані, які їм потрібні. Використовується для побудови гнучких та ефективних API.

## Основні поняття в GraphQL

### Схема (Schema)

GraphQL визначає схему, яка описує, як дані будуть доступні. Схема містить типи даних та визначає, як вони пов'язані.

```gql
type User {
  id: ID
  name: String
  email: String
  posts: [Post]
}
```

### Запит (Query) та Зміна (Mutation)

- Query — використовується для отримання даних з сервера.

```gql
query {
  user(id: 1) {
    name
    email
  }
}
```

- Mutation — використовується для зміни або створення даних на сервері.

```gql
mutation {
  createUser(name: "John Doe", email: "john@example.com") {
    id
    name
  }
}
```

### Поля (Fields)

Клієнт вибирає лише ті дані, які йому потрібні, вказуючи поля запиту.

```gql
{
  user(id: 1) {
    name
    posts {
      title
      content
    }
  }
}
```

### Фрагменти (Fragments)

Фрагменти дозволяють зберігати та повторно використовувати частини запиту для полегшення читання та обслуговування коду.

```gql
fragment UserInfo on User {
  name
  email
}

query {
  user(id: 1) {
    ...UserInfo
    posts {
      title
      content
    }
  }
}
```

### Аргументи (Arguments)

Аргументи використовуються для передачі параметрів до запиту чи зміни.

```gql
{
  user(id: 1) {
    name
    email
  }
}
```

## Використання GraphQL в Node.js (з Nest.js)

У Node.js, фреймворки, такі як Nest.js, дозволяють легко створювати GraphQL API. Nest.js використовує декоратори та TypeScript для опису схеми.

```ts
import { Resolver, Query, Args } from "@nestjs/graphql";
import { UserService } from "./user.service";

@Resolver("User")
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query("user")
  async getUser(@Args("id") id: number) {
    return await this.userService.getUserById(id);
  }
}
```

## Переваги GraphQL

- Гнучкість: Клієнт отримує тільки те, що запитав, зменшуючи кількість передачі зайвих даних.
- Одноразовий запит: Замість кількох запитів REST можна виконати один запит GraphQL.
- Схема та типи: Чітко визначена схема дозволяє клієнтам заздалегідь знати, які дані можна запитувати.

### Недоліки GraphQL

- Навантаження на сервер: Запити можуть містити багато деталей, що може призвести до надмірного навантаження на сервер.
- Складність для початківців: Для новачків може бути складно зрозуміти та впровадити GraphQL.
- Кешування даних: Управління кешуванням даних може бути складніше порівняно з REST.
