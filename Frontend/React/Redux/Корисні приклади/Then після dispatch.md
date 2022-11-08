## Використання `then` після `dispatch`

```jsx
/**
 * Поганий варіант.
 *
 * Треба зробити dispatch нашої Thunk і забути, а ми
 * очікуємо поки promise вирішиться.
 */
const onSubmit = (formData) => {
    saveProfile(formData).then(() => setEditMode(false));
};

/**
 * Гарний варіант.
 *
 * Додамо до нашого стану поле profileUpdateStatus,
 * з можливими значеннями 'none', 'success' або 'error'.
 */
export const saveProfile = (profile) => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const response = await profileAPI.saveProfile(profile);

    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId));
        dispatch(setProfileUpdateStatus("success"));
    } else {
        dispatch(
            stopSubmit("edit-profile", { _error: response.data.messages[0] })
        );
        dispatch(setProfileUpdateStatus("error"));

        return Promise.reject(response.data.messages[0]);
    }
};

const onSubmit = (formData) => saveProfile(formData);

if (profileUpdateStatus === "success") setEditMode(false);
```
