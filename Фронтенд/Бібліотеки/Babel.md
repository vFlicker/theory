# Babel

Babel — це інструмент для трансформації сучасного JavaScript коду на більш старі версії, які підтримуються в браузерах. Він дозволяє вам використовувати нові функції та синтаксис JavaScript, навіть якщо ваш цільовий браузер не підтримує їх.

## Встановлення

Перед використанням Babel потрібно встановити його в проект:

```bash
npm install -D @babel/core @babel/cli
```

Без додаткових модулів Babel не буде здійснювати жодних змін у вашому коді.

## Файл конфігурації

Конфігурація Babel зазвичай зберігається у окремих файлах, таких як `.babelrc` або `babel.config.js`.

```json
{
    "presets": ["@babel/preset-env"],
    "plugins": ["@babel/plugin-transform-arrow-functions"]
}
```

Файл конфігурації може містити блоки presets та plugins, які визначають набір трансформацій, які будуть застосовані до вашого коду.

## Plugins

Plugins — це додаткові модулі Babel, які відповідають за окремі синтаксичні конструкції мови JavaScript. Ви можете встановлювати plugins як NPM пакети та додавати їх до конфігурації Babel. Наприклад, `@babel/plugin-transform-arrow-functions` перетворює стрілкові функції на функції зі звичайним синтаксисом.

## Presets

Presets — це заздалегідь налаштовані набори plugins. Ви можете встановлювати presets як NPM пакети та використовувати їх у вашій конфігурації Babel. Наприклад, `@babel/preset-env` включає набір plugins, які перетворюють сучасний JavaScript код на старіші версії, що підтримуються в браузерах.

## Підтримка браузерів

При використанні Babel важливо уникати «зайвих» трансформацій та виконувати тільки необхідні перетворення. `@babel/preset-env` дозволяє вам вказати список браузерів, на яких повинен працювати ваш код. Ви також можете використовувати вирази, щоб описати список браузерів, наприклад, `"last 2 versions"` або `"> 1% in US"`. Крім того, ви можете додати `debug: true` до конфігурації Babel, щоб отримати детальну інформацію про браузери та використані трансформації.

## Polyfills

Polyfills — це код, який додає глобальні функції, якщо вони ще не підтримуються в браузері. Це дозволяє вам використовувати нові функціональні можливості навіть у старіших браузерах. `core-js` — це бібліотека, яка містить polyfills для різних функціональних можливостей JavaScript.
