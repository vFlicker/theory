## DAO (Data access object)

DAO -- це клас, який інкапсулює в собі спосіб отримання даних з БД.
Користь DAO, в тому, що вона повертає зрозумілу нам відповідь, у ts,
звичайний об'єкт, а на сутність БД.
Також, якщо ми поміняємо ORM, наприклад, на MongoDB, доведеться
переписати лише DAO.

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

## Repository

Repository -- клас, який може об'єднувати дані, що повертають різні, DAO:

```java
public class UserRepositoryImpl implements UserRepository {
    private UserDaoImpl userDaoImpl;
    private TweetDaoImpl tweetDaoImpl;

    @Override
    public User get(Long id) {
        UserSocialMedia user = (UserSocialMedia) userDaoImpl.read(id);

        List<Tweet> tweets = tweetDaoImpl.fetchTweets(user.getEmail());
        user.setTweets(tweets);

        return user;
    }
}
```
