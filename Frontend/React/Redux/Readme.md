## Redux

Бібліотека (state менеджер), що реалізує патерн Flux

-   Вирішує проблему керування станом у додатку
-   Пропонує зберігати state в одному «глобальному» об'єкті (single source of truth)
-   State отримується від reducer
-   Односпрямована синхронізація зі сховища в View через підписку
-   Зворотна синхронізація View-Store працює через action
-   Як UI може використовуватись будь-яка бібліотека або фреймворк

### Flux

Вид архітектури, яку Facebook використовує, щоб працювати з React

-   Дає контроль над потоком даних
-   Керує тим, як поширюються дані у додатку
-   Керує даними
-   Вводить нові сутності — Action, Store, Dispatch, View

#### Flux вирішує проблеми

-   Передачі даних по ієрархії лише через props
-   Великої вкладеності
-   Ререндерингу при зміні props
-   Ускладнення root-компоненту (більше не треба зберігати всю бізнес-логіку в ньому)
-   Відсутні зв'язків на різних рівнях (зміна шапки при додавання товару в кошик)

#### Flux не вирішує проблеми

-   Зв'язку між компонентами (ми самі маємо визначати, хто має підписуватися на зміни про оновлення сховища, і самі вирішуємо які компоненти повинні закидати дані до сховища)
-   Коли перемальовувати View
-   Як завантажувати дані

#### Сутності Flux

-   View (відображення)

    -   Відображення інформації
    -   Компоненти

-   Action (дія)

    -   Описує дію, яка є атомарною і вирішує одне завдання
    -   Містить ім'я, яке відповідає на питання: «що зробити?»
    -   Крім типу, будь-яка дія може містити додаткову інформацію (часто передається у полі payload)

-   Dispatcher (диспетчер)

    -   Передає сховищу інформацію про подію

-   Store (сховище)
    -   Стан програми
    -   Координує роботу з даними в програмі
    -   Дані можуть змінюватися тільки на підставі actions (дій)
    -   Надає інтерфейси для отримання даних

```js
/**
 * Використовується для оновлення стану.
 */
store.dispatch(action);

/**
 * Використовується оновлення UI.
 */
store.subscribe(listener);
```

### Flux і Redux

-   Flux

    -   Єдине джерело правди
    -   Односпрямована синхронізація зі сховища в View через підписку
    -   Зворотна синхронізація View-Store працює через action

-   Redux

    -   Сховище змінюється з допомогою Reducer.
    -   Сховище пов'язане з компонентами не безпосередньо, а через connect

### Reducer

Чиста функція (залежить виключно від state та action, які він отримав) оновлює глобальний state у відповідь на action або повертає старий state, якщо action не підійшов

### Просто реалізація Redux

```js
const createStore = (reducer, initialState) => {
    let state = initialState;

    return {
        dispatch: (action) => {
            state = reducer(state, action);
        },
        getState: () => state,
    };
};

const combineReducers = (reducersMap) => (state, action) => {
    const nextState = {};

    for (const [key, reducer] of Object.entries(reducersMap)) {
        nextState[key] = reducer(state[key], action);
    }

    return nextState;
};

const applyMiddleware = (middleware) => (createStore) => (reducer, state) => {
    const store = createStore(reducer, state);

    return {
        dispatch: (action) => middleware(store)(store.dispatch)(action),
        getState: store.getState,
    };
};

const todoReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TODO":
            return [
                ...state,
                {
                    id: action.id,
                    text: action.text,
                    completed: false,
                },
            ];
        case "TOGGLE_TODO":
            return state.map((todo) => {
                if (todo.id === action.id) {
                    return { ...todo, completed: !todo.completed };
                }
                return todo;
            });
        default:
            return state;
    }
};

const counterReducer = (state, action) => {
    if (action.type === "ADD") return state + 1;
    return state;
};

const rootReducer = combineReducers({
    todoState: todoReducer,
    counterState: counterReducer,
});
```

### Література

<a href="https://habr.com/ru/post/439104/">Redux. Простий як граблі</a>

<a href="https://www.valentinog.com/blog/redux/#modern-redux-with-redux-toolkit-createslice">React Redux Tutorial for Beginners</a>
