# Робота з мережею в React-Redux

У React-Redux даних для застосунку не отримують безпосередньо з сервера. Замість цього, зазвичай використовують проміжний шар, такий як Business Logic Layer (BLL) або сервіс API, який здійснює запити до сервера і повертає дані для використання в React-Redux.

## API-клієнт

Рекомендується ізолювати код, який взаємодіє з мережею, в окремий клас-сервіс або API-клієнт. Це дозволяє компонентам не залежати від джерела даних і спрощує тестування та підтримку коду, який працює з API.

## Індикатор завантаження

Для відображення індикатора завантаження можна додати поле `loading` до Redux state. Це поле оновлюється в reducer, коли дані стають доступними. Значення `loading` передається в компонент, і на його основі рендериться індикатор завантаження або вміст компонента з даними.

## Обробка помилок

Помилки, які виникають при отриманні даних, також можна зберігати в Redux state, щоб компоненти могли їх відобразити або виконати відповідні дії.

## Асинхронність

Оскільки запити до мережі не повертають результат миттєво, потрібно використовувати якийсь проміжний стан або функцію-обгортку для обробки асинхронних запитів. В React-Redux є декілька популярних пакетів middleware, таких як Redux Thunk і Redux Saga, які дозволяють робити асинхронні запити та керувати побічними ефектами.

## Redux Thunk

Redux Thunk — це middleware для Redux, яке дозволяє використовувати функції замість об'єктів дій. Це дає можливість робити асинхронні запити, отримувати дані з сервера та диспетчеризувати дії на основі цих даних.

### Створення Thunk

```ts
/**
 * У ньому оголошено 3 параметри передачі інформації
 * про типи. Перший: DispatchExt. Для нього визначено
 * значення за замовчуванням у вигляді об'єкта. По ідеї,
 * ми можемо цим скористатися і замість unknown вказати
 * об'єкт. Але це зробити не вийде, тому що лінтер
 * забороняє використовувати універсальний об'єкт.
 * Тому ми вказали unknown, маючи на увазі, що тип
 * буде уточнено пізніше.
 */ d;
export interface Middleware<
    DispatchExt = {},
    S = any,
    D extends Dispatch = Dispatch
> {
    (api: MiddlewareAPI<D, S>): (
        next: Dispatch<AnyAction>
    ) => (action: any) => any;
}
```

```js
const createThunkMiddleware = (extraArgument) => {
    return ({ dispatch, getState }) =>
        (next) =>
        (action) => {
            if (typeof action === "function") {
                return action(dispatch, getState, extraArgument);
            }

            return next(action);
        };
};

const getData = () => (dispatch, _getState, _extraArgument) => {
    return fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((json) => {
            /**
             * Навіть middleware зрештою відправлятиме дії
             * з простими об'єктами за допомогою цього
             * методу.
             */
            dispatch({ type: "DATA_LOADED", payload: json });
        });
};
```

## Redux Saga

Redux Saga — це middleware, яке дозволяє керувати побічними ефектами в Redux за допомогою генераторів. Він дозволяє легко виконувати асинхронні запити, слідкувати за певними діями та реагувати на них, інтегруватися з іншими бібліотеками асинхронного програмування.

### Використання Saga

```js
/**
 * store/actions.js
 */
const getData = (id) => ({
    type: "DATA_REQUESTED",
    payload: { id },
});

/**
 * store/sagas.js
 */
import { takeEvery, call, put } from "redux-saga/effects";

const getData = async (id) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    return await res.json();
};

/**
 * 1. Взяти кожен action з назвою "DATA_REQUESTED" і для
 * кожного з цих action запускати worker saga.
 *
 * 2. Всередині worker saga викликається функція
 * під назвою getData.
 *
 * 3. Якщо функція успішна, тоді надсилаємо новий action
 * з назвою "DATA_LOADED" разом із payload.
 *
 * 4. Якщо функція видає помилку, тоді надсилаємо новий
 * action під назвою "API_ERRORED" разом із payload.
 */
export default function* watcherSaga() {
    yield takeEvery("DATA_REQUESTED", workerSaga);
}

function* workerSaga(action) {
    yield put({ type: "DATA_FETCHING" });

    try {
        const payload = yield call(getData, action.payload.id);
        yield put({ type: "DATA_LOADED", payload });
    } catch (evt) {
        yield put({ type: "API_ERRORED", payload: evt });
    }
}
```
