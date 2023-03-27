# Redux

Бібліотека (state менеджер), що реалізує патерн <a href='/Архитектура/Патерни/Архітектурні/Flux.md'>Flux</a>

-   Вирішує проблему керування станом у застосуноку
-   Пропонує зберігати state в одному «глобальному» об'єкті (single source of truth)
-   Односпрямована синхронізація зі сховища в view через підписку
-   Зворотна синхронізація View-Store працює через Action
-   Сховище пов'язане з компонентами не безпосередньо, а через HOC connect або хуки `useSelector` та `useDispatch`
-   Як UI може використовуватись будь-яка бібліотека або фреймворк
-   Вводить нову сутність — reducer

## Reducer

Чиста функція (залежить виключно від state та action, які він отримав) оновлює глобальний state у відповідь на action або повертає старий state, якщо action не підійшов

## Проста реалізація Redux

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

    for (const [reducerName, reducer] of Object.entries(reducersMap)) {
        nextState[reducerName] = reducer(state[reducerName], action);
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

## Література

<a href="https://habr.com/ru/post/439104/">Redux. Простий як граблі</a>

<a href="https://www.valentinog.com/blog/redux/#modern-redux-with-redux-toolkit-createslice">React Redux Tutorial for Beginners</a>
