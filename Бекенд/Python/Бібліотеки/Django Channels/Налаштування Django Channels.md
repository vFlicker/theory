# Налаштування Django Channels

## 1. Встановлення Django Channels

```bash
pip install channels
```

## 2. Налаштування ASGI

Створіть файл `asgi.py` в кореневому каталозі вашого проекту, якщо його ще немає:

```py
import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
import myapp.routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter(
            myapp.routing.websocket_urlpatterns
        )
    ),
})
```

## 3. Конфігурація маршрутизації

Створіть файл `routing.py` у вашому застосунку для визначення маршрутизації WebSocket:

```py
from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/somepath/$', consumers.MyConsumer.as_asgi()),
]
```

## 4. Створення споживача

Створіть клас споживача для обробки WebSocket з'єднань:

```py
class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = 'some_room'
        self.room_group_name = f'chat_{self.room_name}'

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
```

## 5. Налаштування каналів

Додайте `channels` до вашого `INSTALLED_APPS` в `settings.py` і налаштуйте `CHANNEL_LAYERS`:

```py
INSTALLED_APPS = [
    ...
    'channels',
    ...
]

ASGI_APPLICATION = 'myproject.asgi.application'

CHANNELS_REDIS_HOST = env.str('CHANNELS_REDIS_HOST', 'localhost')
CHANNELS_REDIS_PORT = env.int('CHANNELS_REDIS_PORT', 6379)

CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels_redis.core.RedisChannelLayer',
        'CONFIG': {
            "hosts": [f"redis://{CHANNELS_REDIS_HOST}:{CHANNELS_REDIS_PORT}/3"],
        },
    },
}
```

## 6. Запуск сервера

Запустіть ваш проект Django з підтримкою ASGI:

```bash
daphne -u /tmp/daphne.sock myproject.asgi:application
```

Замість `daphne` можна також використовувати інші ASGI-сервери, такі як `uvicorn`.
