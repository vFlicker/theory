## Redux Toolkit

### Store

```js
/**
 * Old.
 */
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

/**
 * New.
 */
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

### Action

```js
/**
 * Old.
 */
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const FETCH_LINKS_REQUEST = "FETCH_LINKS_REQUEST";
const FETCH_LINKS_SUCCESS = "FETCH_LINKS_SUCCESS";

const loginSuccess = (payload) => ({ type: LOGIN_SUCCESS, payload });

const fetchLinksRequest = () => ({ type: FETCH_LINKS_REQUEST });

const fetchLinksSuccess = (payload) => ({ type: FETCH_LINKS_SUCCESS, payload });

/**
 * New.
 */
const loginSuccess = createAction("LOGIN_SUCCESS");
const fetchLinksRequest = createAction("FETCH_LINKS_REQUEST");
const fetchLinksSuccess = createAction("FETCH_LINKS_SUCCESS");
const fetchLinksSuccess2 = createAction("FETCH_LINKS_SUCCESS", (value) => ({
    payload: value,
}));
```

### Reducer

```js
/**
 * Old.
 */
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

/**
 * New.
 */
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

### Slice

```js
/**
 * Reducer.
 */
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

/**
 * Slice.
 */
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

### Redux Thunk

```js
/**
 * Old.
 */
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

/**
 * New.
 */
const getUsers = createAsyncThunk("users/getUsers", (id) => {
    return fetch(`/api/users/${id}`)
        .then((response) => {
            if (!response.ok) throw Error(response.statusText);
            return response.json();
        })
        .then((json) => json);
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
