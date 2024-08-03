# Django REST framework

Django REST framework (DRF) — це набір інструментів для побудови Web API на основі Django. DRF надає потужні можливості для створення RESTful API з використанням Django, включаючи серіалізацію даних, автентифікацію, авторизацію, перегляди (views) і маршрутизацію URL.

## Серіалізатори (Serializers)

Серіалізатори в DRF використовуються для перетворення складних типів даних, таких як об'єкти моделей Django, у формати, які можна передавати через мережу, наприклад JSON або XML, і навпаки.

```py
from rest_framework import serializers
from .models import Book

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['id', 'title', 'author', 'published_date']
```

## Перегляди (Views)

Перегляди в DRF визначають, які дані повинні бути відображені при виконанні запитів до API. Вони можуть бути класами на основі `APIView` або функціями на основі `@api_view`.

## Маршрутизація (Routing)

```py
from django.urls import path
from .views import BookList

urlpatterns = [
    path('books/', BookList.as_view(), name='book-list'),
]
```

