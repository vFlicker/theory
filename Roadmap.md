# Roadmap

-   Працювати треба кожен день! Краще менше, але регулярно.
-   Щодня ставити собі запитання «Навіщо я це роблю?» перед тим, як розпочинати завдання. Так я з'ясую свою приховану мотивацію і зможу позбавитися зайвих завдань.
-   Читати документацію, це дуже спростить мені життя. Якщо буду знати, як працює бібліотечна функція або конструкція мови, зможу її оптимально використовувати.
-   Писати якісний коду (працювати над розвитком свого внутрішнього відчуття для розпізнавання поганого коду).
-   Зберігати скептичний підхід до того, що читаю (розуміти, які проблеми вирішуються і як це можна застосувати на практиці).
-   Проявляти повагу до своїх колег та їх пропозицій.
-   Розбиратися у предметній області (ознайомитися з Domain-Driven Design: управління складністю у серці програмного забезпечення).
-   Глибоко вивчати нові поняття (це допоможе зрозуміти, як вони працюють, їх властивості та вибрати найкращі рішення).

# TODO

```
1) Django 1 година в день. Вчити теорія і ОБОВ'ЯЗКОВО РОБИТИ ПРАКТИКУ.
2) Six Cities.
   2.1) React.
        2.1.1) Курс по React.
        2.1.2) Зробити мапу з використанням ref.
        2.1.3) Подивитися Сумурая про Socket.
        --> Socket завдання.
   2.2) Node.
        2.2.1) Курс по Node від Самурая.
3) Socket завдання.
4) Схема по архітектурі.
5) Переписати застосунку від RSschool
6) Івестувати у знання по ШІ, можливо пройти курс від CS50
7) Повчити Elixir
```

## SSR (1)

1. SSR https://amorgunov.com/posts/2020-12-08-server-side-rendering-in-react/

## DevOps (1)

1. Спочатку подивитися лекцію CS50 про тести і CI/CD, тма є гарний приклад з github action
1. Git Flow https://medium.com/@cobchenyuk/git-flow-%D1%83-%D1%81%D1%82%D0%B8%D1%81%D0%BB%D0%BE%D0%BC%D1%83-%D0%B2%D0%B8%D0%B3%D0%BB%D1%8F%D0%B4%D1%96-0ed3062dca28
1. CI/CD https://coursehunter.net/course/master-klass-ci-cd-dlya-js-razrabotchika?lesson=8
1. Kubernetes
1. Системи моніторинга, навантаження на Бд, навантаження на сервер

## Анімація (1)

1. Курс по анімаціям

## Бази даних (2)

1. Чотири рівні ізоляції транзакцій
1. Індекси
1. Кешування
1. Відмінність HAVING від WHERE у SQL-запитах
1. https://cs50.harvard.edu/sql/2023/
1. Elasticsearch

## Python (4)

1. Коли треба використовувати релеаційни і NoSQL бд, чому переваги NoSQL БД? https://habr.com/ru/companies/wunderfund/articles/691178/
1. Коли використовувати Redis, а коли Postgress, що швидше і чому швидше?

### Django

Шаблонізатор https://jinja.palletsprojects.com/en/3.1.x/templates/#variables
Логування в django https://habr.com/ru/companies/wunderfund/articles/683880/

### DRF

1. DRF що таке?
1. Django і DRF яка різниця? https://habr.com/ru/articles/306538/
1. Що таке пермішенс в DRF?
1. Різниця дженерік класів від вьюсет класів, коли і що треба використовувати?
1. Вбудовані в DRF сераілазатори (стлахфілд серіалізатор)

### БД

1. Selery в Django (селері, брокери, що таке брокери, які таски є в селері)

## Бекенд (4)

1. Адаптер, фасад, ітератор, обсервер, стратегія, стейт, фабричний метод.
2. REST vs SOAP vs JOD
3. Serverless

## Архітектура (4)

1. DAO vs Repository vs Active Record vs Data Mapper

-   https://habr.com/ru/articles/581964/
-   https://habr.com/ru/articles/263033/

1. Курс по архітектурі
1. Abstraction and Design in Computation: https://www.youtube.com/watch?v=3jvq_bF3iVM&list=PLxA7uoRZbzXlW0XjbtuWow6PmPHe4vU7p
1. SOLID: https://solidbook.vercel.app/
1. polylith: https://polylith.gitbook.io/polylith/conclusion/current-arcitectures
1. polylith: https://medium.com/@joakimtengstrand/understanding-polylith-through-the-lens-of-hexagonal-architecture-8e7c8757dab1
1. Clean architecture: https://jairvercosa.medium.com/hey-denny-thanks-for-your-response-8bb52b1c6eb7 + https://github.com/jairvercosa/ca_auth/tree/master/auth/usecases

-   Вимоги ACID
-   CAP-теорема
-   Балансування навантаження
-   Паттерни мікросервісної архітектури
-   Плюси та мінуси моноліту та мікросервісів
-   Відмінності розподіленого моноліту від мікросервісів
-   Робота з чергами повідомлень
-   Шардування та реплікування
-   Ідемопотентність
-   Прогноз навантаження на сервіси та звільнення від «вузьких» місць: вузлів в архітектурі систем, на які падає значно більше навантаження, наприклад баз даних.

## Алгоритми (5)

1. Підняти рівень в CodeWars
2. Задача з жабкою в CodeWars
3. https://www.youtube.com/watch?v=v5Y4vQ824cI
4. https://www.youtube.com/watch?v=z2Y0S9SfzEs

## Інформатика (6)

1. Компілятори та інтерпретатори
1. Парсери https://www.youtube.com/live/hRiTbk1_R_k?

## Фронтенд (7)

1. Рефакторінг six-cities
2. Vue.js
3. Альтернативний стейт менеджер (XState, MobX)

## Протоколи та мережі (7)

1. Відмінності між http 2.0 і http 1.1
2. Сім рівнів моделі OSI, на яких із них відбувається балансування навантаження
3. Як працює інтернет https://www.youtube.com/watch?v=IgF7VwIKqX8
4. TSL https://tls12.xargs.org/#server-key-exchange
