# Коли використовувати SQL у Django

У Django є потужний ORM (Object-Relational Mapping), який дозволяє вам працювати з базою даних за допомогою Python-класів та методів, замість написання сирого SQL-коду. Проте бувають випадки, коли вам може знадобитися писати власний SQL. Ось кілька ситуацій, коли це може бути доречно:

-   Складні запити: Якщо вам потрібно виконати складний запит, який важко або неможливо виразити за допомогою Django ORM, SQL може бути більш гнучким та ефективним рішенням. Наприклад, запити з вкладеними підзапитами, рекурсивними запитами, або складними об'єднаннями таблиць.
-   Оптимізація продуктивності: У деяких випадках, прямий SQL-запит може бути швидшим, ніж аналогічний запит, згенерований Django ORM. Це може бути актуальним для великих наборів даних або запитів, які потребують оптимізації.
-   Специфічні функції бази даних: Якщо вам потрібно використовувати специфічні функції або оператори вашої бази даних, які не підтримуються Django ORM, SQL дозволить вам це зробити.
-   Міграції даних: При міграції даних з однієї бази даних в іншу, або при виконанні складних операцій над даними, SQL може бути більш зручним інструментом.

## Як використовувати SQL у Django

Django надає декілька способів виконання SQL-запитів.

### Використання `Manager.raw()`

Метод `Manager.raw()` використовується для виконання «сирих» SQL-запитів. Повертає об'єкти Django моделей.

```py
#  my_app/models.py
from django.db import models

class MyModel(models.Model):
    name = models.CharField(max_length=100)

    @staticmethod
    def get_custom_query_results():
        query = "SELECT * FROM myapp_mymodel WHERE id = %s"
        params = [1]
        return MyModel.objects.raw(query, params)


# my_app/views.py
from myapp.models import MyModel

for obj in MyModel.get_custom_query_results():
    print(obj)
```

### Використання `cursor.execute()`

Метод `cursor.execute()` використовується для виконання «сирих» SQL-запитів безпосередньо до бази даних. Повертає сирі дані (кортежі, словники тощо).

```py
from django.db import connection

def get_aggregate_data():
    with connection.cursor() as cursor:
        query = "SELECT * FROM my_table WHERE id = %s"
        params = [1]
        cursor.execute(query, params)
        return cursor.fetchone()


result = get_aggregate_data()
print(result)
```

### Використання `migrations.RunSQL()`

Метод `migrations.RunSQL()` використовується для виконання «сирих» SQL-запитів під час міграцій. Це корисно у випадках, коли:

-   Ініціалізація даних: Необхідно ініціалізувати дані під час міграцій, наприклад, додати початкові записи в таблиці.
-   Міграції бази даних: Потрібно внести зміни до бази даних, які не можуть бути виконані за допомогою стандартних методів Django ORM.
-   Складні зміни структури бази даних: Потрібно виконати складні операції з таблицями або індексами.

```py
from django.db import migrations

class Migration(migrations.Migration):
    dependencies = [
        ('myapp', '0001_initial'),
    ]

    operations = [
        migrations.RunSQL(
            sql="INSERT INTO myapp_mymodel (name) VALUES ('Initial data');",
            reverse_sql="DELETE FROM myapp_mymodel WHERE name='Initial data';"
        ),
    ]
```

### Використання Django Debug Toolbar

Django Debug Toolbar надає зручний спосіб відстежувати всі запити до бази даних, які виконуються під час обробки запиту.

#### Інсталяція

```sh
pip install django-debug-toolbar
```

#### Налаштування

```py
# settings.py
INTERNAL_IPS = [
    '127.0.0.1',
]

MIDDLEWARE = [
    'debug_toolbar.middleware.DebugToolbarMiddleware',
    # інші ваші middleware
]

INSTALLED_APPS = [
    # інші ваші додатки
    'debug_toolbar',
]


# urls.py
from django.urls import path, include

urlpatterns = [
    # інші ваші шляхи
    path('__debug__/', include('debug_toolbar.urls')),
]
```

## Рекомендації

-   Безпека: При використанні «сирого» SQL завжди слідкуйте за безпекою, щоб уникнути SQL-ін'єкцій. Використовуйте параметризовані запити та уникайте вставки неперевірених даних безпосередньо в SQL-код.
-   Переносимість: SQL-запити можуть бути специфічними для певної бази даних. Якщо ви плануєте використовувати різні бази даних з вашим Django-проектом, намагайтеся писати SQL-запити, які будуть сумісні з усіма підтримуваними базами даних.
-   Баланс: Використовуйте SQL лише тоді, коли це дійсно необхідно, і намагайтеся максимально використовувати можливості Django ORM для спрощення розробки та підтримки вашого проекту.
-   Документація: Документуйте будь-який «сирий» SQL-код, щоб інші розробники розуміли його призначення.
