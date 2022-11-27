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

### StrictMode (суворий режим)

-   Виявлення небезпечних методів життєвого циклу
-   Попередження про використання застарілого API рядкових реф
-   Попередження про використання застарілого методу findDOMNode
-   Виявлення несподіваних побічних ефектів
-   Виявлення застарілого API контексту
-   Забезпечення перевикористаного стану

### Single Page Application (односторінкова програма)

Веб-додаток, який не використовує стандартний метод повного завантаження нових сторінок. Натомість він отримує нові дані з веб-сервера, взаємодіючи з веб-браузером, і оновлює поточну веб-сторінку. Одна з переваг SPA в тому, що сервер виступає як API, він не повертає постійно HTML, а повертає JSON, тому цей сервер можна використовувати як для сайту, так і дня програми на телефоні

### Література

<a href="https://beta.reactjs.org/">Документація</a>

#### Хуки

<a href="https://habr.com/ru/company/ruvds/blog/445276/">Повний посібник з useEffect (ru)</a>

<a href="https://overreacted.io/a-complete-guide-to-useeffect/">Повний посібник з useEffect (eng)</a>

<a href="https://www.robinwieruch.de/react-hooks-fetch-data/">How to fetch data with React Hooks</a>

#### Контекст

<a href="https://dmitripavlutin.com/react-context-and-usecontext/">A Guide to React Context</a>

#### Рендеринг

<a href="https://blog.isquaredsoftware.com/2020/05/blogged-answers-a-mostly-complete-guide-to-react-rendering-behavior/">Blogged Answers: A (Mostly) Complete Guide to React Rendering Behavior</a>

#### Портали

<a href="https://blog.logrocket.com/build-modal-with-react-portals/">Building a modal in React with React Portals</a>

#### React TypeScript

<a href="https://react-typescript-cheatsheet.netlify.app/docs/basic/setup">React TypeScript</a>

<a href="https://fettblog.eu/typescript-react-why-i-dont-use-react-fc/">Why I don't use React.FC</a>

#### Оптимізації

<a href="https://www.youtube.com/watch?v=5pIUicKWyrQ">Оптимізації</a>
