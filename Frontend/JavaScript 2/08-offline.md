## Offline

### Сховище браузера

-   LocalStorage
-   SessionStorage
-   IndexedDB

### Workers

#### WebWorker

#### ServiceWorker

-   Перехоплення fetch запитів
    -   Зміна запитів та відповідей
    -   Кешування відповідей
    -   Кешування статики
-   Працює в окремому потоці

Стадії життєвого циклу ServiceWorker

-   Реєстрація
-   Встановлення
-   Активація
-   Перехоплення запиту

Особливості ServiceWorker

-   Немає доступу до LocalStorage (тільки IndexedDB)
-   Контекст self, а не this
-   Зв'язок із сервером лише за `https://` або `http://localhost`
-   Перехоплює лише fetch, але не XMLHttpRequest

#### Worklet
