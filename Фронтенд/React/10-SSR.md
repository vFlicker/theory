# SSR (Server Side Rendering)

SSR (Server Side Rendering) є популярною технікою для рендерингу застосунків на стороні сервера і подальшої відправки повністю відрендерованої сторінки клієнту. Це відрізняється від традиційного підходу до рендерингу на клієнтському боці, коли сторінка спочатку завантажується з порожнім вмістом, а потім динамічно заповнюється веб-компонентами за допомогою JavaScript.

Основна перевага SSR полягає в тому, що клієнт отримує повністю відрендеровану сторінку з сервера, що поліпшує швидкість завантаження та відображення контенту. Це особливо корисно для пошукових систем, соціальних мереж та користувачів з повільним Інтернетом або обмеженим потужностями пристроїв.

Основний процес SSR включає наступні кроки:

1. Клієнт відправляє запит на сервер для певної URL-адреси.
2. Сервер отримує запит і виконує відповідний роутинг.
3. Сервер виконує рендеринг React компонентів, які відповідають запиту.
4. Дані, необхідні для рендерингу, можуть бути запитані з бази даних або інших джерел.
5. Сервер формує HTML-код, який містить повністю відрендерену сторінку.
6. Відповідь сервера містить цей HTML-код, який відправляється клієнту.
7. Клієнт отримує відповідь зі стороною сервера і відображає повністю відрендерену сторінку користувачу.

SSR вимагає додаткової конфігурації серверної і клієнтської сторони, а також вирішує деякі проблеми, пов'язані зі станом застосунку та роутингом. Проте, він може покращити перше відображення (First Contentful Paint), SEO, доступність та інші аспекти веб-додатка.

У React є різні підходи до використання SSR, такі як використання спеціалізованих фреймворків (наприклад, Next.js) або ручне налаштування серверної та клієнтської частин. Кожен підхід має свої переваги та особливості, і вибір залежить від конкретних потреб проекту.
