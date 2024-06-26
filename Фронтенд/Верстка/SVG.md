# SVG

## SVG та анімація

-   Щоб використовувати анімацію у SVG, можна використовувати різні підходи, такі як встановлення фону CSS або використання тегу `<img>`.
-   Щоб використовувати скрипти у SVG, потрібно використовувати тег `<object data="name.svg"></object>` або вбудовувати SVG безпосередньо у HTML.

## Колір тексту у SVG

Якщо іконка SVG має такий самий колір, як текст, ви можете використовувати властивість fill="currentColor", щоб встановити колір, що визначений для тексту в CSS. При наведенні на текст іконка також змінюватиме колір.

```css
.logo:hover {
    color: tomato;
}
```

```html
<span class="logo">
    <svg width="16" height="16">
        <use xlink:href="#icon-logo"></use>
        Якийсь текст
    </svg>
</span>
```

## SVG-спрайт

Якщо SVG-спрайт знаходиться у зовнішньому файлі, деякі методи стилізації можуть не працювати:

-   Використання тегу `<style>` всередині SVG, що стилізує внутрішні елементи символу.
-   Використання CSS зовнішнього файла для стилізації внутрішніх елементів символу.
