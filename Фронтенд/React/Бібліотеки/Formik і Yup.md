# Formik і Yup

Formik та Yup — це дві популярні бібліотеки для роботи з формами в React. Formik допомагає з управлінням станом та обробкою подій форми, а Yup — для валідації введених даних.

```jsx
// 1. Спочатку, імпортуємо необхідні компоненти та функції з бібліотек.
import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

// 2. Визначаємо схему валідації за допомогою Yup.
const BasicFormSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Required"),
    username: Yup.string()
        .min(2, "Must be longer than 2 characters")
        .max(20, "Nice try, nobody has a first name that long")
        .required("Required"),
    password: Yup.string()
        .min(8, "Must be longer than 8 characters")
        .required("Required"),
});

// 3. Використовуємо Formik для створення форми:
export function SignUp() {
    return (
        <div className="container">
            <h1>Sign up</h1>

            <Formik
                initialValues={{
                    email: "",
                    username: "",
                    password: "",
                }}
                validationSchema={BasicFormSchema}
                onSubmit={(values) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                    }, 500);
                }}
                render={({ errors, touched }) => (
                    <Form className="form-container">
                        {/* Компоненти Field представляють поля форми */}
                        <label htmlFor="email">Email</label>
                        <Field
                            name="email"
                            placeholder="mtarasov777@gmail.com"
                            type="email"
                        />

                        {/* Відображаємо помилку валідації, якщо вона є */}
                        {errors.email && touched.email && (
                            <div className="field-error">{errors.email}</div>
                        )}

                        {/* Аналогічно для інших полів форми */}

                        <button type="submit">Submit</button>
                    </Form>
                )}
            />
        </div>
    );
}
```

В цьому прикладі, ми використовуємо Yup для валідації трьох полів форми — `email`, `username` та `password`. Кожне поле має свої правила валідації, такі як обов'язкове заповнення, мінімальна та максимальна довжина та інші.

Далі ми використовуємо компонент `Formik` для управління станом форми. Визначаємо `initialValues` — початкові значення полів форми. `validationSchema` встановлює схему валідації форми за допомогою Yup. У `onSubmit` задається обробник події надсилання форми.

В методі `render` ми використовуємо компонент `Form` для обгортання полів форми. Компоненти `Field` представляють самі поля форми, вказуючи їх імена, типи та інші атрибути. Помилки валідації відображаються, якщо вони є, на основі `errors` та `touched`, що передаються у функцію рендерингу.

Після натискання кнопки `Submit` форма виконує обробку валідних даних у `onSubmit` методі.
