# asyncio

`asyncio` — це стандартна бібліотека Python для написання конкурентного коду з використанням синтаксису `async`/`await`.

## Основні цілі asyncio

-   Спрощення розробки асинхронних програм.
-   Підвищення продуктивності I/O-bound операцій.
-   Забезпечення стандартизованого підходу до асинхронного програмування в Python.

## Цикл подій

Цикл подій (Event Loop) — це основа будь-якого asyncio-застосунку. Цикл подій відповідає за виконання асинхронних завдань і колбеків, обробку мережевих операцій вводу/виводу, підпроцесів та інших подій. Цей цикл підтримує ефективне використання системних ресурсів, забезпечуючи виконання задач без блокування основного потоку.

## Основні функції asyncio

### asyncio.run(coroutine)

Виконує корутину і автоматично створює та закриває цикл подій. Це зручний спосіб запуску асинхронного коду.

```py
async def main():
    print('Hello')
    await asyncio.sleep(1)
    print('World')

asyncio.run(main())
```

### `asyncio.create_task(coroutine)`

Створює задачу з корутини та додає її до циклу подій для виконання. Це дозволяє запустити корутину у фоновому режимі.

```py
async def example_coroutine():
    print("Корутин запущено")
    await asyncio.sleep(1)  # Імітація асинхронної операції
    print("Корутин завершено")
    return "result"

async def main():
    task = asyncio.create_task(example_coroutine())
    # Корутин знаходиться в стані Pending
    result = await task
    # Корутин завершено
    print(result)

asyncio.run(main())
```

### `asyncio.gather(*coroutines)`

Виконує кілька корутин паралельно та повертає результати всіх корутин у вигляді списку.

```py
results = await asyncio.gather(coroutine1(), coroutine2(), coroutine3())
```

### `asyncio.wait(coroutines)`

Чекає завершення зазначених корутин. Може чекати на завершення всіх корутин або хоча б однієї з них, залежно від параметрів.

```py
done, pending = await asyncio.wait([coroutine1(), coroutine2()], timeout=3.5)
```

### `asyncio.wait_for(coroutine, timeout)`

Чекає завершення корутини з зазначеним тайм-аутом. Якщо корутина не завершилася у вказаний час, викликається виключення.

```py
try:
    result = await asyncio.wait_for(long_running_task(), timeout=2.0)
except asyncio.TimeoutError:
    print("Операція перевищила час очікування")
```

### `asyncio.shield(coroutine)`

Захищає корутину від скасування. Якщо корутину обернено у `shield`, вона продовжить виконуватися, навіть якщо виконується операція, яка скасовує задачі.

```py
task = asyncio.create_task(something())
await asyncio.shield(task)
```

### `asyncio.to_thread(blocking_func, *args)`

Виконує блокуючу функцію в окремому потоці, дозволяючи залишити цикл подій активним для інших завдань. Це корисно для запуску коду, який не може бути легко адаптований до асинхронного програмування.

```py
def blocking_io():
    # Блокуюча I/O операція
    return result

result = await asyncio.to_thread(blocking_io)
```
