## React

Open-source бібліотека створена Facebook, щоб спростити створення UI-компонентів та відповідно UI-додатків. Використовує Reconciliation алгоритм для ефективного оновлювання UI. Для того, щоб написати повноцінний додаток, потрібно використовувати додаткові бібліотеки

-   Компонентний підхід
-   Віртуальний DOM
-   React це View в MV\*
-   Застосовується як на стороні клієнта, так і сервера

### JSX

Розширення JavaScript, мова опису компонентів React. JSX створює виклик `React.createElement`, у свою чергу `React.createElement` створює маленький об'єкт. Якщо ми створили звичайний тег `h1`, це буде величезний об'єкт з великою кількістю властивостей. React використовує «легкі» об'єкти, ця техніка називається VirtualDOM

-   Не можна використовувати умовні оператори
-   Можна вставляти масиви елементів

### ReactDOM.render

Перетворює React-елементи в html-елементи та рендерить їх на сторінці

### Single Page Application (односторінкова програма)

Веб-додаток, який не використовує стандартний метод повного завантаження нових сторінок. Натомість він отримує нові дані з веб-сервера, взаємодіючи з веб-браузером, і оновлює поточну веб-сторінку. Одна з переваг SPA в тому, що сервер виступає як API, він не повертає постійно HTML, а повертає JSON, тому цей сервер можна використовувати як для сайту, так і дня програми на телефоні