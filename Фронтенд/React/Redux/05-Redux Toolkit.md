# Redux Toolkit

Redux Toolkit — це офіційний набір утиліт для розробки з Redux, який надає спрощені API та підходи до створення і керування станом Redux. Він дозволяє писати більш чистий і компактний код, зменшуючи кількість бойлерплейту і спрощуючи процес розробки.

## Store

Redux Toolkit надає функцію `configureStore`, яка замінює `createStore` з Redux. Вона автоматично налаштовує багато речей, таких як middleware та Redux DevTools. Використання `configureStore` дозволяє швидко створювати сховище Redux з мінімальними зусиллями.

**Redux**

```js
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [
    /*YOUR CUSTOM MIDDLEWARES HERE*/
];

const rootReducer = combineReducers({
    auth: authReducer,
});

const store = createStore(
    rootReducer,
    storeEnhancers(applyMiddleware(...middleware))
);
```

**Redux Toolkit**

```js
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

const middleware = [
    ...getDefaultMiddleware(),
    /*YOUR CUSTOM MIDDLEWARES HERE*/
];

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    middleware,
});
```

## Action

Redux Toolkit надає функцію `createAction`, яка допомагає створювати об'єкти дій з меншим шаблонним кодом. Ви можете використовувати `createAction` замість власноручного створення об'єктів дій.

**Redux**

```js
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const FETCH_LINKS_REQUEST = "FETCH_LINKS_REQUEST";
const FETCH_LINKS_SUCCESS = "FETCH_LINKS_SUCCESS";

const loginSuccess = (payload) => ({ type: LOGIN_SUCCESS, payload });

const fetchLinksRequest = () => ({ type: FETCH_LINKS_REQUEST });

const fetchLinksSuccess = (payload) => ({ type: FETCH_LINKS_SUCCESS, payload });
```

**Redux Toolkit**

```js
const loginSuccess = createAction("LOGIN_SUCCESS");
const fetchLinksRequest = createAction("FETCH_LINKS_REQUEST");
const fetchLinksSuccess = createAction("FETCH_LINKS_SUCCESS");
const fetchLinksSuccess2 = createAction("FETCH_LINKS_SUCCESS", (value) => ({
    payload: value,
}));
```

## Reducer

Redux Toolkit надає функцію `createReducer`, яка спрощує створення редукторів. Замість використання `switch-case` ви можете використовувати `createReducer` для визначення обробників дій за допомогою об'єкта з функціями.

**Redux**

```js
const authState = {
    token: "",
    error: "",
};

const authReducer = (state = authState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return { ...state, token: action.payload };
        case LOGIN_FAILED:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};
```

**Redux Toolkit**

```js
const authState = {
    token: "",
    error: "",
};

const authReducer = createReducer(authState, {
    [loginSuccess]: (state, action) => {
        state.token = action.payload;
    },
    [loginFailed]: (state, action) => {
        state.error = action.payload;
    },
});

const authReducer = createReducer(authState, (builder) => {
    builder
        .addCase(loginSuccess, (state, action) => {
            state.token = action.payload;
        })
        .addCase(loginFailed, (state, action) => {
            state.error = action.payload;
        });
});
```

## Slice

Redux Toolkit надає функцію `createSlice`, яка об'єднує в собі визначення редуктора та дій для одного «сегмента» стану. Замість визначення окремих дій та редукторів, ви можете використовувати `createSlice`, щоб автоматично згенерувати дії та редуктори для вас.

**Redux Toolkit (Reducer)**

```js
const loginSuccess = createAction("LOGIN_SUCCESS");
const loginFailed = createAction("LOGIN_FAILED");

const authReducer = createReducer(authState, {
    [loginSuccess]: (state, action) => {
        state.token = action.payload;
    },
    [loginFailed]: (state, action) => {
        state.error = action.payload;
    },
});
```

**Redux Toolkit (Slice)**

```js
const authSlice = createSlice({
    name: "auth",
    initialState: authState,
    reducers: {
        loginSuccess: (state, action) => {
            state.token = action.payload;
        },
        loginFailed: (state, action) => {
            state.error = action.payload;
        },
    },
});

const { loginSuccess, loginFailed } = authSlice.actions;
const authReducer = authSlice.reducer;
```

## Redux Thunk

Redux Toolkit інтегрується з Redux Thunk, що дозволяє використовувати асинхронні дії в Redux за допомогою функцій-диспетчерів (thunks). Ви можете використовувати `createAsyncThunk` для створення асинхронних дій, які автоматично обробляють стани завантаження, помилок та успіху.

**Redux**

```js
const getUsers = () => (dispatch) => {
    dispatch({ type: "FETCH_USERS_REQUEST" });

    return fetch("/api/users/")
        .then((response) => {
            if (!response.ok) throw Error(response.statusText);
            return response.json();
        })
        .then((json) =>
            dispatch({
                type: "FETCH_USERS_SUCCESS",
                payload: json,
            })
        )
        .catch((error) =>
            dispatch({
                type: "FETCH_USERS_FAILURE",
                payload: error.message,
            })
        );
};

const getUsers = () => async (dispatch) => {
    dispatch({ type: "FETCH_USERS_REQUEST" });

    try {
        const response = await fetch("/api/users/");
        if (!response.ok) throw Error(response.statusText);

        const json = await response.json();

        dispatch({
            type: "FETCH_USERS_SUCCESS",
            payload: json,
        });
    } catch (error) {
        dispatch({
            type: "FETCH_USERS_FAILURE",
            payload: error.message,
        });
    }
};
```

**Redux Toolkit**

```js
const getUsers = createAsyncThunk("users/getUsers", async (id) => {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) throw Error(response.statusText);

    const json = await response.json();
    return json;
});

const usersSlice = createSlice({
    name: "users",
    initialState: {
        loading: "",
        error: "",
        data: [],
    },
    reducers: {
        // REGULAR REDUCERS
    },
    extraReducers: {
        [getUsers.pending]: (state) => {
            state.loading = "yes";
        },
        [getUsers.rejected]: (state, action) => {
            state.loading = "";
            state.error = action.error.message;
        },
        [getUsers.fulfilled]: (state, action) => {
            state.loading = "";
            state.data = action.payload;
        },
    },
});
```
