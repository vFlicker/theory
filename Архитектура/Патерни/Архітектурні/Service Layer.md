# Service Layer (сервісний рівень)

Інкапсулює бізнес логіку вашого застосуноку і визначає кордон і набір допустимих операцій з точки зору клієнтів, що взаємодіють з ним

Бізнес-логіка — це код реалізації бізнес-правил. Наприклад, логіка списань з одного балансу та нарахування на інший. Шар бізнес-логіки відображає процеси реального світу на програмний код

У сервісному шарі слід ізолювати бізнес-логіку від інфраструктури

Сервіси бізнес-логіки оформляються у вигляді класів-команд (класів з одним громадським способом). Інфраструктурні — по ситуації.

## Література

<a href="https://habr.com/ru/post/581964/">Python Service Layer</a>
