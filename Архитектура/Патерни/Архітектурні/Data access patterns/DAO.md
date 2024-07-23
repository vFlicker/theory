# DAO (Data access object)

DAO (Data Access Object / Об'єкт доступу до даних) — поширений патерн для збереження об'єктів бізнес-області в базі даних. У найширшому значенні, DAO — це клас, що містить CRUD методи для конкретної сутності Користь DAO, в тому, що вона повертає зрозумілу нам відповідь, звичайний об'єкт, а на сутність БД. Також, якщо ми поміняємо ORM, наприклад, на MongoDB, доведеться переписати лише DAO.

```py
from dataclasses import dataclass
from typing import Iterable

from django.contrib.auth.models import User

@dataclass
class UserEntity:
    pk: int
    username: str
    email: str
    is_active: bool

class UsersDAO:
    def _orm_to_entity(self, user_orm: User) -> UserEntity:
        return UserEntity(
            pk=user_orm.pk,
            username=user_orm.username,
            email=user_orm.email,
            is_active=user_orm.is_active,
        )

    def fetch_all(self) -> Iterable[UserEntity]:
        return map(self._orm_to_entity, User.objects.all())

    def count_all(self) -> int:

    def update_is_active(self, users_ids: Iterable[int], is_active: bool) -> None:
```

## Література

<a href="https://habr.com/ru/post/581964/">Python Service Layer</a>
