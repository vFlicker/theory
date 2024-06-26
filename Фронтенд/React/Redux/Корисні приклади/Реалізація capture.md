# Реалізація capture

1. Робимо dispatch login-thunk.
2. Відбувається запит API, який при успішному запиті поверне код 0 або 10.
    - Якщо статус код буде 10
        1. Треба ввести capture.
        2. Робимо dispatch getCaptchaUrlSuccess, яка додасть у стан url картинки з capture.
        3. У UI вводимо код з картинки.
        4. Виконуємо крок 1, якщо все добре статус код буде 0.
    - Якщо статус код буде 0
        1. Робимо dispatch getAuthUserData-thunk, яка зробить запит на API, щоб отримати дані о користувачі, якщо все ок, робимо dispatch setAuthUserData(id, email, login, true)

```jsx
/**
 * API.
 */
const login = (email, password, rememberMe = false, captcha = null) => {
    return instance.post(`auth/login`, {
        email,
        password,
        rememberMe,
        captcha,
    });
};

const getCaptchaUrl = () => {
    return instance.get(`security/get-captcha-url`);
};

/**
 * Redux.
 */
const GET_CAPTCHA_URL_SUCCESS = "samurai-network/auth/GET_CAPTCHA_URL_SUCCESS";

const initialState = {
    captchaUrl: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                captchaUrl: action.captchaUrl,
            };
        default:
            return state;
    }
};

export const getCaptchaUrlSuccess = (captchaUrl) => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    payload: { captchaUrl },
});

/** thunk fetchCaptchaUrl */
export const fetchCaptchaUrl = () => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url;

    dispatch(getCaptchaUrlSuccess(captchaUrl));
};

/** thunk getAuthUserData */
export const getAuthUserData = () => async (dispatch) => {
    const meData = await authAPI.me();

    if (meData.resultCode === ResultCodesEnum.Success) {
        const { id, login, email } = meData.data;
        dispatch(actions.setAuthUserData(id, email, login, true));
    }
};

/**
 * thunk login
 */
export const login = (data) => async (dispatch) => {
    const response = await authAPI.login(...data);

    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData());
    } else if (response.data.resultCode === 10) {
        dispatch(fetchCaptchaUrl());
    } else {
        const message = response.data.messages.length
            ? response.data.messages[0]
            : "Some error";

        dispatch(stopSubmit("login", { _error: message }));
    }
};

/**
 * JSX.
 */
function Login({ login }) {
    const captchaUrl = useSelector((state) => state.auth.captchaUrl);
    const dispatch = useDispatch();

    const handleSubmit = () => {
        dispatch(
            login({
                email: formData.email,
                password: formData.password,
                rememberMe: formData.rememberMe,
                captcha: formData.captcha,
            })
        );
    };

    return <div>{captchaUrl && <img src={captchaUrl} />}</div>;
}
```
