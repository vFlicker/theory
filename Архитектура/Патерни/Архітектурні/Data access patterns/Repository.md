# Repository (вмістилище)

Представляє собою всі об'єкти певного типу у вигляді концептуальної множини. Його поведінка схожа на поведінку колекції, за винятком більш розвинених можливостей для побудови запитів. Repository може об'єднувати дані, що повертають різні, DAO.

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

## Література

<a href="https://habr.com/ru/post/263033/">Забудьте про DAO, використовуйте Repository</a>
