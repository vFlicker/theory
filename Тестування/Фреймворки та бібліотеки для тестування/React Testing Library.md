# React Testing Library

React Testing Library — це набір утиліт, які допомагають тестувати React-компоненти без залежності від їхньої внутрішньої реалізації. Вона надає зручні функції для віртуального рендерингу компонентів, спрощуючи перевірку правильності роботи React, але не використовує справжній DOM.

Основні особливості React Testing Library:

-   Дозволяє зосередитись на функціональності компонента та його взаємодії з користувачем.
-   Не потребує підключення до браузера або справжнього DOM.
-   Надає API для виконання подій, перевірки вмісту та стану компонента.
-   Забезпечує просту інтеграцію з Jest та іншими фреймворками для тестування.

**Приклад**

```js
test("loads and displays greeting", async () => {
    // ARRANGE
    render(<Fetch url="/greeting" />);

    // ACT
    await userEvent.click(screen.getByText("Load Greeting"));
    await screen.findByRole("heading");

    // ASSERT
    expect(screen.getByRole("heading")).toHaveTextContent("hello there");
    expect(screen.getByRole("button")).toBeDisabled();
});
```
