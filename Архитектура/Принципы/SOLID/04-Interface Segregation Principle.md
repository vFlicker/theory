## Interface Segregation Principle (принцип поділу інтерфейсів)

Об'єкти не повинні залежати від інтерфейсів, які вони не використовують. Закликає не створювати жирні універсальні інтерфейси. Натомість інтерфейси потрібно розділяти на більш дрібні та спеціалізовані, це допоможе гнучкіше їх комбінувати в імплементуючих класах, не змушуючи імплементувати зайві методи. Переконайтеся, що ви не змушуєте об'єкти реалізовувати методи, які їм ніколи не знадобляться

**Приклад порушення 1**

```ts
enum Route {
    ABOUT = "about_page",
    HOME = "home_page",
}

interface Router {
    parseUrl: (url) => void;

    addQueryParams: (params: Record<string, string>) => void;

    // Використовується тільки на клієнті
    navigate: (route: Route) => void;

    // Використовується тільки на клієнті
    attachEventListeners: () => void;

    // Використовується тільки на сервері
    prepareUrlForClient: (url: string) => void;
}

class ServerRouter implements Router {
    parseUrl(url): void {}
    addQueryParams(params: Record<string, string>): void {}
    prepareUrlForClient(url: string): void {}
}

class ClientRouter implements Router {
    addQueryParams(params: Record<string, string>): void {}
    parseUrl(url): void {}
    attachEventListeners(): void {}
    navigate(route: Route): void {}
}

/**
 * Клієнтський код.
 */
const createStore = (initial: any) => {};
const initialData = () => {};

const createDependencyContainer = (router: Router, store) => {
    return {
        getRouter: () => router,
        getStore: () => store,
    };
};

const client = () => {
    const store = createStore(initialData);
    const router = new ClientRouter();

    const di = createDependencyContainer(router, store);
};

const server = (req, res) => {
    const store = createStore(initialData);
    const router = new ServerRouter();

    const di = createDependencyContainer(router, store);
};
```

**Приклад порушення 2**

```ts
/** Не всі тварини можуть fly, walk або swim, тому
 * ці методи не повинні бути частиною інтерфейсу
 * або повинні бути необов'язковими.
 */
interface Animal {
    eat: () => void;
    walk: () => void;
    fly: () => void;
    swim: () => void;
}
```

**Приклад застосування 1**

```ts
enum Route {
    ABOUT = "about_page",
    HOME = "home_page",
}

interface Router {
    parseUrl: (url) => void;
    addQueryParams: (params: Record<string, string>) => void;
}

interface IClientRouter extends Router {
    navigate: (route: Route) => void;
    attachEventListeners: () => void;
}

interface IServerRouter extends Router {
    prepareUrlForClient: (url: string) => void;
}

class ServerRouter implements IServerRouter {
    parseUrl(url): void {}
    addQueryParams(params: Record<string, string>): void {}
    prepareUrlForClient(url: string): void {}
}

class ClientRouter implements IClientRouter {
    addQueryParams(params: Record<string, string>): void {}
    parseUrl(url): void {}
    attachEventListeners(): void {}
    navigate(route: Route): void {}
}

/**
 * Клієнтський код.
 */
const createStore = (initial: any) => {};
const initialData = () => {};

const createDependencyContainer = (router: Router, store) => {
    return {
        getRouter: () => router,
        getStore: () => store,
    };
};

const client = () => {
    const store = createStore(initialData);
    const router = new ClientRouter();

    const di = createDependencyContainer(router, store);
};

const server = (req, res) => {
    const store = createStore(initialData);
    const router = new ServerRouter();

    const di = createDependencyContainer(router, store);
};
```
